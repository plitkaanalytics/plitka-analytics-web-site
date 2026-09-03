# Ukrainian & Russia-Focused OSINT Sources — Reference

A curated list of open-source databases and tools relevant to investigations in the Ukrainian and post-Soviet context.

---

## Ukrainian Official Registries

| Source | What it contains | URL |
|---|---|---|
| YouControl | Company ownership, court records, sanctions | youcontrol.com.ua |
| NACP (НАЗК) | Asset declarations of Ukrainian officials | nazk.gov.ua / declarator.org |
| Державний реєстр речових прав | Real estate ownership | drp.gov.ua |
| OpenDataBot | Telegram bot for quick registry lookups | @opendatabot |
| ЄДРПОУ (USR) | Legal entity registration | usr.court.gov.ua |
| Судова влада | Court decisions, defendants | reyestr.court.gov.ua |
| Prozorro | Public procurement contracts | prozorro.gov.ua |
| Minfin | State budget, financial flows | minfin.com.ua |

---

## Russian Open Data (for investigations involving Russia)

| Source | What it contains | URL |
|---|---|---|
| СПАРК / Контур.Фокус | Russian company registry (commercial) | focus.kontur.ru |
| ФНС (FNS) | Official Russian company registry | egrul.nalog.ru |
| Росреестр leaks | Property registry (via leaked data) | Available through distributed archives |
| Russian court decisions | Judgments, often naming individuals | sudact.ru, mos-gorsud.ru |
| VK (ВКонтакте) | Social network — key for Russian soldiers | vk.com |
| OK (Одноклассники) | Older demographic, useful for provincial actors | ok.ru |
| Russian military unit DB | Unit identification, based on community contributions | See: Molfar, InformNapalm databases |

---

## Geolocation Tools

| Tool | Use |
|---|---|
| Google Earth Pro | Historical satellite imagery, measurement tools |
| Sentinel Hub | Free multispectral satellite imagery |
| Planet Labs | High-res imagery (subscription, press access sometimes available) |
| Maxar | High-resolution commercial satellite |
| Google Maps / Street View | Ground-level verification |
| Yandex Panorama | Russian cities, often more recent than Google |
| SunCalc | Shadow analysis for time/date verification |
| PeakVisor | Mountain/terrain identification |
| what3words | Precise location sharing |

---

## Social Media & Messaging

| Platform | Investigative use |
|---|---|
| Telegram | Primary channel for Russian/Ukrainian war content; use TGStat, Telemetr for analytics |
| VK | Russian soldiers, local communities |
| Twitter/X | Global amplification, verification community |
| TikTok | Battlefield footage, often geolocatable |
| Instagram | Soldiers' personal photos (equipment, locations) |
| Facebook | Community groups, local Ukrainian sources |

**Telegram OSINT tools:**
- `TGStat.ru` — channel analytics, history
- `Telemetr.io` — channel growth, cross-posting
- `@username_check_bot` — username history
- Search syntax: `site:t.me [keywords]` in Google

---

## Verification Tools

| Tool | Use |
|---|---|
| Google Reverse Image Search | Find origin/copies of images |
| TinEye | Deep reverse image search |
| Yandex Image Search | Often better for Russian/Eastern European faces |
| InVID / WeVerify | Video verification, metadata extraction |
| FotoForensics | JPEG error analysis, manipulation detection |
| Jeffrey's Exif Viewer | Extract photo metadata |
| Bellingcat's Online Investigation Toolkit | Comprehensive tool list |

---

## Flight & Vessel Tracking

| Tool | Use |
|---|---|
| Flightradar24 | Civil aviation real-time |
| ADS-B Exchange | Less filtered military/government flights |
| MarineTraffic | Vessel tracking |
| VesselFinder | Alternative ship tracker |
| RadarBox | Aviation data |

---

## Financial Investigation

| Tool | Use |
|---|---|
| OpenCorporates | Global company registry aggregator |
| ICIJ Offshore Leaks | Panama Papers, Pandora Papers, etc. |
| OCCRP Aleph | Document search across leaked databases |
| OpenSanctions | Consolidated sanctions database |
| FinCEN Files | US suspicious activity reports |
| Ukrainian YouControl | See above |

---

## Archiving

| Tool | Use |
|---|---|
| web.archive.org | Standard Wayback Machine |
| archive.ph | Faster, better for social media |
| CachedView | Google/Bing cache |
| Hunchly | Browser extension for automatic page capture during research |

---

## Ukrainian OSINT & Investigative Outlets (for cross-referencing)

- **Bellingcat** — bellingcat.com
- **InformNapalm** — informnapalm.org (Russian military unit identification)
- **Molfar** — molfar.com (Ukrainian OSINT community)
- **Slidstvo.info** — slidstvo.info (Ukrainian investigative journalism)
- **OCCRP** — occrp.org
- **Frontstory.pl** — frontstory.pl (Polish-Ukrainian investigations)
- **iStories** — istories.media (Russia-focused independent journalism)
- **The Insider** — theins.ru / en.theins.ru
- **Схеми** (Skhemy) — radiosvoboda.org/skhemy (RFE/RL Ukraine)

---

## Key Ukrainian Military/Conflict OSINT Databases

- **War in Ukraine Live Map** — liveuamap.com
- **UA Control Map** — deepstatemap.live
- **Oryx** — oryxspioenkop.com (visually confirmed equipment losses)
- **Ukraine Weapons Tracker** — @UAWeapons on Twitter
- **Militarist** — militarist.ua

---

## Notes for Investigators

1. **Always archive before citing.** Sources disappear. Archive everything at archive.ph immediately upon discovery.
2. **Screenshot with metadata.** Use browser extensions that capture URL + timestamp.
3. **Cross-reference across platforms.** A single source is rarely enough. Corroborate across at least two independent sources.
4. **Check account creation dates.** New accounts amplifying a narrative may indicate coordinated operations.
5. **Document your methodology.** Keep a research log — date, what you searched, what you found, what you archived. This protects you legally and enables transparency in the final article.
