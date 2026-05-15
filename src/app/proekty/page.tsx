export const metadata = { title: 'Проєкти — PLITKA Analytics' };

export default function ProektyPage() {
  return (
    <>
      <div className="substrip">
        <div className="substrip__inner">
          <div><strong>Проєкти</strong> · Активні напрямки</div>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <div className="section__head">
            <h2 className="section__title">Активні проєкти</h2>
          </div>
          <div className="projects-strip" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {[
              { code: 'P-01 · РАКЕТИ', title: 'Ракетна загроза ЧФ', dek: 'Моніторинг носіїв «Калібр» і «Онікс» у Чорноморському флоті та Каспійській флотилії.', count: '68 матеріалів', cls: 'ptile--accent' },
              { code: 'P-02 · ФРЕГАТИ', title: 'Переміщення кораблів', dek: 'Щоденне відстеження позицій усіх ракетоносців ЧФ за AIS та супутниковими даними.', count: '142 матеріали', cls: '' },
              { code: 'P-03 · ПОРТИ', title: 'Супутникові знімки баз', dek: 'Аналіз інфраструктури Севастополя, Новоросійська, Феодосії та Махачкали.', count: '94 матеріали', cls: 'ptile--blue' },
              { code: 'P-04 · ДРОНИ', title: 'Ударні БпЛА', dek: 'Геолокація уламків, аналіз маршрутів і серійних номерів Shahed та інших безпілотників.', count: '53 матеріали', cls: '' },
              { code: 'P-05 · АВІАЦІЯ', title: 'Тактична авіація РФ', dek: 'ADS-B моніторинг бойової авіації РФ, патерни вильотів, пункти базування.', count: '31 матеріал', cls: '' },
              { code: 'P-06 · КАСПІЙ', title: 'Тіньовий флот Каспію', dek: 'Маршрути постачання іранських компонентів для Shahed через Каспійське море.', count: '12 матеріалів', cls: 'ptile--accent' },
            ].map(({ code, title, dek, count, cls }) => (
              <div key={code} className={`ptile ${cls}`}>
                <span className="ptile__code">{code}</span>
                <div className="ptile__title">{title}</div>
                <p style={{ fontSize: '14px', color: 'var(--slate)', margin: 0, lineHeight: 1.5 }}>{dek}</p>
                <span className="ptile__count">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
