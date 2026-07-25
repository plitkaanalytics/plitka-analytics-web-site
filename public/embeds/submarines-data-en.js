const DATA = {
  "meta": {
    "title": "Project 636.3 Varshavyanka submarines of the Black Sea Fleet — chronicle 1990–2026",
    "version": "1.0",
    "ships": [
      { "id": "alrosa",    "name": "B-871 Alrosa",            "hull_number": "871", "commissioned": "1990-12-30", "color": "#607D8B" },
      { "id": "rostov",    "name": "B-237 Rostov-on-Don",     "hull_number": "237", "commissioned": "2014-12-30", "color": "#C8102E" },
      { "id": "novoros_s", "name": "B-261 Novorossiysk",      "hull_number": "261", "commissioned": "2014-08-22", "color": "#1F4E78" },
      { "id": "staryy",    "name": "B-262 Stary Oskol",       "hull_number": "262", "commissioned": "2015-07-03", "color": "#27AE60" },
      { "id": "krasnodar", "name": "B-265 Krasnodar",         "hull_number": "265", "commissioned": "2015-11-05", "color": "#2980B9" },
      { "id": "veliky_n",  "name": "B-268 Veliky Novgorod",   "hull_number": "268", "commissioned": "2016-10-26", "color": "#E67E22" },
      { "id": "kolpino",   "name": "B-271 Kolpino",           "hull_number": "271", "commissioned": "2016-11-24", "color": "#D4AC0D" }
    ],
    "loc_to_band": {
      "sevastopol":    "sevastopol",
      "novorossiysk":  "novorossiysk",
      "black_sea":     "novorossiysk",
      "kronstadt":     "baltic",
      "baltiysk":      "baltic",
      "north_sea":     "baltic",
      "admyard":       "baltic",
      "tartus":        "med",
      "med_east":      "med",
      "bosphorus":     "med",
      "gibraltar":     "med",
      "la_manche":     "med",
      "brittany":      "med",
      "ukraine_target":"novorossiysk",
      "vinnytsia":     "novorossiysk",
      "syria_isis":    "med"
    },
    "all_bands": [
      { "key": "sevastopol",   "name": "Sevastopol",          "sub": "4th OSBR · 13th SRZ · Kilen Bay" },
      { "key": "novorossiysk", "name": "Novorossiysk",        "sub": "BSF from 2023 · Temryuk · Black Sea" },
      { "key": "med",          "name": "Mediterranean Sea",   "sub": "Tartus · Gibraltar · Brittany · transit" },
      { "key": "baltic",       "name": "Baltic / Kronstadt",  "sub": "Kronstadt Marine Plant · repair" }
    ],
    "locations": {
      "sevastopol":    { "name": "Sevastopol",                 "lat": 44.6166, "lng": 33.5254, "type": "naval_base" },
      "novorossiysk":  { "name": "Novorossiysk",               "lat": 44.7239, "lng": 37.7693, "type": "naval_base" },
      "kronstadt":     { "name": "Kronstadt",                  "lat": 59.9956, "lng": 29.7672, "type": "naval_base" },
      "tartus":        { "name": "Tartus (Syria)",             "lat": 34.8853, "lng": 35.8869, "type": "naval_base" },
      "bosphorus":     { "name": "Bosphorus",                  "lat": 41.1190, "lng": 29.0697, "type": "strait" },
      "med_east":      { "name": "Mediterranean Sea",          "lat": 34.0000, "lng": 30.0000, "type": "operational_zone" },
      "black_sea":     { "name": "Black Sea",                  "lat": 43.5000, "lng": 34.0000, "type": "operational_zone" },
      "gibraltar":     { "name": "Gibraltar",                  "lat": 36.1408, "lng": -5.3536, "type": "transit_point" },
      "la_manche":     { "name": "English Channel",            "lat": 50.5000,  "lng":  0.3000, "type": "transit_point" },
      "brittany":      { "name": "Brittany (France)",          "lat": 47.9000, "lng": -3.4000, "type": "transit_point" },
      "north_sea":     { "name": "North Sea",                  "lat": 55.0000,  "lng":  3.0000, "type": "operational_zone" },
      "admyard":       { "name": "Admiralty Shipyards (SPb)",  "lat": 59.9268, "lng": 30.2400, "type": "shipyard" },
      "ukraine_target":{ "name": "Targets in Ukraine",         "lat": 49.8397, "lng": 35.0000, "type": "target" },
      "vinnytsia":     { "name": "Vinnytsia",                  "lat": 49.2331, "lng": 28.4682, "type": "target" },
      "syria_isis":    { "name": "Syria (ISIS targets)",       "lat": 35.9500, "lng": 38.0000, "type": "target" }
    },
    "event_types": {
      "position":        "Base segment",
      "transit":         "Transit",
      "strike_outgoing": "Missile launch",
      "strike_incoming": "Strike on the ship",
      "incident":        "Incident",
      "command":         "Command",
      "operation":       "Operation",
      "context":         "Context"
    }
  },

  "positions": [
    // ─── ALROSA (Pr. 877V — the only non-Varshavyanka) ────────────────────────────
    { "id": "p_alr_01", "ship": "alrosa",    "from": "1990-12-30", "to": "2014-07-01", "location": "sevastopol",   "note": "Only BSF submarine 1990–2013; entered refit in 2014" },
    { "id": "p_alr_02", "ship": "alrosa",    "from": "2014-07-01", "to": "2022-06-01", "location": "sevastopol",   "note": "8-year refit and modernisation at 13th SRZ Sevastopol" },
    { "id": "p_alr_03", "ship": "alrosa",    "from": "2022-06-01", "to": "2023-10-01", "location": "sevastopol",   "note": "Return to 4th OSBR — no confirmed Caliber launch" },
    { "id": "p_alr_04", "ship": "alrosa",    "from": "2023-10-01", "to": "2026-06-23", "location": "novorossiysk", "note": "Novorossiysk — with the rest of the brigade; combat readiness uncertain" },

    // ─── ROSTOV-ON-DON (Pr. 636.3) ─────────────────────────────────────────
    { "id": "p_rst_01", "ship": "rostov",    "from": "2014-12-30", "to": "2015-12-01", "location": "novorossiysk", "note": "First ship of the new state order — arrival at Novorossiysk" },
    { "id": "p_rst_02", "ship": "rostov",    "from": "2015-12-01", "to": "2016-02-01", "location": "tartus",       "note": "Mediterranean Squadron — first submerged Caliber launch in Syria, 08.12.2015" },
    { "id": "p_rst_03", "ship": "rostov",    "from": "2016-02-01", "to": "2023-09-13", "location": "novorossiysk", "note": "Home base Novorossiysk; 2022 — launches as part of the 4th Brigade against Ukraine" },
    { "id": "p_rst_04", "ship": "rostov",    "from": "2023-09-13", "to": "2024-06-01", "location": "sevastopol",   "note": "Struck by Storm Shadow in the dry dock of Sevmorzavod, 13.09.2023 — first submarine in the world hit by a cruise missile" },
    { "id": "p_rst_05", "ship": "rostov",    "from": "2024-06-01", "to": "2024-08-02", "location": "sevastopol",   "note": "Transferred to 13th SRZ at Kilen Bay — destroyed 02.08.2024" },

    // ─── NOVOROSSIYSK (Pr. 636.3) ───────────────────────────────────────────
    { "id": "p_nov_01", "ship": "novoros_s", "from": "2014-08-22", "to": "2019-01-01", "location": "novorossiysk", "note": "Lead ship of the series; rotations to Mediterranean and Syrian campaign" },
    { "id": "p_nov_02", "ship": "novoros_s", "from": "2019-01-01", "to": "2021-02-01", "location": "kronstadt",    "note": "Rotation refit at Kronstadt Marine Plant" },
    { "id": "p_nov_03", "ship": "novoros_s", "from": "2021-02-01", "to": "2024-09-01", "location": "kronstadt",    "note": "Extended refit and modernisation (schedule slippage: from 04.2024 postponed to 09.2024)" },
    { "id": "p_nov_04", "ship": "novoros_s", "from": "2024-09-01", "to": "2025-01-04", "location": "tartus",       "note": "Mediterranean — Tartus; after Assad's fall in December — leaves the region" },
    { "id": "p_nov_05", "ship": "novoros_s", "from": "2025-01-04", "to": "2026-06-23", "location": "kronstadt",    "note": "After passing Gibraltar, 04.01.2025 — in the Baltic. Oct 2025: incident surfaced off Brittany" },

    // ─── STARY OSKOL (Pr. 636.3) ────────────────────────────────────────────
    { "id": "p_sto_01", "ship": "staryy",    "from": "2015-07-03", "to": "2019-04-01", "location": "novorossiysk", "note": "Third submarine of the series; 4th OSBR, Novorossiysk" },
    { "id": "p_sto_02", "ship": "staryy",    "from": "2019-04-01", "to": "2020-01-01", "location": "med_east",     "note": "Mediterranean exercises, April 2019 – early 2020" },
    { "id": "p_sto_03", "ship": "staryy",    "from": "2020-01-01", "to": "2026-06-23", "location": "novorossiysk", "note": "Novorossiysk — one of two combat-ready Caliber carriers in the Black Sea as of 2026" },

    // ─── KRASNODAR (Pr. 636.3) ───────────────────────────────────────────────
    { "id": "p_krd_01", "ship": "krasnodar", "from": "2015-11-05", "to": "2017-08-09", "location": "sevastopol",   "note": "Initial home port: Sevastopol, 30th Surface Ship Division" },
    { "id": "p_krd_02", "ship": "krasnodar", "from": "2017-08-09", "to": "2023-10-01", "location": "med_east",     "note": "Almost continuously in the Mediterranean or at Kronstadt — never returned to the Black Sea" },
    { "id": "p_krd_03", "ship": "krasnodar", "from": "2023-10-01", "to": "2026-06-23", "location": "kronstadt",    "note": "Baltic after returning from the Mediterranean; confirmed by Royal Navy in the English Channel, 09.05.2025" },

    // ─── VELIKY NOVGOROD (Pr. 636.3) ────────────────────────────────────────
    { "id": "p_vng_01", "ship": "veliky_n",  "from": "2016-10-26", "to": "2017-08-28", "location": "kronstadt",    "note": "Baltic after commissioning; transit to Mediterranean in August 2017" },
    { "id": "p_vng_02", "ship": "veliky_n",  "from": "2017-08-28", "to": "2019-03-01", "location": "med_east",     "note": "Mediterranean — Syrian campaign (September–October 2017, several launches)" },
    { "id": "p_vng_03", "ship": "veliky_n",  "from": "2019-03-01", "to": "2026-06-23", "location": "novorossiysk", "note": "Novorossiysk — one of two combat-ready Caliber carriers in the Black Sea as of 2026" },

    // ─── KOLPINO (Pr. 636.3) ─────────────────────────────────────────────────
    { "id": "p_klp_01", "ship": "kolpino",   "from": "2016-11-24", "to": "2017-08-28", "location": "kronstadt",    "note": "Baltic after commissioning alongside Veliky Novgorod" },
    { "id": "p_klp_02", "ship": "kolpino",   "from": "2017-08-28", "to": "2019-03-01", "location": "med_east",     "note": "Mediterranean — joint Syrian campaign with Veliky Novgorod" },
    { "id": "p_klp_03", "ship": "kolpino",   "from": "2019-03-01", "to": "2025-12-15", "location": "novorossiysk", "note": "Novorossiysk — 4th OSBR; 2022 — launches as part of the brigade against Ukraine" },
    { "id": "p_klp_04", "ship": "kolpino",   "from": "2025-12-15", "to": "2026-06-23", "location": "novorossiysk", "note": "Probably struck by Sub Sea Baby, 15.12.2025 — de facto knocked out (repair impossible)" }
  ],

  "events": [
    {
      "id": "e_001",
      "type": "context",
      "date": "2014-12-30",
      "ships": ["rostov"],
      "location": "novorossiysk",
      "title": "Rostov-on-Don — first submarine of the new BSF programme",
      "description": "On 30 December 2014 the first Project 636.3 Varshavyanka submarine joined the Black Sea Fleet. Laid down 21.11.2011 at Admiralty Shipyards, launched 26.06.2014. Five more were built alongside it — the entire series for the BSF, 2010–2016. The engines are an all-Russian design, so construction was not halted by the 2014 sanctions.",
      "sources": ["Russian MoD; Admiralty Shipyards"],
      "importance": 4
    },
    {
      "id": "e_002",
      "type": "context",
      "date": "2014-12-01",
      "ships": ["alrosa", "rostov", "novoros_s", "staryy", "krasnodar", "veliky_n", "kolpino"],
      "location": "sevastopol",
      "title": "4th Separate Submarine Brigade BSF — formed 01.12.2014",
      "description": "On 1 December 2014 the 4th OSBR was formed on the basis of the 247th Separate Submarine Division. By the end of 2016 all seven submarines had joined it — the BSF's entire underwater component. The brigade is formally based in South Bay, Sevastopol, but in practice at the Novorossiysk naval base.",
      "sources": ["Russian MoD; open sources"],
      "importance": 3
    },
    {
      "id": "e_003",
      "type": "context",
      "date": "2022-02-24",
      "ships": ["rostov", "staryy", "veliky_n", "kolpino"],
      "location": "black_sea",
      "title": "Full-scale invasion begins — 4 Varshavyankas in the Black Sea",
      "description": "On 24 February 2022, four Pr. 636.3 submarines are in the Black Sea: Rostov-on-Don, Stary Oskol, Veliky Novgorod, Kolpino. Krasnodar and Novorossiysk are outside the Black Sea (Mediterranean / Kronstadt). Alrosa is completing an 8-year refit in Sevastopol. Three days later Turkey will close the Bosphorus.",
      "sources": ["Covert Shores; Ukrainian Naval Forces"],
      "importance": 5
    },
    {
      "id": "e_004",
      "type": "context",
      "date": "2022-02-27",
      "ships": ["novoros_s", "krasnodar", "rostov", "staryy", "veliky_n", "kolpino"],
      "location": "bosphorus",
      "title": "Turkey closes the Bosphorus — Montreux Convention, Art. 19",
      "description": "On 27 February 2022 Turkey applied Art. 19 of the Montreux Convention of 1936, classifying the invasion as a state of war and closing the Bosphorus to warships of the belligerents. Krasnodar and Novorossiysk were left outside the Black Sea. Their repair and maintenance at Kronstadt became possible, but return — impossible.",
      "sources": ["Turkish MFA; Montreux Convention 1936"],
      "importance": 5
    },
    {
      "id": "e_005",
      "type": "strike_outgoing",
      "date": "2015-12-08",
      "ships": ["rostov"],
      "location": "syria_isis",
      "title": "Rostov-on-Don: first submerged Caliber launch in Syria — and in BSF history",
      "description": "On 8 December 2015 Rostov-on-Don fired Caliber-PL missiles from a submerged position in the Mediterranean Sea at ISIS targets in Syria. The first submerged Caliber launch in the Syrian campaign and the first submerged combat launch in Black Sea Fleet history.",
      "sources": ["Russian MoD; TASS"],
      "importance": 5
    },
    {
      "id": "e_006",
      "type": "strike_outgoing",
      "date": "2017-05-31",
      "ships": ["krasnodar"],
      "location": "syria_isis",
      "title": "Krasnodar — first launch against Syria",
      "description": "On 31 May 2017 Krasnodar fired Calibers against Syria for the first time. In total Krasnodar has two publicly confirmed launches: 31.05 and 23.06.2017 — both against Syrian targets.",
      "sources": ["Russian MoD; TASS"],
      "importance": 3
    },
    {
      "id": "e_007",
      "type": "strike_outgoing",
      "date": "2017-06-23",
      "ships": ["krasnodar"],
      "location": "syria_isis",
      "title": "Krasnodar — second and last confirmed launch against Syria",
      "description": "On 23 June 2017 Krasnodar conducted its second and last publicly confirmed Caliber launch. After returning from the Mediterranean the ship almost continuously rotated between the Mediterranean and Kronstadt and never returned to the Black Sea.",
      "sources": ["Russian MoD; TASS"],
      "importance": 3
    },
    {
      "id": "e_008",
      "type": "strike_outgoing",
      "date": "2017-09-14",
      "ships": ["veliky_n", "kolpino"],
      "location": "syria_isis",
      "title": "Veliky Novgorod and Kolpino — joint salvo: 7 Calibers against Deir ez-Zor",
      "description": "On 14 September 2017 Veliky Novgorod and Kolpino jointly fired 7 Calibers from a submerged position at ISIS facilities in Deir ez-Zor province — the first combat launch for both ships. They had arrived in the Mediterranean on 28 August after an inter-fleet transit from the Baltic.",
      "sources": ["Russian MoD; TASS"],
      "importance": 4
    },
    {
      "id": "e_009",
      "type": "strike_outgoing",
      "date": "2017-10-05",
      "ships": ["veliky_n", "kolpino"],
      "location": "syria_isis",
      "title": "Veliky Novgorod and Kolpino — joint salvo: 10 Calibers",
      "description": "On 5 October 2017 both submarines fired another joint salvo — 10 Calibers at the same region. Between these two salvos (14.09 and 05.10) Veliky Novgorod fired independently on 22.09, Kolpino on 03.10. After the autumn campaign both returned to Novorossiysk via the Bosphorus in March 2019.",
      "sources": ["Russian MoD; TASS"],
      "importance": 4
    },
    {
      "id": "e_010",
      "type": "strike_outgoing",
      "date": "2022-04-29",
      "ships": ["rostov", "staryy", "veliky_n", "kolpino"],
      "location": "ukraine_target",
      "title": "4th OSBR: first confirmed launch against Ukraine",
      "description": "29 April 2022 — first officially confirmed launch by the 4th OSBR against Ukraine (video published by Russian MoD). The specific ship was not attributed; four Varshavyankas were in the Black Sea at the time.",
      "sources": ["Russian MoD; Interfax.ru"],
      "importance": 4
    },
    {
      "id": "e_011",
      "type": "strike_outgoing",
      "date": "2022-05-04",
      "ships": ["rostov", "staryy", "veliky_n", "kolpino"],
      "location": "ukraine_target",
      "title": "4th OSBR: second launch against Ukraine",
      "description": "4 May 2022 — second officially confirmed launch by the 4th OSBR against Ukraine. Carrier not attributed.",
      "sources": ["Russian MoD; Interfax.ru"],
      "importance": 3
    },
    {
      "id": "e_012",
      "type": "strike_outgoing",
      "date": "2022-05-23",
      "ships": ["rostov", "staryy", "veliky_n", "kolpino"],
      "location": "ukraine_target",
      "title": "4th OSBR: third launch against Ukraine",
      "description": "23 May 2022 — third confirmed launch by the 4th OSBR. In total, three publicly verified submerged launches against Ukraine from February to May 2022.",
      "sources": ["Russian MoD; Interfax.ru"],
      "importance": 3
    },
    {
      "id": "e_013",
      "type": "strike_outgoing",
      "date": "2022-07-14",
      "ships": ["rostov", "staryy", "veliky_n", "kolpino"],
      "location": "vinnytsia",
      "title": "Vinnytsia strike: contradiction between statements on the carrier (sub vs surface ship)",
      "description": "On 14 July 2022 Calibers struck the centre of Vinnytsia: 27–29 killed, three of them children, over 150 wounded. Air Force spokesman Ihnat immediately named the carrier as \"a submarine in the Black Sea.\" But in 2023 the SBU's official statement of suspicion against BSF commander Osipov stated the strike was launched \"from a surface ship near Cape Fiolent.\" A direct contradiction — the specific carrier has not been definitively established.",
      "sources": ["Yurii Ihnat (Ukrainian Air Force); SBU 2023; President's Office"],
      "importance": 5,
      "verified": false
    },
    {
      "id": "e_014",
      "type": "strike_incoming",
      "date": "2023-09-13",
      "ships": ["rostov"],
      "location": "sevastopol",
      "title": "Rostov-on-Don struck by Storm Shadow — first submarine in history hit by a cruise missile",
      "description": "In the night of 13 September 2023 Storm Shadow caught Rostov-on-Don in the dry dock of Sevmorzavod during a scheduled refit. LSD Minsk was simultaneously damaged. This is the first confirmed case in history of a submarine being hit by a cruise missile. The tandem warhead of Storm Shadow likely penetrated the pressure hull. Russia immediately announced its intention to restore the submarine.",
      "sources": ["GUR MoU; Ukrainian Armed Forces; Militarnyi"],
      "importance": 5
    },
    {
      "id": "e_015",
      "type": "strike_incoming",
      "date": "2024-08-02",
      "ships": ["rostov"],
      "location": "sevastopol",
      "title": "Rostov-on-Don destroyed — first Russian submarine lost in this war",
      "description": "In the night of 2 August 2024 Ukrainian Defence Forces struck the 13th SRZ at Kilen Bay. General Staff of Ukraine: Rostov-on-Don sank — 11 months after the first strike and less than 2 months after being moved to the new yard. Four S-400 Triumf launchers were simultaneously destroyed. Weapon type not officially confirmed (the ATACMS version is disputed by some analysts due to the cluster warhead).",
      "sources": ["General Staff of Ukraine; OSINT sources"],
      "importance": 5
    },
    {
      "id": "e_016",
      "type": "incident",
      "date": "2025-01-04",
      "ships": ["novoros_s"],
      "location": "gibraltar",
      "title": "Novorossiysk passes Gibraltar — last submarine leaves the Mediterranean",
      "description": "On 4 January 2025 the Portuguese Navy recorded Novorossiysk in the Strait of Gibraltar. The last Russian submarine left the Mediterranean. It had arrived there in September 2024 to relieve the Pacific Fleet's Ufa at Tartus. After the fall of the Assad regime in December 2024, the Tartus base became inaccessible.",
      "sources": ["Portuguese Navy; open sources"],
      "importance": 3
    },
    {
      "id": "e_017",
      "type": "incident",
      "date": "2025-05-09",
      "ships": ["krasnodar"],
      "location": "la_manche",
      "title": "Krasnodar in the English Channel — Royal Navy confirms return to Baltic",
      "description": "On 9 May 2025 (Russian Victory Day) the Royal Navy confirmed observing Krasnodar during its return through the English Channel to the Baltic. Krasnodar had left the Mediterranean back in autumn 2023 — from October 2023 to May 2025 it was undergoing refit/maintenance at Kronstadt. The English Channel sighting is the last known public position of Krasnodar.",
      "sources": ["Royal Navy (British MoD)"],
      "importance": 3
    },
    {
      "id": "e_018",
      "type": "incident",
      "date": "2025-10-13",
      "ships": ["novoros_s"],
      "location": "brittany",
      "title": "Novorossiysk surfaced off Brittany — under tow",
      "description": "On 13 October 2025 NATO Maritime Command observed Novorossiysk surfaced off the coast of Brittany — a French frigate came out to monitor. The Netherlands confirmed a tow in the North Sea. Russia denied problems, claiming a \"planned transit.\" The VChK-OGPU Telegram channel: fuel system failure (unverified). NATO Secretary General Rutte: \"looking for the nearest mechanic.\"",
      "sources": ["NATO Maritime Command; Netherlands MoD; Le Figaro; France 24"],
      "importance": 4
    },
    {
      "id": "e_019",
      "type": "strike_incoming",
      "date": "2025-12-15",
      "ships": ["kolpino"],
      "location": "novorossiysk",
      "title": "Sub Sea Baby: first underwater drone strike on a submarine in history — Kolpino",
      "description": "On 15 December 2025 SBU Sub Sea Baby underwater drones (operation by the 13th Main Directorate of the DVKR SBU and the Naval Forces) struck a submarine for the first time in history. Preparation included disabling an Il-38N Sea Dragon at Yeisk air base. The drone penetrated the Novorossiysk naval base barriers and exploded at the stern of the submarine underwater. SBU: \"critical damage.\" Vantor/Maxar satellite imagery of 16.12.2025 recorded a crater at the berth. Defence Express: de facto destruction (repair impossible in the Black Sea). Attribution to Kolpino — OSINT (Duke BG), not officially confirmed. Russia blocked the harbour with barges.",
      "sources": ["SBU; Ukrainian Naval Forces; Defence Express; OSINT Duke BG; Vantor/Maxar (16.12.2025)"],
      "importance": 5
    },
    {
      "id": "e_020",
      "type": "context",
      "date": "2026-06-23",
      "ships": ["staryy", "veliky_n"],
      "location": "novorossiysk",
      "title": "Summary: two operational — and nowhere to repair",
      "description": "As of June 2026: 4th OSBR BSF — Veliky Novgorod and Stary Oskol in Novorossiysk (active). Alrosa — in Novorossiysk, no confirmed launches. Rostov-on-Don — destroyed 02.08.2024. Kolpino — probably knocked out 15.12.2025. Novorossiysk and Krasnodar — in the Baltic with no prospect of return. Repair in the Black Sea is impossible: Sevastopol under strikes, Kronstadt — beyond the Bosphorus.",
      "sources": ["Own analysis; Defence Express; OSINT sources"],
      "importance": 5
    }
  ]
};
