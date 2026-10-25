from pathlib import Path
import datetime, html, logging, re, urllib.request, xml.etree.ElementTree as ET
logging.basicConfig(level=logging.INFO)
log=logging.getLogger('arthur-news')
SOURCES=[
('Fox News - Latest','https://moxie.foxnews.com/google-publisher/latest.xml'),
('Fox News - World','https://moxie.foxnews.com/google-publisher/world.xml'),
('Fox News - Technology','https://moxie.foxnews.com/google-publisher/tech.xml'),
('BBC News - Top Stories','https://feeds.bbci.co.uk/news/rss.xml'),
('BBC News - World','https://feeds.bbci.co.uk/news/world/rss.xml'),
('BBC News - Business','https://feeds.bbci.co.uk/news/business/rss.xml'),
('BBC News - Technology','https://feeds.bbci.co.uk/news/technology/rss.xml')]

def fetch(url,limit=8):
    req=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0 ArthurTube-News/1.0'})
    with urllib.request.urlopen(req,timeout=8) as r: data=r.read(2*1024*1024+1)
    if len(data)>2*1024*1024: raise ValueError('Feed too large')
    root=ET.fromstring(data); out=[]
    for item in root.findall('.//item')[:limit]:
        title=re.sub(r'\s+',' ',html.unescape(item.findtext('title') or '')).strip()
        link=(item.findtext('link') or '').strip(); date=(item.findtext('pubDate') or '').strip()
        if title and link.startswith(('http://','https://')): out.append((title,link,date))
    return out

def build():
    cards=[]
    for label,url in SOURCES:
        try:
            items=fetch(url)
            body='<ul class="headlines">'+''.join('<li><a target="_blank" rel="noopener noreferrer" href="%s">%s</a>%s</li>'%(html.escape(link,quote=True),html.escape(title),('<small>'+html.escape(date)+'</small>') if date else '') for title,link,date in items)+'</ul>'
        except Exception as e:
            log.warning('%s unavailable: %s',label,e)
            body='<p class="unavailable">Feed temporarily unavailable at the last refresh.</p>'
        cards.append('<section class="source"><h2>%s</h2>%s<a class="feedlink" href="%s">Open original RSS feed</a></section>'%(html.escape(label),body,html.escape(url,quote=True)))
    stamp=datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%d %H:%M UTC')
    page=Path(__file__).with_name('news_template.html').read_text(encoding='utf-8').replace('__STAMP__',stamp).replace('__CARDS__',''.join(cards))
    (Path(__file__).resolve().parents[1]/'news.html').write_text(page,encoding='utf-8')
    print('Arthur Tube News refreshed:',stamp)
if __name__=='__main__': build()
