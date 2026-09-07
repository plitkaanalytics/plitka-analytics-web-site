import type { Lang } from "./ScrollMap";

/**
 * Схема гавані Тартуса до § 01 матеріалу «Сирійський експрес змінює курс».
 *
 * Полотно — карта Вікісховища «Detailkarte der Marinebasis Tartus.svg»
 * (Bin im Garten, CC BY-SA 3.0, за даними OpenStreetMap, 2012). На ній стоять
 * лише цифри, тому поруч іде панель: що означає кожна позначка. Порядок —
 * номерний, як на схемі: читач шукає цифру, а не тему.
 *
 * Підписи зведено з легенди самої карти й статей Вікіпедії про базу —
 * німецької, англійської, російської та української (досьє med-africa,
 * джерела 5, 54–57). Мовні версії читають частину цифр по-різному; розбіжності
 * розписані в `docs/dossiers/med-africa/notes.md` і в текст не виносяться — у
 * панелі стоїть те, що читачеві треба знати про схему.
 *
 * У файл SVG додано лише viewBox: без нього браузер не масштабує карту в
 * <img>. Ні геометрії, ні підписів на полотні ми не змінювали.
 *
 * Клієнтського коду тут немає: полотно прибите до екрана через position:
 * sticky, стилі — у tartus-plan.css поруч зі статтею.
 */

interface ItemText {
  n?: string;
  name: string;
  note?: string;
}

const TEXT: Record<Lang, { alt: string; items: ItemText[]; prov: string }> = {
  uk: {
    alt: "Схема гавані Тартуса: дві рожеві риски з номером 5 біля північного хвилелому позначають російські плавучі причали; пунктирна лінія окреслює територію сирійського флоту з пронумерованими будівлями; праворуч унизу — великі портові басейни",
    items: [
      {
        name: "Межа території сирійського флоту",
        note: "бригада ракетних катерів",
      },
      { n: "1", name: "Ангари й склади", note: "на схемі три ділянки, 1a–1c" },
      { n: "2", name: "Сухий док" },
      { n: "3", name: "«Парк»", note: "автотехніка й озброєння" },
      { n: "4", name: "Плац" },
      {
        n: "5",
        name: "Плавучі причали",
        note: "російські, два по 100 м, тип ПМ-61М",
      },
      { n: "6", name: "Бетонний причал" },
      { n: "7", name: "Швартовий причал на палях" },
      {
        n: "8",
        name: "Цивільні басейни порту",
        note: "їх пʼять, північний — військовий",
      },
      { n: "9", name: "Залізнична колія", note: "вантажі з порту" },
      {
        n: "10",
        name: "Хвилелом",
        note: "вихід у відкрите море на північний захід",
      },
    ],
    prov: "Схема — Bin im Garten / Вікісховище, CC BY-SA 3.0, за даними OpenStreetMap, 2012 рік",
  },
  en: {
    alt: "Plan of Tartus harbour: two pink marks numbered 5 by the northern breakwater are the Russian floating piers; a dashed line encloses the Syrian navy compound with numbered buildings; the large port basins are at bottom right",
    items: [
      {
        name: "Boundary of the Syrian navy compound",
        note: "missile boat brigade",
      },
      {
        n: "1",
        name: "Hangars and warehouses",
        note: "three plots on the plan, 1a–1c",
      },
      { n: "2", name: "Dry dock" },
      { n: "3", name: "The “park”", note: "vehicles and weaponry" },
      { n: "4", name: "Parade ground" },
      {
        n: "5",
        name: "Floating piers",
        note: "Russian, two of 100 m each, PM-61M type",
      },
      { n: "6", name: "Concrete quay" },
      { n: "7", name: "Pile-founded mooring pier" },
      {
        n: "8",
        name: "Civilian port basins",
        note: "five in all; the northern one is military",
      },
      { n: "9", name: "Rail spur", note: "cargo out of the port" },
      {
        n: "10",
        name: "Breakwater",
        note: "exit to the open sea to the north-west",
      },
    ],
    prov: "Plan — Bin im Garten / Wikimedia Commons, CC BY-SA 3.0, from OpenStreetMap data, 2012",
  },
};

function Item({ n, name, note }: ItemText) {
  return (
    <li className="tplan__item">
      {n ? (
        <span className="tplan__n">{n}</span>
      ) : (
        <span className="tplan__swatch" aria-hidden="true" />
      )}
      <p className="tplan__h">
        {name}
        {note ? <span className="tplan__tail"> — {note}</span> : null}
      </p>
    </li>
  );
}

export function TartusPlan({ lang = "uk" }: { lang?: Lang }) {
  const t = TEXT[lang];
  return (
    <figure className="fig tplan">
      <div className="tplan__grid">
        <div className="tplan__canvas">
          <img
            src="/articles/syriyskyi-ekspres/tartus-base-plan.svg"
            alt={t.alt}
          />
        </div>

        <div className="tplan__side">
          <ul className="tplan__items">
            {t.items.map((it) => (
              <Item key={it.n ?? it.name} {...it} />
            ))}
          </ul>

          <p className="tplan__prov">{t.prov}</p>
        </div>
      </div>
    </figure>
  );
}

export default TartusPlan;
