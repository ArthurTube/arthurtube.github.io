from pathlib import Path
import html,re,urllib.request,urllib.parse,xml.etree.ElementTree as ET,configparser,logging,datetime
CFG=configparser.ConfigParser();CFG.read_dict({'web_watching':{'news_feed':'https://moxie.foxnews.com/google-publisher/latest.xml'}})
log=logging.getLogger('public-news')
def clean_news_text(value: str) -> str:
    """Decode entities and repair UTF-8 text misread as Windows-1252."""
    value = html.unescape(value)
    for _ in range(2):
        if not any((token in value for token in ('Ã', 'Â', 'â€', 'â€™', 'â€œ'))):
            break
        try:
            repaired = value.encode('cp1252').decode('utf-8')
        except (UnicodeEncodeError, UnicodeDecodeError):
            break
        if sum((repaired.count(marker) for marker in ('Ã', 'Â', 'â€'))) >= sum((value.count(marker) for marker in ('Ã', 'Â', 'â€'))):
            break
        value = repaired
    return value

class PublicNews:

    @staticmethod
    def cyberbuddy_news_source(item):
        """Name the actual feed publisher, without guessing an article's wire author."""
        hostname = (urllib.parse.urlsplit(item.findtext('link') or '').hostname or '').lower()
        source_node = item.find('source')
        source_url = source_node.get('url', '') if source_node is not None else ''
        source_host = (urllib.parse.urlsplit(source_url).hostname or '').lower()
        if hostname == 'news.google.com':
            if source_host in ('apnews.com', 'www.apnews.com'):
                return 'AP'
            if source_host in ('reuters.com', 'www.reuters.com'):
                return 'Reuters'
            return ''
        if hostname == 'livescience.com' or hostname.endswith('.livescience.com'):
            return 'LiveScience'
        if hostname == 'foxnews.com' or hostname.endswith('.foxnews.com'):
            return 'Fox News'
        if hostname == 'foxbusiness.com' or hostname.endswith('.foxbusiness.com'):
            return 'Fox Business'
        return re.sub('\\s+', ' ', clean_news_text(item.findtext('source') or '')).strip()

    @classmethod
    def cyberbuddy_news_title(cls, item):
        """Remove publisher suffixes from RSS titles shown to CyberBuddy."""
        title = re.sub('\\s+', ' ', clean_news_text((item.findtext('title') or '').strip()))
        publisher = cls.cyberbuddy_news_source(item)
        if publisher:
            label = 'AP News' if publisher == 'AP' else publisher
            title = re.sub('\\s+-\\s+(?:' + re.escape(label) + ('|AP' if publisher == 'AP' else '') + ')$', '', title, flags=re.IGNORECASE)
        return title

    @classmethod
    def cyberbuddy_news_description(cls, description, title, item):
        """Discard Google's repeated headline and publisher from RSS summaries."""
        description = description.strip()
        if description.casefold().startswith(title.casefold()):
            description = description[len(title):].lstrip(' .:-\t')
            publisher = cls.cyberbuddy_news_source(item)
            if publisher:
                labels = (publisher, 'AP News') if publisher == 'AP' else (publisher,)
                if description.casefold() in (label.casefold() for label in labels):
                    return ''
        return description

    def fetch_english_news_sources(self):
        """Use publisher-identified AP/Reuters results; fail back to English RSS."""
        results = []
        for publisher, site in (('AP', 'apnews.com'), ('Reuters', 'reuters.com')):
            query = urllib.parse.urlencode({'q': 'site:' + site, 'hl': 'en-US', 'gl': 'US', 'ceid': 'US:en'})
            try:
                items = self.fetch_news_items('https://news.google.com/rss/search?' + query)
                verified = [item for item in items if self.cyberbuddy_news_source(item) == publisher]
                if not verified:
                    log.warning('NEWS %s publisher results could not be verified', publisher)
                results.extend(verified[:8])
            except Exception as error:
                log.warning('NEWS %s search unavailable: %s', publisher, error)
        if not results:
            log.warning('NEWS publisher search unavailable; using configured English feed')
            results = self.fetch_news_items()
        return results

    def fetch_cyberbuddy_news_categories(self):
        """Use current RSS sections; never fill missing sections with old news."""
        base = 'https://moxie.foxnews.com/google-publisher/'
        latest = self.fetch_english_news_sources()
        fox = 'foxnews.com' in CFG.get('web_watching', 'news_feed', fallback='').lower()
        section_items = {}
        if fox:
            for name, url in (('Science News', base + 'science.xml'), ('Medical News', base + 'health.xml'), ('Tech News', base + 'tech.xml'), ('Business News', 'https://moxie.foxbusiness.com/google-publisher/latest.xml')):
                try:
                    section_items[name] = self.fetch_news_items(url)[:5]
                except Exception as error:
                    log.warning('NEWS CATEGORY %s unavailable: %s', name, error)
                    section_items[name] = []
        try:
            science = [item for item in self.fetch_news_items('https://www.livescience.com/feeds/all') if self.cyberbuddy_news_source(item) == 'LiveScience']
            if science:
                section_items['Science News'] = science[:5]
        except Exception as error:
            log.warning('NEWS LiveScience feed unavailable: %s', error)
        for category, terms in (('Media News', '(television OR cinema OR journalism OR entertainment)'), ('Off Beat News', '("odd news" OR "strange news" OR "unusual discovery")')):
            found = []
            for publisher, domain in (('AP', 'apnews.com'), ('Reuters', 'reuters.com')):
                query = urllib.parse.urlencode({'q': 'site:' + domain + ' ' + terms, 'hl': 'en-US', 'gl': 'US', 'ceid': 'US:en'})
                try:
                    found.extend((item for item in self.fetch_news_items('https://news.google.com/rss/search?' + query) if self.cyberbuddy_news_source(item) == publisher))
                except Exception as error:
                    log.warning('NEWS CATEGORY %s unavailable: %s', category, error)
            section_items[category] = found[:5]

        def section(name, paths):
            if name in section_items:
                return section_items[name]
            return [item for item in latest if any((path in (item.findtext('link') or '').lower() for path in paths))][:5]
        return (('Top Stories', latest[:8]), ('Media News', section('Media News', ('/media/', '/entertainment/'))), ('Business News', section('Business News', ('/business/', '/economy/'))), ('Science News', section('Science News', ('/science/',))), ('Medical News', section('Medical News', ('/health/',))), ('Off Beat News', section('Off Beat News', ('/odd-news/', '/lifestyle/'))), ('Tech News', section('Tech News', ('/tech/',))))

    def send_cyberbuddy_newspage(self):
        """Render live RSS in the original CyberBuddy news page's list layout."""
        categories = self.fetch_cyberbuddy_news_categories()
        sections = []
        for name, items in categories:
            rows = []
            seen = set()
            for item in items:
                title = self.cyberbuddy_news_title(item)
                description = clean_news_text(re.sub('<[^>]*>', ' ', item.findtext('description') or ''))
                description = re.sub('\\s+', ' ', html.unescape(description)).strip()
                link = (item.findtext('link') or '').strip()
                if not title:
                    continue
                key = (link or title).casefold()
                if key in seen:
                    continue
                seen.add(key)
                headline = html.escape(title, quote=False)
                if link.startswith(('https://', 'http://')):
                    headline = '<a href="' + html.escape(link, quote=True) + '">' + headline + '</a>'
                if description and description.casefold() != title.casefold():
                    description = self.cyberbuddy_news_description(description, title, item)
                    if description:
                        headline += ' ' + html.escape(description, quote=False)
                rows.append('<li>' + headline + '<br></li>')
            sections.append('<p></p><center><b>' + html.escape(name) + '</b></center><br>' + (''.join(rows) if rows else 'No current headlines in this category.<br>'))
        page = '<html><head><meta http-equiv="Content-Type" content="text/html; charset=windows-1252"><title>CyberBuddy News</title><style type="text/css">td { font-family: verdana,arial,sans-serif; font-size: 12pt; }</style></head><body bgcolor="#FAFAFA" text="#000000"><center><font size="4" color="red"> - CyberBuddy News Page - </font></center><p></p><center><table width="80%"><tr><td><br>' + ''.join(sections) + '</td></tr></table></center><br><br><p></p><center><font size="-2">CyberBuddy News Processor</font></center></body></html>'
        self.send_html(200, 'OK', page)
        log.info('CYBERBUDDY NEWSPAGE -> 200 (fresh RSS)')

    def fetch_news_items(self,feed_url=None):
        url=feed_url or CFG.get('web_watching','news_feed')
        request=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0 ArthurTube-Public-News'})
        with urllib.request.urlopen(request,timeout=10) as response:
            data=response.read(2*1024*1024+1)
        if len(data)>2*1024*1024:raise ValueError('Feed too large')
        return ET.fromstring(data).findall('.//item')[:20]
    def send_html(self,status,reason,page):
        self.page=page

if __name__=='__main__':
    news=PublicNews();news.send_cyberbuddy_newspage()
    stamp=datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%d %H:%M UTC')
    page=news.page.replace('charset=windows-1252','charset=utf-8').replace('</body>','<p align="center"><small>Last refresh: '+stamp+'. Headlines reflect available feeds at refresh time. <a href="index.html">Classic Proxy pages</a></small></p></body>')
    output=Path(__file__).resolve().parents[1]/'cyberbuddy/news.html'
    output.write_text(page,encoding='utf-8')
    print('News refreshed: '+stamp)
