CYBERBUDDY CLASSIC PROXY — ENGLISH EDITION 5.5.26
==================================================

An independent compatibility proxy for the original CyberBuddy. It is not an
official CyberBuddy release and does not contain the original program.

Requirements: Windows 10/11 and Python 3.

GET STARTED
-----------
1. Extract the entire ZIP to one folder.
2. Run START_PROXY.bat. Keep its window open.
3. Run ENABLE_WINDOWS_PROXY.bat. It sets the HTTP and HTTPS proxy for your
   Windows account to 127.0.0.1:8081.
4. Run TEST_PROXY.bat. For a weather check, run CHECK_WEATHER.bat or open
   http://127.0.0.1:8081/forecast.cgi/London in a browser.
5. After using CyberBuddy, run RESTORE_INTERNET.bat to disable the Windows
   proxy and restart your browsers.

This version prevents outgoing RSS, weather and website requests from using
the Windows proxy setting and looping back into the local proxy. It addresses
the repeated timeout messages seen after enabling the Windows proxy. Stop
older proxy windows before starting this version.
If you still see timeout warnings, they now name the upstream host once and
count repeated failures. With the Windows proxy enabled, other browser and
Windows traffic also uses this proxy. Close browsers while testing CyberBuddy
to isolate its requests; run RESTORE_INTERNET.bat afterward.
Local requests to 127.0.0.1:8081 are handled by this proxy rather than sent
back into it. Timeout warnings now include the port, so a different local
service can be distinguished from the proxy's own port.

The proxy provides legacy weather pages backed by online geocoding and
Open-Meteo weather data. City names, ZIP codes, and airports are accepted.
Open-Meteo provides current observations and forecasts worldwide, including
U.S. locations. U.S. alerts use the National Weather Service; Brazilian alerts
use INMET's active CAP notices when the affected municipality or alert polygon
matches the requested location. Other countries check IFRC Alert Hub for active
meteorological notices whose alert polygon or circle covers the location.
Alert-feed coverage varies by country. Missing coverage and network errors
are displayed as unavailable rather than as proof that there are no alerts.
INMET CAP details are checked in sequence. If INMET resets a connection, the
page reports alerts as temporarily unavailable and logs one warning; the
forecast itself still loads from Open-Meteo.
Forecast headings use the resolved locality instead of repeating a ZIP code.
Detailed forecast rows use the older layout, full wind directions, and avoid
repeating precipitation names or announcing very small rain chances. Hourly
data can show temperature and wind changes, but cannot reproduce the archived
2013 NWS report. The summary
starts with TODAY in the morning and tomorrow from local noon. Current
observation icons still follow sunrise and sunset. NWS and INMET labels apply
to alerts only, not the Open-Meteo forecast.
The weather page now uses the layout and icons from the supplied Unisys
Weather recreation. Its archived Boone observation and Wayback scripts are
not included; the displayed city and conditions are obtained at request time.
To view it, open http://127.0.0.1:8081/forecast.php?place=Brasilia or
http://127.0.0.1:8081/forecast.cgi/Brasilia while the proxy is running.
Temperature choices are Fahrenheit, Celsius, and Both. The default in
proxy.ini is Both; change temperature_display to fahrenheit or celsius if
CyberBuddy speaks the combined temperature awkwardly.

NEWS AND WEB WATCHING
---------------------
The proxy converts current headlines to the old news3.html command format.
CyberBuddy's startup news1.html and news2.html requests on yeayou.com,
thecyberbuddy.com, and mycyberbuddy.com use that same command format.
Those URLs are populated when CyberBuddy requests them; they do not return
an HTML doctype for the character to read aloud.
The news3.html response now places current RSS headlines in Top Stories,
Science News, Medical News and Internet News. Media, Business and Off Beat
show matching current stories when the latest feed includes them; otherwise
those sections stay empty. Headlines appear once per section.
The original CyberBuddy News Page is also available with fresh linked headlines
at http://127.0.0.1:8081/news/newspage.html. With the Windows proxy enabled,
http://thecyberbuddy.com/news/newspage.html shows that same local page.
Top Stories searches current AP and Reuters stories through Google News RSS;
the publisher in each item is checked before it is displayed. Science News
uses the LiveScience feed. If either service is unavailable, the proxy uses
its configured English news feed for current headlines. Other sections use
matching current items where available, then general current headlines.
The local Web Watching page is http://proxy.local/news. The default source
is the FOX News feed configured as news_feed in proxy.ini; change that URL
to another RSS feed if desired. This edition does not specially intercept
other news home pages. Requests for other pages and RSS URLs are forwarded
to the original servers. Conversion to Windows-1252
does not guarantee that an old reader can handle every site or language.

EMAIL
-----
POP3 and SMTP bridges run on 127.0.0.1:110 and 127.0.0.1:25. Run
TEST_EMAIL.bat to verify that their ports are open. Gmail authentication
requires an app password; enter it only in CyberBuddy. Do not publish
credentials, email addresses, or proxy logs containing personal data.

LIMITS
------
Version 6.0 status: Jokes, Thoughts, and Stocks are finished. Chat / Instant
Messaging is UNFINISHED. For legacy chat endpoints such as CBonline2.exe,
an HTTP 200 response proves only that a response was received; it does NOT
confirm registration, discovery, message delivery, or receipt.

The words and menus of the original CyberBuddy application are unaffected
by this package. This edition makes the proxy's messages and instructions
English. See WEATHER_TEST_URLS.txt for sample forecast addresses.

WEATHER FORECAST (5.5.28)
-------------------------
The weather page retains the Unisys observation labels that CyberBuddy reads.
For clear conditions it displays "Skies: clear" and leaves "Weather:" blank.
It adds today's sunrise and sunset and a seven-day Open-Meteo summary below
the observation. Available measurements include dew point, apparent temperature,
sea-level pressure and visibility; they come from Open-Meteo's forecast grid,
not a physical station. Open-Meteo supplies forecast periods everywhere.
U.S. alerts come from NWS, Brazilian alerts from INMET, and available alerts
elsewhere from IFRC Alert Hub. Archived 2013 warnings and forecasts are never
reused. Requires internet access for live data. The old Regional Plots links
are not included because they point to obsolete endpoints.

LIVE PAGE IN THE CLASSIC LAYOUT (5.5.30)
---------------------------------------
Live forecasts now use the supplied 2013 Unisys page's header, side menus,
observation table, weather icons, alert placement, seven-column summary,
and image-and-text detailed forecast rows. Values and forecast text come
from Open-Meteo for the requested location worldwide.
The separate 2013 Boone archive page has been removed. The sidebar links
copied from the historic page remain historic Wayback links and may be old.

DAY AND NIGHT FORECASTS (5.5.31)
--------------------------------
The detailed forecast table now alternates daytime and nighttime periods.
Where available, Open-Meteo hourly data supplies the nighttime condition,
low, wind and precipitation chance; the day high comes from its daily data.
These are generated summaries of current forecast data, not the original
2013 NWS prose. U.S. locations use actual current NWS forecast period text
when the NWS endpoint responds, with HI and LO labels and weather icons.

CLASSIC GROUPED PERIODS (5.5.32)
--------------------------------
The Open-Meteo detailed forecast now follows the 2013 page's ten-row pattern:
today, tonight, next day, next night, following day, three combined night-and-
day periods, a final night, and a final day. Period names shift with today's
weekday. The descriptions and temperatures are generated from current daily
and hourly data, so the historic Boone snow and wind warnings are not shown
for unrelated current locations.

DAY AND NIGHT ICONS (5.5.33)
----------------------------
Clear daytime forecast periods use Sun. Clear nighttime periods use Moon,
and cloudy nighttime periods use MoonCloudy. Rain and snow keep their own
weather icons so precipitation remains visible.

FORECAST WORDING (5.5.34)
-------------------------
The live Open-Meteo forecast uses the older uppercase weather prose style:
daytime sky conditions, temperature ranges, precipitation chances when
nonzero, and wind direction and speed where available. The seven dates
always start with today; their weekday names change with the calendar.
The 2013 Boone snow and wind descriptions are not reused as current data.

CLASSIC FORECAST SUMMARY (5.5.35)
---------------------------------
The seven-column summary follows the provided 2013 page: the first two
columns show HI; columns three through seven show HI and LO. The summary
uses plain whole-degree numbers (Fahrenheit when Fahrenheit or Both is
selected, Celsius when Celsius is selected). The observation line still
shows explicit temperature units.

COMPACT DETAIL LABELS (5.5.36)
------------------------------
HI and LO labels in the detailed forecast now also use plain whole-degree
numbers, as on the 2013 page. The selected unit still determines whether
those plain numbers represent Celsius or Fahrenheit; Both uses Fahrenheit
in HI and LO labels. The observation table retains explicit F and C units.

WEATHER EVENT TEXT (5.5.38)
---------------------------
The observation field uses the condition directly: "Weather: light drizzle"
or "Weather: light snow". Clear skies leave "Weather:" blank. The proxy no
longer prefixes precipitation with "There is".

SKIES AND WEATHER (5.5.39)
--------------------------
Skies now describes the cloud cover while Weather describes rain, snow,
drizzle and other events. For example, rainy conditions can display
"Skies: overcast" and "Weather: rain showers". If cloud-cover data is
unavailable during precipitation, Skies displays "cloudy".

NWS PERIOD LAYOUT (5.5.40)
--------------------------
When the NWS forecast starts with a daytime period and includes a full
seven-day sequence, its later night and day periods are combined into the
same ten rows as the supplied 2013 page. The original current NWS prose
for both periods is retained inside each combined row. Shorter forecasts
or those beginning at night keep their original period order. Open-Meteo
phrasing also uses "An" before chances such as 8 percent.

WEATHER PAGE FOOTER (5.5.41)
----------------------------
The weather page no longer prints the extra data-source sentence below
the forecast.

MATCHED U.S. FORECAST SUMMARY (5.5.42)
--------------------------------------
When a complete daytime-first National Weather Service forecast is available,
the seven-day summary uses its temperatures and icons, matching the detailed
NWS forecast below. When NWS has no complete daytime-first forecast, the
summary keeps the Open-Meteo data. Current observations remain Open-Meteo.

NEW YORK VERIFICATION (5.5.43)
------------------------------
The start window now identifies version 5.5.43. The log records which service
provides the forecast summary and details. A simulated New York request was
checked in Fahrenheit, Celsius, and Both; live weather still requires network
access on your computer. Close any previous proxy window before starting the
new version, then request /forecast.cgi/New%20York and check proxy.log for
"summary=NWS details=NWS".

LEGACY SUMMARY LOWS (5.5.44)
----------------------------
From the third summary column onward, LO now corresponds to the previous
night shown in the combined detailed row. For example, Wednesday's LO uses
Tuesday night, for both NWS and Open-Meteo forecasts. The first two columns
remain HI-only, following the supplied 2013 page.

ARCHIVED UNISYS NAVIGATION (5.5.45)
-----------------------------------
The historical menu links lead to January 2013 Wayback Machine captures.
The "Get a Forecast" menu item now opens the proxy's live city/ZIP/airport
form; a separate "Get a Forecast (2013 archive)" link opens the archived
Unisys setup page. Wayback pages are historical, not live forecast sources.

LOCAL WEATHER NAVIGATION (5.5.46)
---------------------------------
The weather page no longer includes Wayback Machine navigation. Weather Home
and Get a Forecast point to the proxy's local forecast form. The city, ZIP and
airport search remains available. The historical navigation described under
version 5.5.45 is no longer included in this release.

ARCHIVE PAGES THROUGH THE PROXY (5.5.47)
---------------------------------------
The full Unisys Weather menu is restored. Its 42 archived destinations now
link to /weather_archive on the local proxy. The proxy retrieves the original
2013 Wayback snapshot over HTTPS, converts the page to Windows-1252, removes
scripts, and rewrites links and images on allowed historical sites to local
proxy addresses. Internet access is needed on the computer running the proxy.
These pages are historical snapshots; Get a Forecast opens the live local
forecast form. Some old page features and external media may be unavailable.

OPEN-METEO WORLD FORECAST (5.5.48)
----------------------------------
All cities, including New York, now use Open-Meteo for the current observation,
seven-day summary and detailed forecast. U.S. severe-weather alerts continue
to come from the National Weather Service. Archived 2013 pages display a
current-weather search at the top, and archived forecast forms submit to the
live local forecast route. Other 2013 weather maps remain historical; their
underlying old data and discontinued model services cannot update live.


LIVE WEATHER MAPS (5.5.52)
--------------------------
The retired 2013 Unisys map sections no longer display historical map imagery as
current data. Analyses, Satellite, Surface, Upper Air, Radar, Model, Hurricane,
Archive of Images, and USGS-map menu routes open a current-map viewer instead.
The viewer displays the computer's current local date/time (for example,
26/09/2026), refreshes every five minutes, and lets the user switch interactively
between current satellite, radar, and surface-analysis imagery. The proxy fetches
those images over HTTPS for the legacy browser. Non-map historical information
pages may still use the January 2013 Wayback snapshot and are explicitly archival.


DIRECT LOCAL UNISYS ROUTES (5.5.52)
-----------------------------------
The recreated Unisys Weather navigation now uses direct localhost paths instead
of /weather_archive?url=... for weather.unisys.com pages. Examples:
  http://127.0.0.1:8081/index.php
  http://127.0.0.1:8081/foresetup.php
  http://127.0.0.1:8081/satellite/index.php
  http://127.0.0.1:8081/gfs/index.php?r=us
Query strings are preserved. Current map/model routes remain interactive.
The old /weather_archive endpoint is retained only for compatibility and for
external historical links.

5.5.54 FULL LOCAL WAYBACK MIRROR
--------------------------------
The older 5.5.54 instructions below described a separate mirror download. In
this package the uploaded local mirror is already included. The downloader now uses the
Windows `py` launcher first and recursively follows HTML href/src/srcset/background/
poster/data-src references plus CSS url(...) resources. It downloads available
HTML, CSS, JavaScript, images, fonts and media into weather_site. The proxy serves
these local files first, so ordinary browsing does not wait for Wayback.

5.5.55 INTERACTIVE LOCAL WEATHER MIRROR
---------------------------------------
Run START_PROXY.bat, then visit http://127.0.0.1:8081/index.php in a browser.
The included weather_site files are served locally, including nested pages,
stylesheets and images. Archived pages identify their charts as historical and
provide a live forecast search. Satellite, radar and surface navigation opens
interactive viewers that request corresponding public images over HTTPS; their
availability and image timestamps depend on the upstream provider. Other model
and archive charts remain from 2013 and are not presented as current weather.
The supplied mirror has missing images; see weather_site/MIRROR_STATUS.txt for
the list. Optionally run REPAIR_WEATHER_IMAGES.bat with internet access to try
recovering them from Wayback. The repair never changes old images into new ones.

5.5.56 CURRENT MODEL VIEWS
--------------------------
The GFS, NAM and RAP index pages now request corresponding NOAA model charts.
Select product and forecast hour on each page. The displayed run is taken from
NOAA's recent available cycles, and the image is downloaded through the proxy
for older browsers. If a recent cycle or image cannot be retrieved, the proxy
shows an error instead of displaying a historical chart as current. Use
?archive=1 on those three index pages to visit the included 2013 mirror.
Nested legacy model pages and the GFSx/ECMWF sections remain archived.

SUNRISE AND SUNSET ICON FIX (5.5.56)
-----------------------------------
The current observation uses the sunrise and sunset for its local forecast
date. At sunrise the clear-sky icon switches to the sun; at sunset it switches
to the moon. If the daily times are unavailable, Open-Meteo's is_day field is
used. The version number remains 5.5.56.

5.5.59 LIVE 2013 FORECAST SITE MATCH
- Forecast Summary now shows HI and LO in all seven columns, matching the archived 2013 page.
- Detailed live forecast periods are chronological: TODAY/TONIGHT by day, or TONIGHT first after 6 PM local time.
- Both Forecast Summary and Detailed forecast are generated from current Open-Meteo data; archived 2013 weather values are never retained.
- Keeps the original Unisys 2013 table/icon presentation.

5.5.60 - Exact 2013 forecast sequence/layout correction
- Forecast Summary starts with the next full day, matching the archived 2013 Unisys page (no TODAY column).
- Detailed forecast starts with TONIGHT, then next day, next night, etc.
- Restored the 2013-style AREA / INCLUDING THE CITIES OF / issuance-time header before the detailed table.
- All values remain live Open-Meteo data; only the 2013 presentation/sequence is reproduced.

6.0:
- Corrected internal version labels so old/new proxy instances are easy to distinguish.
- Use START_6.0_CLEAN.bat after closing any older proxy window.
- Forecast Summary begins with the next full day; detailed forecast begins with TONIGHT, matching the supplied 2013 page structure.

6.0 forecast page correction:
- Requests eight days of live data so the summary displays seven full days
  after today, as on the 2013 page.
- An explicitly empty /forecast.php?Name= loads current weather for the
  configured weather.default_location (Formosa, Goias, Brazil by default).
- The archived search form submits Name; an unqualified /forecast.php shows
  that form without duplicating it or showing archived 2013 observations.

Weather request caching (429 fix)
-------------------------------
This edition reuses each Open-Meteo forecast for 20 minutes and each location
lookup for 24 hours. If Open-Meteo replies 429, the proxy pauses further
weather requests for the provider's Retry-After interval (or 5 minutes).
A previous forecast for the requested location can still be displayed, with
its observation time and a visible cached-forecast notice. If no forecast was
saved for that location, the page shows a temporary-unavailable message.
Cache entries are in memory and are cleared when the proxy is restarted.
The Open-Meteo free hosted API is subject to its published usage limits;
this change does not make the service unlimited.

INMET alert retry fix
---------------------
INMET alert lookups now reuse success or temporary failure for five minutes
per location. A refresh during an INMET outage does not repeatedly request
CAP details; the alert section still says temporarily unavailable until it
can be checked again. This cache is cleared when the proxy is restarted.

SEPTEMBER 30 ROUTING FIX
------------------------
Joke and thought requests to 66.135.47.52 and CyberBuddy website aliases
now use the local response handler instead of returning an upstream 404.
This fixes routing; acceptance by the original client still needs testing.

JOKE AND THOUGHT FORMAT FIX
--------------------------
Inspection of CyberBud.exe 4.13.9 found that joke and thought files
require $$ entry separators. The proxy now supplies those separators
and plain text instead of an HTML body. Test both Get buttons again.
Jokes, thoughts and stocks are finished in version 6.0. Chat/messaging remains unfinished.

Joke/thought entries now end at EOF instead of an empty $$ entry.
Sentences are sent on separate lines for the original line-by-line reader.
The included local texts are replacements, not recovered server content.

Local jokes and thoughts now each contain 600 entries. Requests select a random entry and avoid an immediate repeat. All entries
include separate animation command lines. Four additional local entries
were added to each category. They are replacements, not archived originals.
Animation names used: Explain, Sad, Pleased, Blink, RestPose. Runtime
playback must still be tested with the selected CyberBuddy character.

The first entries preserve the user-supplied old examples. Additional
entries are local additions. The buttons cycle through entries per request;
there is no online daily-content service or automatic daily refresh.

STOCK QUOTE UPDATE
The legacy Yahoo stock page now fetches provider-reported Yahoo Finance
quotes instead of only showing links. Enter ticker symbols such as AAPL
or MSFT. Quotes include price, change, volume, currency and UTC quote time.
They may be delayed; they are not guaranteed real-time market data.
Quotes are cached for five minutes. Provider errors are reported instead
of replacing unavailable prices with invented values. Invalid symbols and
provider rate limits are handled. Up to ten tickers are accepted.
The legacy table field order was checked against the supplied executable's
stock parser. Stocks are marked finished in version 6.0 based on the completed
CyberBuddy testing for this project.


6.0 STATUS UPDATE - SEPTEMBER 30, 2026
--------------------------------------
Finished: Jokes, Thoughts, Stocks.
Unfinished: Chat / instant messaging.
Observed legacy chat diagnostic: CBonline2.exe can return HTTP 200 while the
response contains none of the known $$UIN / $$SNDTO / $$MYIP / &&EOT markers.
That condition is logged as a transport response only; it is NOT treated as
confirmation that a message was delivered.

CHAT STATUS
Chat and instant messaging are UNFINISHED in version 6.0. Original
CyberBuddy includes direct messaging/UDP code in addition to its HTTP
directory endpoints. CBonline2.exe and UINlister.exe reply formats and
two-client message delivery have not been verified. A successful HTTP
response alone does not establish working chat or message delivery. No success-only chat stub
was added. Upstream request logs now redact query values, which can
contain account identifiers. Older logs may still contain those values.

CHAT DIAGNOSTICS
Chat replies now log request method, endpoint name, HTTP status, response
length and presence of known legacy markers. Query values and message
bodies are excluded. These diagnostics do not restore chat or confirm
delivery. Existing logs are not automatically erased or redacted.
