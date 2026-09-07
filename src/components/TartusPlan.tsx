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

function Item({ n, name, note }: { n?: string; name: string; note?: string }) {
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

export function TartusPlan() {
  return (
    <figure className="fig tplan">
      <div className="tplan__grid">
        <div className="tplan__canvas">
          <img
            src="/articles/syriyskyi-ekspres/tartus-base-plan.svg"
            alt="Схема гавані Тартуса: дві рожеві риски з номером 5 біля північного хвилелому позначають російські плавучі причали; пунктирна лінія окреслює територію сирійського флоту з пронумерованими будівлями; праворуч унизу — великі портові басейни"
          />
        </div>

        <div className="tplan__side">
          <ul className="tplan__items">
            <Item
              name="Межа території сирійського флоту"
              note="бригада ракетних катерів"
            />
            <Item
              n="1"
              name="Ангари й склади"
              note="на схемі три ділянки, 1a–1c"
            />
            <Item n="2" name="Сухий док" />
            <Item n="3" name="«Парк»" note="автотехніка й озброєння" />
            <Item n="4" name="Плац" />
            <Item
              n="5"
              name="Плавучі причали"
              note="російські, два по 100 м, тип ПМ-61М"
            />
            <Item n="6" name="Бетонний причал" />
            <Item n="7" name="Швартовий причал на палях" />
            <Item
              n="8"
              name="Цивільні басейни порту"
              note="їх пʼять, північний — військовий"
            />
            <Item n="9" name="Залізнична колія" note="вантажі з порту" />
            <Item
              n="10"
              name="Хвилелом"
              note="вихід у відкрите море на північний захід"
            />
          </ul>

          <p className="tplan__prov">
            Схема — Bin im Garten / Вікісховище, CC BY-SA 3.0, за даними
            OpenStreetMap, 2012 рік
          </p>
        </div>
      </div>
    </figure>
  );
}

export default TartusPlan;
