from pathlib import Path
import datetime
import email.utils
import html
import logging
import re
import urllib.request
import xml.etree.ElementTree as ET

logging.basicConfig(level=logging.INFO)
log = logging.getLogger('arthur-news')
ROOT = Path(__file__).resolve().parents[1]

SOURCES = [
    ('Fox News - Latest', 'https://moxie.foxnews.com/google-publisher/latest.xml'),
    ('Fox News - World', 'https://moxie.foxnews.com/google-publisher/world.xml'),
    ('Fox News - Technology', 'https://moxie.foxnews.com/google-publisher/tech.xml'),
    ('BBC News - Top Stories', 'https://feeds.bbci.co.uk/news/rss.xml'),
    ('BBC News - World', 'https://feeds.bbci.co.uk/news/world/rss.xml'),
    ('BBC News - Business', 'https://feeds.bbci.co.uk/news/business/rss.xml'),
    ('BBC News - Technology', 'https://feeds.bbci.co.uk/news/technology/rss.xml'),
]

# Arthur Tube's own permanent project updates stay in the bot-built feed too.
PROJECT_ITEMS = [
    {
        'title': 'Aperialblocks Band Builder joins ArthurTube.github.io',
        'link': 'https://arthurtube.github.io/aperial-builder/',
        'date': 'Sun, 25 Oct 2026 18:15:00 GMT',
        'category': 'Arthur Tube Updates',
        'description': 'The Aperialblocks Band Builder supports Bands 35 through 510 (numbers 341 through 5100). Official/canon Aperial material is credited to Aperial10080, while builder-generated drafts remain separate.',
    },
    {
        'title': 'Arthur Tube News RSS bot launched',
        'link': 'https://arthurtube.github.io/news.html',
        'date': 'Sun, 25 Oct 2026 18:10:00 GMT',
        'category': 'Arthur Tube Updates',
        'description': 'Arthur Tube News now uses an automated RSS bot to refresh the news page and feed from configured sources.',
    },
]


def clean(value):
    return re.sub(r'\s+', ' ', html.unescape(value or '')).strip()


def fetch(label, url, limit=8):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 ArthurTube-NewsBot/2.0'})
    with urllib.request.urlopen(req, timeout=8) as response:
        data = response.read(2 * 1024 * 1024 + 1)
    if len(data) > 2 * 1024 * 1024:
        raise ValueError('Feed too large')
    root = ET.fromstring(data)
    out = []
    for item in root.findall('.//item')[:limit]:
        title = clean(item.findtext('title'))
        link = clean(item.findtext('link'))
        date = clean(item.findtext('pubDate'))
        if title and link.startswith(('http://', 'https://')):
            out.append({'title': title, 'link': link, 'date': date, 'source': label})
    return out


def parsed_date(value):
    try:
        dt = email.utils.parsedate_to_datetime(value)
        if dt.tzinfo is None:
            dt = dt.replace(tzinfo=datetime.timezone.utc)
        return dt.astimezone(datetime.timezone.utc)
    except Exception:
        return datetime.datetime(1970, 1, 1, tzinfo=datetime.timezone.utc)


def rss_date(dt):
    return email.utils.format_datetime(dt.astimezone(datetime.timezone.utc), usegmt=True)


def write_feed(all_items, now):
    ET.register_namespace('atom', 'http://www.w3.org/2005/Atom')
    rss = ET.Element('rss', {'version': '2.0'})
    channel = ET.SubElement(rss, 'channel')
    ET.SubElement(channel, 'title').text = 'Arthur Tube News'
    ET.SubElement(channel, 'link').text = 'https://arthurtube.github.io/news.html'
    ET.SubElement(channel, 'description').text = 'Arthur Tube News bot: current external headlines plus Arthur Tube project and website updates.'
    ET.SubElement(channel, 'language').text = 'en'
    ET.SubElement(channel, 'lastBuildDate').text = rss_date(now)
    ET.SubElement(channel, '{http://www.w3.org/2005/Atom}link', {
        'href': 'https://arthurtube.github.io/feed.xml',
        'rel': 'self',
        'type': 'application/rss+xml',
    })

    combined = []
    for item in PROJECT_ITEMS:
        row = dict(item)
        row['_dt'] = parsed_date(row['date'])
        combined.append(row)
    for item in all_items:
        row = dict(item)
        row['_dt'] = parsed_date(row['date'])
        row['category'] = row['source']
        row['description'] = 'Headline from %s. Open the original publisher link for the full story.' % row['source']
        combined.append(row)

    # De-duplicate syndicated/overlapping section headlines, newest first.
    seen = set()
    unique = []
    for item in sorted(combined, key=lambda x: x['_dt'], reverse=True):
        key = (item['link'].casefold(), item['title'].casefold())
        if key in seen:
            continue
        seen.add(key)
        unique.append(item)

    # Keep the public feed compact while always retaining Arthur Tube's two project entries.
    external = [x for x in unique if x.get('source')][:40]
    projects = [x for x in unique if not x.get('source')]
    final = sorted(external + projects, key=lambda x: x['_dt'], reverse=True)

    for item in final:
        node = ET.SubElement(channel, 'item')
        ET.SubElement(node, 'title').text = item['title']
        ET.SubElement(node, 'link').text = item['link']
        ET.SubElement(node, 'guid', {'isPermaLink': 'true'}).text = item['link']
        ET.SubElement(node, 'pubDate').text = rss_date(item['_dt'])
        ET.SubElement(node, 'category').text = item['category']
        ET.SubElement(node, 'description').text = item['description']

    tree = ET.ElementTree(rss)
    ET.indent(tree, space='  ')
    tree.write(ROOT / 'feed.xml', encoding='utf-8', xml_declaration=True)


def build():
    cards = []
    collected = []
    for label, url in SOURCES:
        try:
            items = fetch(label, url)
            collected.extend(items)
            body = '<ul class="headlines">' + ''.join(
                '<li><a target="_blank" rel="noopener noreferrer" href="%s">%s</a>%s</li>' % (
                    html.escape(item['link'], quote=True),
                    html.escape(item['title']),
                    ('<small>' + html.escape(item['date']) + '</small>') if item['date'] else '',
                ) for item in items
            ) + '</ul>'
        except Exception as exc:
            log.warning('%s unavailable: %s', label, exc)
            body = '<p class="unavailable">Feed temporarily unavailable at the last refresh.</p>'
        cards.append(
            '<section class="source"><h2>%s</h2>%s<a class="feedlink" href="%s">Open original RSS feed</a></section>' % (
                html.escape(label), body, html.escape(url, quote=True)
            )
        )

    now = datetime.datetime.now(datetime.timezone.utc)
    stamp = now.strftime('%Y-%m-%d %H:%M UTC')
    page = (Path(__file__).with_name('news_template.html').read_text(encoding='utf-8')
            .replace('__STAMP__', stamp)
            .replace('__CARDS__', ''.join(cards)))
    (ROOT / 'news.html').write_text(page, encoding='utf-8')
    write_feed(collected, now)
    print('Arthur Tube News + feed.xml refreshed:', stamp, '-', len(collected), 'external items')


if __name__ == '__main__':
    build()
