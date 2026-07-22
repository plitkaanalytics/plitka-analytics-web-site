const DATA = {
  "meta": {
    "title": "Buyan-M MRK Project 21631 — chronicle 2013–2026",
    "version": "1.0",
    "ships": [
      { "id": "sviyazhsk",      "name": "Grad Sviyazhsk",   "hull_number": "652", "commissioned": "2014-07-12", "color": "#1F4E78" },
      { "id": "uglich",         "name": "Uglich",            "hull_number": "653", "commissioned": "2014-11-26", "color": "#2980B9" },
      { "id": "veliky_ustyug",  "name": "Veliky Ustyug",    "hull_number": "651", "commissioned": "2014-11-26", "color": "#85C1E9" },
      { "id": "zeleny_dol",     "name": "Zeleny Dol",       "hull_number": "562", "commissioned": "2015-12-12", "color": "#1F8A5B" },
      { "id": "serpukhov",      "name": "Serpukhov",         "hull_number": "563", "commissioned": "2015-12-12", "color": "#27AE60" },
      { "id": "vyshniy_volochek","name": "Vyshniy Volochek", "hull_number": "609", "commissioned": "2018-12-18", "color": "#C8102E" },
      { "id": "orekhovo_zuevo", "name": "Orekhovo-Zuevo",   "hull_number": "626", "commissioned": "2018-12-24", "color": "#E74C3C" },
      { "id": "ingushetia",     "name": "Ingushetia",        "hull_number": "600", "commissioned": "2019-12-20", "color": "#E67E22" },
      { "id": "grayvoron",      "name": "Grayvoron",         "hull_number": "622", "commissioned": "2021-01-30", "color": "#F39C12" },
      { "id": "grad",           "name": "Grad",              "hull_number": "575", "commissioned": "2022-12-29", "color": "#9B59B6" },
      { "id": "naro_fominsk",   "name": "Naro-Fominsk",     "hull_number": "577", "commissioned": "2023-12-25", "color": "#8E44AD" },
      { "id": "stavropol",      "name": "Stavropol",         "hull_number": "555", "commissioned": "2026-12-01", "color": "#607D8B" }
    ],
    "locations": {
      "sevastopol":    { "name": "Sevastopol",              "lat": 44.6166, "lng": 33.5254, "type": "naval_base" },
      "novorossiysk":  { "name": "Novorossiysk",            "lat": 44.7239, "lng": 37.7693, "type": "naval_base" },
      "tartus":        { "name": "Tartus (Syria)",           "lat": 34.8853, "lng": 35.8869, "type": "naval_base" },
      "baltiysk":      { "name": "Baltiysk",                "lat": 54.6463, "lng": 19.9069, "type": "naval_base" },
      "kronstadt":     { "name": "Kronstadt",               "lat": 59.9956, "lng": 29.7672, "type": "naval_base" },
      "kaspiysk":      { "name": "Kaspiysk",                "lat": 42.8867, "lng": 47.6383, "type": "naval_base" },
      "astrakhan":     { "name": "Astrakhan",               "lat": 46.3479, "lng": 48.0336, "type": "shipyard" },
      "zeleno_dol_shipyard": { "name": "Zelenodolsk (yard)","lat": 55.8422, "lng": 48.5101, "type": "shipyard" },
      "black_sea":     { "name": "Black Sea",               "lat": 43.5000, "lng": 34.0000, "type": "operational_zone" },
      "caspian_sea":   { "name": "Caspian Sea",             "lat": 42.5000, "lng": 49.5000, "type": "operational_zone" },
      "baltic_sea":    { "name": "Baltic Sea",              "lat": 56.0000, "lng": 19.0000, "type": "operational_zone" },
      "azov_sea":      { "name": "Sea of Azov",             "lat": 45.9000, "lng": 36.8000, "type": "operational_zone" },
      "temryuk":       { "name": "Temryuk Bay",             "lat": 45.2700, "lng": 37.3800, "type": "operation_area" },
      "med_east":      { "name": "Mediterranean Sea",       "lat": 34.0000, "lng": 30.0000, "type": "operational_zone" },
      "bosphorus":     { "name": "Bosphorus",               "lat": 41.1190, "lng": 29.0697, "type": "strait" },
      "onega_lake":    { "name": "Lake Onega",              "lat": 61.7000, "lng": 35.2000, "type": "operation_area" },
      "northern_fleet_range": { "name": "Chizha (range)",  "lat": 68.0000, "lng": 44.3000, "type": "operation_area" },
      "white_sea":     { "name": "White Sea",               "lat": 65.0000, "lng": 35.0000, "type": "operational_zone" },
      "rybinsk":       { "name": "Rybinsk",                 "lat": 58.0500, "lng": 38.8500, "type": "transit_point" },
      "volgograd":     { "name": "Volgograd",               "lat": 48.7080, "lng": 44.5133, "type": "transit_point" },
      "rostov_don":    { "name": "Rostov-on-Don",           "lat": 47.2357, "lng": 39.7015, "type": "transit_point" },
      "ukraine_target": { "name": "Targets in Ukraine",    "lat": 49.8397, "lng": 35.0000, "type": "target" },
      "zaporizhzhia":  { "name": "Zaporizhzhia region",    "lat": 47.5500, "lng": 35.8000, "type": "target" },
      "kyiv":          { "name": "Kyiv",                    "lat": 50.4501, "lng": 30.5234, "type": "target" },
      "syria_isis":    { "name": "Syria (ISIS targets)",    "lat": 35.9500, "lng": 38.0000, "type": "target" }
    },
    "event_types": {
      "position":            "Base segment (where the ship was from date A to date B)",
      "transit":             "Transit (from point A to point B)",
      "strike_outgoing":     "Ship conducted a strike (missile launch)",
      "strike_incoming":     "Ship came under attack",
      "incident":            "Incident (accident, non-combat damage)",
      "command":             "Command (change of captain, decorations, ceremony)",
      "operation":           "Operation without strike (exercise, demonstration)",
      "context":             "External event affecting the ship"
    }
  },

  "positions": [
    // ──────────────────── CASPIAN FLOTILLA ───────────────────
    { "id": "p_sviy_01", "ship": "sviyazhsk",     "from": "2014-07-12", "to": "2018-12-01", "location": "astrakhan",  "note": "Astrakhan naval base — primary home port" },
    { "id": "p_sviy_02", "ship": "sviyazhsk",     "from": "2018-12-01", "to": "2026-05-31", "location": "kaspiysk",   "note": "Transfer to new flotilla base at Kaspiysk" },

    { "id": "p_ugl_01",  "ship": "uglich",         "from": "2014-11-26", "to": "2018-12-01", "location": "astrakhan",  "note": "Astrakhan naval base" },
    { "id": "p_ugl_02",  "ship": "uglich",         "from": "2018-12-01", "to": "2026-05-31", "location": "kaspiysk",   "note": "Kaspiysk — permanent base after flotilla relocation" },

    { "id": "p_vu_01",   "ship": "veliky_ustyug",  "from": "2014-11-26", "to": "2018-12-01", "location": "astrakhan",  "note": "Caspian Flotilla, Astrakhan" },
    { "id": "p_vu_02",   "ship": "veliky_ustyug",  "from": "2018-12-01", "to": "2022-01-01", "location": "kaspiysk",   "note": "Kaspiysk — new flotilla base" },
    { "id": "p_vu_03",   "ship": "veliky_ustyug",  "from": "2022-01-01", "to": "2022-06-17", "location": "sevastopol", "note": "Transit to Black/Azov Sea — basing and combat launches" },
    { "id": "p_vu_04",   "ship": "veliky_ustyug",  "from": "2022-06-17", "to": "2023-09-01", "location": "astrakhan",  "note": "Return via Volga to Astrakhan for repair after strike" },
    { "id": "p_vu_05",   "ship": "veliky_ustyug",  "from": "2023-09-01", "to": "2026-05-31", "location": "kaspiysk",   "note": "Return to flotilla after repair — operational" },

    // ──────────────────── BLACK SEA FLEET ────────────────────
    { "id": "p_vv_01",   "ship": "vyshniy_volochek","from": "2018-12-18", "to": "2023-10-01", "location": "sevastopol", "note": "41st Missile Boat Brigade BSF, Sevastopol" },
    { "id": "p_vv_02",   "ship": "vyshniy_volochek","from": "2023-10-01", "to": "2026-05-31", "location": "novorossiysk","note": "Novorossiysk — after BSF withdrawal from Sevastopol" },

    { "id": "p_oz_01",   "ship": "orekhovo_zuevo",  "from": "2018-12-24", "to": "2022-01-21", "location": "sevastopol", "note": "41st Brigade BSF, Sevastopol" },
    { "id": "p_oz_02",   "ship": "orekhovo_zuevo",  "from": "2022-01-21", "to": "2024-12-08", "location": "med_east",   "note": "Mediterranean Squadron — via Tartus; blocked by Montreux Convention" },
    { "id": "p_oz_03",   "ship": "orekhovo_zuevo",  "from": "2024-12-08", "to": "2026-05-31", "location": "kronstadt",  "note": "Baltic — after leaving Tartus (fall of Assad regime)" },

    { "id": "p_ing_01",  "ship": "ingushetia",       "from": "2019-12-20", "to": "2023-10-01", "location": "sevastopol", "note": "41st Brigade BSF, Sevastopol" },
    { "id": "p_ing_02",  "ship": "ingushetia",       "from": "2023-10-01", "to": "2026-05-31", "location": "novorossiysk","note": "Novorossiysk — after BSF withdrawal from Sevastopol" },

    { "id": "p_grav_01", "ship": "grayvoron",        "from": "2021-01-30", "to": "2023-10-01", "location": "sevastopol", "note": "41st Brigade BSF, Sevastopol" },
    { "id": "p_grav_02", "ship": "grayvoron",        "from": "2023-10-01", "to": "2026-05-31", "location": "novorossiysk","note": "Novorossiysk — combat duty rotations in Temryuk Bay" },

    // ──────────────────── BALTIC FLEET ─────────────────────
    { "id": "p_zd_01",   "ship": "zeleny_dol",       "from": "2015-12-12", "to": "2016-10-28", "location": "sevastopol", "note": "Initially BSF, 41st Brigade" },
    { "id": "p_zd_02",   "ship": "zeleny_dol",       "from": "2016-10-28", "to": "2020-05-01", "location": "baltiysk",   "note": "36th Brigade Baltic Fleet — transit around Europe" },
    { "id": "p_zd_03",   "ship": "zeleny_dol",       "from": "2020-05-01", "to": "2020-10-15", "location": "northern_fleet_range", "note": "Transit via White Sea–Baltic Canal — training Caliber launch at Chizha range" },
    { "id": "p_zd_04",   "ship": "zeleny_dol",       "from": "2020-10-15", "to": "2026-05-31", "location": "baltiysk",   "note": "Return via inland waterways — Baltiysk" },

    { "id": "p_serp_01", "ship": "serpukhov",         "from": "2015-12-12", "to": "2016-10-28", "location": "sevastopol", "note": "Initially BSF, 41st Brigade" },
    { "id": "p_serp_02", "ship": "serpukhov",         "from": "2016-10-28", "to": "2023-08-01", "location": "baltiysk",   "note": "36th Brigade Baltic Fleet" },
    { "id": "p_serp_03", "ship": "serpukhov",         "from": "2023-08-01", "to": "2023-11-01", "location": "northern_fleet_range", "note": "Transit via White Sea–Baltic Canal — training Caliber launch at Chizha range" },
    { "id": "p_serp_04", "ship": "serpukhov",         "from": "2023-11-01", "to": "2024-04-07", "location": "baltiysk",   "note": "Baltiysk — return via inland waterways" },
    { "id": "p_serp_05", "ship": "serpukhov",         "from": "2024-04-07", "to": "2026-05-31", "location": "baltiysk",   "note": "Baltiysk — communications and automation systems destroyed; hull intact" },

    { "id": "p_grad_01", "ship": "grad",              "from": "2022-12-29", "to": "2025-09-01", "location": "baltiysk",   "note": "36th Brigade Baltic Fleet — youngest ship in the group" },
    { "id": "p_grad_02", "ship": "grad",              "from": "2025-09-01", "to": "2025-10-04", "location": "onega_lake", "note": "Transit via Volga-Balt to Caspian — Lake Onega" },
    { "id": "p_grad_03", "ship": "grad",              "from": "2025-10-04", "to": "2026-05-31", "location": "onega_lake", "note": "Lake Onega — struck; under repair on site or in Petrozavodsk" },

    { "id": "p_nf_01",   "ship": "naro_fominsk",      "from": "2023-12-25", "to": "2026-05-31", "location": "baltiysk",   "note": "36th Brigade Baltic Fleet — commissioned 25.12.2023" },

    { "id": "p_stav_01", "ship": "stavropol",         "from": "2024-12-23", "to": "2026-05-31", "location": "baltiysk",   "note": "Factory sea trials and state acceptance trials in the Baltic; commissioning planned 2026" }
  ],

  "events": [
    {
      "id": "e_001",
      "type": "strike_outgoing",
      "date": "2015-10-07",
      "ships": ["sviyazhsk", "uglich", "veliky_ustyug"],
      "location": "syria_isis",
      "title": "\"Caspian Sword\": first Caliber strikes against ISIS in Syria",
      "description": "In the night of 7 October (Putin's birthday) Grad Sviyazhsk, Uglich, and Veliky Ustyug, together with the missile frigate Dagestan (Pr. 11661K), fired 26 Caliber-NK cruise missiles at 11 ISIS targets in Syria from the Caspian Sea. The missiles flew over 1,500 km through Iranian and Iraqi airspace. The first ever combat launch of Caliber from a Buyan-M. Putin announced the operation the following morning at a meeting with security officials.",
      "sources": ["Russian MoD; TASS"],
      "importance": 5
    },
    {
      "id": "e_002",
      "type": "strike_outgoing",
      "date": "2015-11-20",
      "ships": ["sviyazhsk", "uglich", "veliky_ustyug"],
      "location": "syria_isis",
      "title": "Second Caspian strike on Syria (Raqqa/Idlib/Aleppo)",
      "description": "The same strike group fired 18 Caliber-NK missiles at 7 targets in the Syrian provinces of Raqqa, Idlib, and Aleppo. The attack was conducted in response to the terrorist bombing of a Russian airliner over the Sinai Peninsula on 31 October 2015.",
      "sources": ["Russian MoD; TASS"],
      "importance": 3
    },
    {
      "id": "e_003",
      "type": "transit",
      "date": "2016-10-04",
      "ships": ["zeleny_dol", "serpukhov"],
      "location": "bosphorus",
      "title": "Zeleny Dol and Serpukhov transit from BSF to Baltic around Europe",
      "description": "On 4 October 2016 both ships departed Sevastopol. On 28 October they arrived at Baltiysk — via the Mediterranean, Gibraltar, the English Channel, and the North Sea. Port calls in Valletta (Malta) and Ceuta (Spain). Joined the 36th Missile Boat Brigade of the Baltic Naval Base.",
      "sources": ["Baltic Fleet press service; fleet journal"],
      "importance": 3
    },
    {
      "id": "e_004",
      "type": "context",
      "date": "2022-02-24",
      "ships": ["vyshniy_volochek", "ingushetia", "grayvoron", "veliky_ustyug"],
      "location": "black_sea",
      "title": "Full-scale invasion begins — Buyan-Ms in combat positions",
      "description": "On 24 February 2022, three combat-ready Buyan-Ms of the BSF are based in the Black Sea: Vyshniy Volochek, Ingushetia, Grayvoron (Sevastopol). Orekhovo-Zuevo has been in the Mediterranean for three weeks. Veliky Ustyug (Caspian) — route unknown; will appear in the Black/Azov Sea during 2022. Zeleny Dol and Serpukhov — in the Baltic.",
      "sources": ["BlackSeaNews; Ukrainian Naval Forces"],
      "importance": 4
    },
    {
      "id": "e_005",
      "type": "context",
      "date": "2022-01-21",
      "ships": ["orekhovo_zuevo"],
      "location": "bosphorus",
      "title": "Orekhovo-Zuevo passes Bosphorus — 34 days before the invasion",
      "description": "On 21 January 2022 Orekhovo-Zuevo (hull 626) transited the Bosphorus southbound — reinforcing Russia's permanent Mediterranean squadron. From 28 February 2022 Turkey applied Art. 19 of the Montreux Convention: Orekhovo-Zuevo remained in the Mediterranean along with 12 other ships. No confirmed Caliber launch against Ukraine from this ship — geography of the Mediterranean and overflight of Turkey made this impossible.",
      "sources": ["BlackSeaNews; Montreux Convention 1936"],
      "importance": 4
    },
    {
      "id": "e_006",
      "type": "strike_outgoing",
      "date": "2022-03-28",
      "ships": ["vyshniy_volochek"],
      "location": "zaporizhzhia",
      "title": "First confirmed Buyan-M launches against Ukraine (Orikhiv)",
      "description": "On 28 March 2022 the Russian MoD reported that one Pr. 21631 ship fired 8 cruise missiles from the Black Sea at an \"ammunition depot in Orikhiv.\" Launch footage was published by the Ministry of Defence — the first public video confirmation of a Buyan-M used in combat against Ukraine. The specific ship was not officially named; the most likely candidate is one of the three Sevastopol Buyan-Ms.",
      "sources": ["Naval News, 28.03.2022; Russian MoD"],
      "importance": 5
    },
    {
      "id": "e_007",
      "type": "strike_incoming",
      "date": "2022-06-17",
      "ships": ["veliky_ustyug"],
      "location": "astrakhan",
      "title": "Veliky Ustyug struck and towed via Volga for repair",
      "description": "On 17 June 2022 a photograph appeared of Veliky Ustyug (hull 651) being towed by a tugboat along the Volga: tactical number and name painted over, main radar removed. Defense Blog (airbase.ru): damage consistent with BM-21 Grad MLRS artillery, likely from the left bank of Kinburn Spit. Exact date of the strike not established — possibly as early as February–March 2022. Route: return to Astrakhan.",
      "sources": ["Defense Blog, 17.06.2022; airbase.ru; open-source photos"],
      "importance": 4
    },
    {
      "id": "e_008",
      "type": "operation",
      "date": "2022-07-28",
      "ships": ["veliky_ustyug"],
      "location": "kronstadt",
      "title": "Veliky Ustyug at the Main Naval Parade in St. Petersburg",
      "description": "On 28 July 2022 Veliky Ustyug participated in the Main Naval Parade in St. Petersburg — less than 5 months after the probable strike. Commander Maxim Nikiforov: \"the MRK's name will never be dishonoured.\" The fact of the strike and repair was never publicly acknowledged.",
      "sources": ["Russian MoD; TASS"],
      "importance": 2
    },
    {
      "id": "e_009",
      "type": "incident",
      "date": "2023-10-13",
      "ships": ["ingushetia"],
      "location": "sevastopol",
      "title": "Unverified explosion near a Buyan-M in Sevastopol",
      "description": "On the morning of 13 October 2023 a powerful explosion occurred in Sevastopol. The Crimean Wind Telegram channel published photos of smoke near a ship. SBU sources told UNN and Channel 24 of a strike by Sea Baby marine drones with \"experimental ordnance.\" An alternative version is an underwater explosion during exercises. No confirmed strike on a specific ship. Recorded as unverified.",
      "sources": ["Telegram 'Crimean Wind'; SBU sources/UNN"],
      "importance": 2,
      "verified": false
    },
    {
      "id": "e_010",
      "type": "transit",
      "date": "2023-10-02",
      "ships": ["vyshniy_volochek", "ingushetia", "grayvoron"],
      "location": "novorossiysk",
      "title": "BSF Buyan-Ms relocate from Sevastopol to Novorossiysk",
      "description": "After Storm Shadow strikes on BSF HQ (22.09.2023) and on Sevmorzavod on 13 September (hitting LSD Minsk and submarine Rostov-on-Don), all surface Caliber carriers of the BSF moved to Novorossiysk. Pr. 21631 MRKs relocated at roughly the same time as the frigates. New patrol logic: combat launches — from Temryuk Bay in the Sea of Azov.",
      "sources": ["MT Anderson on X; ISW; British MoD intelligence"],
      "importance": 4
    },
    {
      "id": "e_011",
      "type": "operation",
      "date": "2020-07-01",
      "ships": ["zeleny_dol"],
      "location": "northern_fleet_range",
      "title": "Zeleny Dol — first inter-fleet transit of a Baltic Buyan-M via the White Sea–Baltic Canal",
      "description": "Zeleny Dol completed an inter-fleet transit to the Northern Fleet via the White Sea–Baltic Canal, where it conducted a Caliber launch against a shore target at the Chizha range (Arkhangelsk region). In September 2020 it returned to Baltiysk via inland waterways — covering over 4,000 nautical miles. First to open this route for Baltic Buyan-Ms.",
      "sources": ["Baltic Fleet press service; fleet journal"],
      "importance": 3
    },
    {
      "id": "e_012",
      "type": "operation",
      "date": "2023-09-01",
      "ships": ["serpukhov"],
      "location": "northern_fleet_range",
      "title": "Serpukhov — White Sea–Baltic Canal transit, training Caliber launch",
      "description": "Autumn 2023: Serpukhov transited via the White Sea–Baltic Canal to the Arkhangelsk region (Chizha range). Under the command of Sergei Borisenko it conducted a Caliber launch against a shore target — the only known combat shot by the ship during its service in the Baltic Fleet. Returned to Baltiysk via inland waterways.",
      "sources": ["Baltic Fleet press service; departmental press"],
      "importance": 2
    },
    {
      "id": "e_013",
      "type": "strike_incoming",
      "date": "2024-04-07",
      "ships": ["serpukhov"],
      "location": "baltiysk",
      "title": "Operation Rybalka: fire aboard Serpukhov in Baltiysk",
      "description": "On 7 April 2024 at 00:00 in Baltiysk, a GUR MoU agent with the callsign \"Goga\" (a Baltic Fleet sailor) set fire to Serpukhov from inside. The fire destroyed communications and automation systems; the hull remained afloat. \"Goga\" removed classified documents and defected to Ukraine. Details revealed at a press conference by GUR and the Legion \"Freedom of Russia\" in Kyiv in July 2024. Russia never officially acknowledged the fire.",
      "sources": ["GUR MoU; Legion 'Freedom of Russia'; RBC-Ukraine, 08.04.2024"],
      "importance": 5
    },
    {
      "id": "e_014",
      "type": "strike_incoming",
      "date": "2024-11-06",
      "ships": ["sviyazhsk", "uglich"],
      "location": "kaspiysk",
      "title": "First GUR drone strike on the Caspian Flotilla",
      "description": "On 6 November 2024 GUR MoU conducted the first attack by ultra-light A-22 Letuchaya Lisitsa drones on the Caspian Flotilla base at Kaspiysk (~1,500 km). Primary documented targets were frigates Tatarstan and Dagestan (Pr. 11661K). ISW and The War Zone recorded two Buyan-Ms in the port and acknowledged \"possible damage,\" but no specific confirmed strike on Pr. 21631 MRKs.",
      "sources": ["GUR MoU; ISW; BILD (Julian Röpcke); MT Anderson on X"],
      "importance": 4,
      "verified": false
    },
    {
      "id": "e_015",
      "type": "incident",
      "date": "2025-08-07",
      "ships": ["vyshniy_volochek"],
      "location": "temryuk",
      "title": "Vyshniy Volochek collides with tanker Nazan while evading UAV",
      "description": "On 7 August 2025 Vyshniy Volochek deployed for combat duty in Temryuk Bay. While manoeuvring to evade Ukrainian strike drones, the ship collided with the oil tanker Nazan. Documents of the 41st Missile Boat Brigade, published in open sources, record the accident: \"actions by enemy unmanned aerial vehicles.\" Damage extent unknown — the ship disappears from public reports in August–September.",
      "sources": ["41st Missile Boat Brigade documents (open access)"],
      "importance": 3
    },
    {
      "id": "e_016",
      "type": "strike_incoming",
      "date": "2025-08-28",
      "ships": ["grayvoron"],
      "location": "temryuk",
      "title": "Operation Prymary (GUR): drone strikes Buyan-M radar in Temryuk Bay",
      "description": "On 28 August 2025 — a joint operation by the DAD and GUR special unit Prymary. An aerial drone struck the ship's radar; a second drone attacked the hull. GUR published video. According to GUR, the ship had deployed to the bay for a launch mission (a mass strike on Kyiv that night) — the launch did not happen and the ship left the area. The specific ship was not publicly named; probably Grayvoron or Ingushetia.",
      "sources": ["GUR MoU; DAD GUR; GUR MoU video"],
      "importance": 5
    },
    {
      "id": "e_017",
      "type": "strike_incoming",
      "date": "2025-10-04",
      "ships": ["grad"],
      "location": "onega_lake",
      "title": "SOF strike on MRK Grad in Lake Onega during transit to Caspian",
      "description": "On 4 October 2025 at 04:31 a Ukrainian SOF unit struck MRK Grad (hull 575, Pr. 21631) in Lake Onega (Republic of Karelia). Per the SOF Command report, the strike hit the right section of the propulsion compartment. The ship was transiting Baltic Fleet → Caspian Fleet via the Volga-Baltic Waterway (Neva → Lake Ladoga → Svir → Lake Onega). Commissioned only 29.12.2022 — the youngest ship in the group.",
      "sources": ["Ukrainian SOF Command; General Staff of Ukraine, 04.10.2025"],
      "importance": 5
    },
    {
      "id": "e_018",
      "type": "transit",
      "date": "2024-12-08",
      "ships": ["orekhovo_zuevo"],
      "location": "kronstadt",
      "title": "Orekhovo-Zuevo transfers to Baltic after leaving Tartus",
      "description": "On 8 December 2024, following the fall of the Assad regime, Orekhovo-Zuevo left Tartus together with frigate Admiral Grigorovich and transferred to the Baltic. Based at Kronstadt as part of the 36th Brigade. Formally still fleet-registered as Black Sea Fleet — the first such precedent in the series. No confirmed combat launch against Ukraine throughout its entire service.",
      "sources": ["GUR MoU, 08.12.2024; MT Anderson on X"],
      "importance": 3
    },
    {
      "id": "e_019",
      "type": "command",
      "date": "2019-07-01",
      "ships": ["uglich"],
      "location": "kaspiysk",
      "title": "Uglich and Veliky Ustyug — transit via Bosphorus to the Mediterranean",
      "description": "In 2019 Uglich, together with Veliky Ustyug, transited via inland waterways from the Caspian through the Volga-Don Canal → Sea of Azov → Black Sea → Bosphorus → Dardanelles → Mediterranean and back. Per Krasnaya Zvezda, over the training year Uglich covered ~20,500 nautical miles without navigational incidents.",
      "sources": ["Krasnaya Zvezda, January 2020; Caspian Flotilla press service"],
      "importance": 2
    },
    {
      "id": "e_020",
      "type": "strike_incoming",
      "date": "2026-05-15",
      "ships": ["sviyazhsk", "uglich"],
      "location": "kaspiysk",
      "title": "Strikes on the Caspian Flotilla (May 2026, unverified)",
      "description": "On 15 May 2026 Exilenova+ recorded prolonged explosions in Kaspiysk, with a military vessel or vessels possibly struck and over 30 wounded. No official confirmation of a hit on specific Pr. 21631 MRKs. The 2024–2026 strike series produced no confirmed destruction of a Buyan-M on the Caspian — unlike the frigates.",
      "sources": ["Exilenova+, 15.05.2026"],
      "importance": 3,
      "verified": false
    },
    {
      "id": "e_021",
      "type": "command",
      "date": "2024-07-12",
      "ships": ["sviyazhsk"],
      "location": "kaspiysk",
      "title": "Grad Sviyazhsk — 10 years in service, 22 combat launches",
      "description": "10th anniversary of Grad Sviyazhsk's commissioning (the first Pr. 21631 ship). Per a Krasnaya Zvezda report (March 2024), under the command of Kirill Alexandrov (from June 2020) the ship carried out 22 combat missile launches. In 2023: 30 combat exercises, 90 days at sea, 3,000+ nautical miles. In autumn 2023 won the C-in-C of the Navy prize for firing against a shore target (Chechen Island).",
      "sources": ["Krasnaya Zvezda, March 2024; Caspian Flotilla press service"],
      "importance": 2
    },
    {
      "id": "e_022",
      "type": "strike_incoming",
      "date": "2024-11-30",
      "ships": ["sviyazhsk", "uglich"],
      "location": "kaspiysk",
      "title": "Repeat attacks on Kaspiysk (November–December 2024)",
      "description": "30 November 2024 — repeat attack; Dagestan regional head called it \"without result.\" 1 December 2025 — strike on the naval base, drones reportedly shot down by air defences. 11–19 December 2025 — focus on oil production and transport (Filanovsky and Korchagina platforms, vessels Rakhmaninov and Askar-Saridzha). The 2024–2025 strike series produced no confirmed hit on a specific Buyan-M.",
      "sources": ["Exilenova+; ISW; Dagestan regional media"],
      "importance": 3,
      "verified": false
    },
    {
      "id": "e_023",
      "type": "strike_outgoing",
      "date": "2024-07-08",
      "ships": ["sviyazhsk", "uglich", "veliky_ustyug"],
      "location": "kyiv",
      "title": "Calibers over the Caspian recorded on the day of the Okhmatdyt strike",
      "description": "8 July 2024 — first documented video confirmation of Calibers flying over the Caspian Sea during a strike on Ukraine. On the same day a Caliber struck the Okhmatdyt children's hospital in Kyiv. The specific carrier was not publicly attributed; Caspian carriers are the Buyan-Ms and Dagestan (Pr. 11661K). A missile that went off-course fell in Kalmykia (300 km from the Ukrainian border) the same day.",
      "sources": ["Ukrainian Naval Forces; OSINT video from Caspian; Defence Express"],
      "importance": 4,
      "verified": false
    }
  ]
};
