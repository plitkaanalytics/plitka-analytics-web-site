const DATA = {
  "meta": {
    "title": "Karakurt MRK Project 22800 — chronicle 2017–2026",
    "version": "1.1",
    "ships": [
      { "id": "mytishchi",   "name": "Mytishchi (ex-Uragan)", "hull_number": "577", "commissioned": "2018-12-17", "color": "#1F4E78" },
      { "id": "sovetsk",    "name": "Sovetsk",                "hull_number": "567", "commissioned": "2019-10-08", "color": "#2980B9" },
      { "id": "odintsovo",  "name": "Odintsovo",              "hull_number": "584", "commissioned": "2020-11-14", "color": "#85C1E9" },
      { "id": "burya",      "name": "Burya",                  "hull_number": "578", "commissioned": "2026-05-08", "color": "#48A9A6" },
      { "id": "tsyklon",    "name": "Tsyklon",                "hull_number": "567", "commissioned": "2023-07-12", "color": "#C8102E" },
      { "id": "askold",     "name": "Askold",                 "hull_number": "633", "commissioned": null,         "color": "#E74C3C" },
      { "id": "amur",       "name": "Amur",                   "hull_number": "646", "commissioned": "2024-08-26", "color": "#E67E22" },
      { "id": "tucha",      "name": "Tucha",                  "hull_number": "400", "commissioned": "2024-12-21", "color": "#F39C12" },
      { "id": "tajfun",     "name": "Tayfun",                 "hull_number": "401", "commissioned": "2025-08-28", "color": "#D4AC0D" },
      { "id": "rzhev",      "name": "Rzhev",                  "hull_number": null,  "commissioned": null,         "color": "#7F8C8D" },
      { "id": "udomlya",    "name": "Udomlya",                "hull_number": null,  "commissioned": null,         "color": "#95A5A6" }
    ],
    "locations": {
      "pella":          { "name": "Pella (Otradnoye)",         "lat": 59.7740, "lng": 32.3890, "type": "shipyard" },
      "zaliv_kerch":    { "name": "Zaliv yard, Kerch",         "lat": 45.3580, "lng": 36.4750, "type": "naval_base" },
      "zelenodolsk":    { "name": "Zelenodolsk (yard)",        "lat": 55.8422, "lng": 48.5101, "type": "shipyard" },
      "amur_sz":        { "name": "Amur Shipbuilding Plant",   "lat": 50.5490, "lng": 137.010, "type": "shipyard" },
      "baltiysk":       { "name": "Baltiysk",                  "lat": 54.6463, "lng": 19.9069, "type": "naval_base" },
      "kronstadt":      { "name": "Kronstadt",                 "lat": 59.9956, "lng": 29.7672, "type": "naval_base" },
      "primorsk":       { "name": "Primorsk (Baltic)",         "lat": 60.3623, "lng": 28.6100, "type": "naval_base" },
      "sevastopol":     { "name": "Sevastopol",                "lat": 44.6166, "lng": 33.5254, "type": "naval_base" },
      "novorossiysk":   { "name": "Novorossiysk",              "lat": 44.7239, "lng": 37.7693, "type": "naval_base" },
      "kaspiysk":       { "name": "Kaspiysk",                  "lat": 42.8867, "lng": 47.6383, "type": "naval_base" },
      "caspian_sea":    { "name": "Caspian Sea",               "lat": 42.5000, "lng": 49.5000, "type": "operational_zone" },
      "black_sea":      { "name": "Black Sea",                 "lat": 43.5000, "lng": 34.0000, "type": "operational_zone" },
      "baltic_sea":     { "name": "Baltic Sea",                "lat": 56.0000, "lng": 19.0000, "type": "operational_zone" },
      "ukraine_target": { "name": "Targets in Ukraine",        "lat": 49.8397, "lng": 35.0000, "type": "target" },
      "kyiv":           { "name": "Kyiv",                      "lat": 50.4501, "lng": 30.5234, "type": "target" }
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
    // ──────────────── BALTIC FLEET (Pella → Baltiysk) ───────────
    { "id": "p_myt_01", "ship": "mytishchi",  "from": "2018-12-17", "to": "2026-06-08", "location": "baltiysk",   "note": "36th Missile Boat Brigade BF — lead ship of the series" },
    { "id": "p_sov_01", "ship": "sovetsk",    "from": "2019-10-08", "to": "2026-06-08", "location": "baltiysk",   "note": "36th Missile Boat Brigade BF" },
    { "id": "p_odt_01", "ship": "odintsovo",  "from": "2020-11-14", "to": "2026-06-08", "location": "baltiysk",   "note": "36th Brigade BF — first Karakurt with Pantsir-M" },
    { "id": "p_bur_01", "ship": "burya",      "from": "2022-01-01", "to": "2026-05-08", "location": "pella",      "note": "Construction and factory trials at Pella" },
    { "id": "p_bur_02", "ship": "burya",      "from": "2026-05-08", "to": "2026-06-08", "location": "baltiysk",   "note": "Commissioned into the 36th Brigade BF on 8 May 2026" },

    // ──────────────── BLACK SEA FLEET (Zaliv, Kerch) ────────────────
    { "id": "p_cyk_01", "ship": "tsyklon",    "from": "2022-01-01", "to": "2023-07-12", "location": "zaliv_kerch","note": "Completion and sea trials at Zaliv" },
    { "id": "p_cyk_02", "ship": "tsyklon",    "from": "2023-07-12", "to": "2024-05-20", "location": "sevastopol", "note": "41st Brigade BSF — the only commissioned Karakurt in the Black Sea" },

    { "id": "p_ask_01", "ship": "askold",     "from": "2022-01-01", "to": "2023-11-05", "location": "zaliv_kerch","note": "Completion at Zaliv; not commissioned before the strike" },
    { "id": "p_ask_02", "ship": "askold",     "from": "2023-11-05", "to": "2026-06-08", "location": "zaliv_kerch","note": "Repair after strike of 04.11.2023; restoration timeline unknown" },

    { "id": "p_amr_01", "ship": "amur",       "from": "2022-12-26", "to": "2024-04-01", "location": "zaliv_kerch","note": "Construction and sea trials; transferred to Caspian before commissioning" },
    { "id": "p_amr_02", "ship": "amur",       "from": "2024-04-01", "to": "2025-10-26", "location": "kaspiysk",   "note": "Transferred to Caspian after strikes on Askold and Tsyklon; commissioned 26.08.2024" },
    { "id": "p_amr_03", "ship": "amur",       "from": "2025-10-26", "to": "2026-05-04", "location": "primorsk",   "note": "Transfer to Baltic — spotted at Kronstadt 26.10.2025; Primorsk" },

    // ──────────────── CASPIAN (Zelenodolsk → Kaspiysk) ─────────────
    { "id": "p_tch_01", "ship": "tucha",      "from": "2022-01-01", "to": "2024-12-21", "location": "zelenodolsk","note": "Zelenodolsk yard — construction and trials" },
    { "id": "p_tch_02", "ship": "tucha",      "from": "2024-12-21", "to": "2026-06-08", "location": "kaspiysk",   "note": "Commissioned into the fleet on the Caspian, 21.12.2024" },

    { "id": "p_tjf_01", "ship": "tajfun",     "from": "2022-01-01", "to": "2025-08-28", "location": "zelenodolsk","note": "Zelenodolsk yard — construction and trials" },
    { "id": "p_tjf_02", "ship": "tajfun",     "from": "2025-08-28", "to": "2026-06-08", "location": "kaspiysk",   "note": "Commissioned into the fleet on the Caspian, 28.08.2025" },

    // ──────────────── PACIFIC FLEET (Amur SY) ─────────────
    { "id": "p_rzh_01", "ship": "rzhev",      "from": "2023-09-27", "to": "2026-06-08", "location": "amur_sz",    "note": "Amur SY — launched 27.09.2023; factory and state trials" },
    { "id": "p_udm_01", "ship": "udomlya",    "from": "2023-09-27", "to": "2026-06-08", "location": "amur_sz",    "note": "Amur SY — launched simultaneously with Rzhev; still fitting out" }
  ],

  "events": [
    {
      "id": "e_001",
      "type": "context",
      "date": "2022-02-24",
      "ships": ["mytishchi", "sovetsk", "odintsovo"],
      "location": "baltiysk",
      "title": "Full-scale invasion begins — Karakurts not yet ready in the south",
      "description": "On 24 February 2022, not a single Karakurt has been commissioned in the Black Sea Fleet. Tsyklon, Askold, and Amur are under construction at Zaliv in occupied Kerch. Tucha and Tayfun are at the Zelenodolsk yard. The Baltic trio (Mytishchi, Sovetsk, Odintsovo) is in service, but far from the theatre. Thus in the first year of the invasion, Series 22800 is essentially absent from the Black Sea.",
      "sources": ["Ukrainian Naval Forces; VPK.name"],
      "importance": 4
    },
    {
      "id": "e_002",
      "type": "command",
      "date": "2023-07-12",
      "ships": ["tsyklon"],
      "location": "sevastopol",
      "title": "Tsyklon commissioned into BSF — the first and only combat Karakurt in the Black Sea",
      "description": "On 12 July 2023 Tsyklon (yard no. 801) was accepted into the Black Sea Fleet. The only fully commissioned Karakurt in the southern theatre. Per Ukrainian Naval Forces statements (Pletenchuk), the ship did not complete state trials and carried out no missile launches. Shoigu stated in April 2024 that \"Tsyklon is successfully carrying out assigned tasks\" — with no specifics on launches.",
      "sources": ["Russian MoD; Ukrainian Naval Forces (Pletenchuk)"],
      "importance": 4
    },
    {
      "id": "e_003",
      "type": "strike_incoming",
      "date": "2023-11-04",
      "ships": ["askold"],
      "location": "zaliv_kerch",
      "title": "Strike on Askold at the Zaliv slipway in Kerch (SCALP-EG)",
      "description": "On 4 November 2023 the Ukrainian Air Force struck the Zaliv shipbuilding plant in occupied Kerch. At least three SCALP-EG missiles hit Askold. UK MoD: the strike occurred \"further east than most previously claimed long-range strikes.\" The ship suffered heavy damage but did not sink — with no combat load aboard there was nothing to detonate. As of 2026 — under restoration repair at Zaliv.",
      "sources": ["Ukrainian Armed Forces; UK MoD; Oleshchuk; Russian MoD (partial acknowledgement)"],
      "importance": 5
    },
    {
      "id": "e_004",
      "type": "strike_incoming",
      "date": "2024-05-19",
      "ships": ["tsyklon"],
      "location": "sevastopol",
      "title": "Tsyklon sunk by ATACMS — first warship in the world destroyed by this type of missile",
      "description": "In the night of 19 May 2024 a combined strike (ATACMS + drones) hit Sevastopol Bay. UK intelligence: the attack \"almost certainly\" resulted in the sinking of Tsyklon. General Staff of Ukraine confirmed on 21 May. Reports of 6 killed and 11 wounded (not independently verified). Pletenchuk: \"with the loss of Tsyklon, Russia has lost the last Caliber carrier capable of striking Ukraine from the Crimean side.\" First warship in the world sunk by ATACMS.",
      "sources": ["General Staff of Ukraine; UK MoD; Ukrainian Naval Forces (Pletenchuk)"],
      "importance": 5
    },
    {
      "id": "e_005",
      "type": "transit",
      "date": "2024-04-01",
      "ships": ["amur"],
      "location": "kaspiysk",
      "title": "Amur transferred to Caspian — flight strategy after strikes on the series",
      "description": "After Tsyklon's destruction (May 2024) and the Askold strike (November 2023), Russia does not risk keeping Amur in the Black Sea region. In April 2024 the ship was transferred from Novorossiysk via the Volga-Don Canal to the Caspian — to complete sea trials out of strike range. On 26 August 2024 — formal commissioning into the fleet, already on the Caspian.",
      "sources": ["Defence Express; MT Anderson on X; Ukrainian Naval Forces"],
      "importance": 4
    },
    {
      "id": "e_006",
      "type": "transit",
      "date": "2025-10-26",
      "ships": ["amur"],
      "location": "primorsk",
      "title": "Amur goes to the Baltic — Kronstadt finale for the Black Sea fugitive",
      "description": "On 26 October 2025 Amur was spotted at Kronstadt — part of the Baltic Fleet. The ship built for the Black Sea Fleet at Kerch never fought a single day in \"its\" sea: Kerch → Caspian → Baltic. Based at Primorsk — less than 15 km from the Finnish border.",
      "sources": ["MT Anderson on X; OSINT sources"],
      "importance": 3
    },
    {
      "id": "e_007",
      "type": "strike_incoming",
      "date": "2026-05-03",
      "ships": ["amur"],
      "location": "primorsk",
      "title": "Amur struck at Primorsk in the Baltic",
      "description": "On 3 May 2026 Ukrainian Defence Forces struck Amur in Primorsk (Leningrad Oblast). General Staff of Ukraine: the ship is a Caliber carrier. Damage extent not publicly verified. Per GS wording — \"the first of two Caliber carriers struck within a week.\" Four days later a Karakurt would be struck in the Caspian too.",
      "sources": ["General Staff of Ukraine, 03.05.2026"],
      "importance": 5
    },
    {
      "id": "e_008",
      "type": "strike_incoming",
      "date": "2026-05-07",
      "ships": ["tucha", "tajfun"],
      "location": "kaspiysk",
      "title": "Karakurt struck at Kaspiysk — the hiding place did not hold",
      "description": "In the night of 7 May 2026 Ukrainian Defence Forces struck a Pr. 22800 MRK at Kaspiysk. General Staff of Ukraine: the ship is a Caliber carrier. The specific ship — Tucha or Tayfun — was not publicly identified. Pletenchuk: likely the same ship that had fled from the Azov-Black Sea region. Distance ~930 km straight-line from Crimea, 1,000–1,500 km from Ukrainian-controlled territory. Weapon: probably Liutyi strike drone or FP-1.",
      "sources": ["General Staff of Ukraine, 07.05.2026; Ukrainian Naval Forces (Pletenchuk)"],
      "importance": 5
    },
    {
      "id": "e_009",
      "type": "command",
      "date": "2026-05-08",
      "ships": ["burya"],
      "location": "baltiysk",
      "title": "Burya commissioned into BF — fourth Baltic Karakurt",
      "description": "On 8 May 2026 MRK Burya (yard no. 257) was accepted into the Baltic Fleet. The fourth and currently last Pella-built Karakurt in service. Commissioned on Victory Day — traditional Russian symbolism.",
      "sources": ["Russian MoD; Baltic Fleet press service"],
      "importance": 3
    }
  ]
};
