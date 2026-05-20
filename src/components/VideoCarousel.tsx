'use client';

interface VideoCarouselProps {
  ids: string;
  labels?: string;
  title?: string;
  sublabel?: string;
}

export default function VideoCarousel({
  ids,
  labels,
  title = 'Пуски «Калібрів» — публікації МО РФ',
  sublabel = 'Архів · 2022',
}: VideoCarouselProps) {
  const videoIds = ids.split(',').map((s) => s.trim()).filter(Boolean);
  const labelList = labels ? labels.split(',').map((s) => s.trim()) : [];

  if (videoIds.length === 0) return null;

  return (
    <div className="video-block">
      <div className="video-block__head">
        <div>
          <div className="video-block__label">{sublabel}</div>
          <h4 className="video-block__title">{title}</h4>
        </div>
      </div>
      <div className="video-carousel">
        {videoIds.map((id, i) => (
          <article className="video-card" key={id}>
            <div className="video-card__frame">
              <iframe
                src={`https://www.youtube.com/embed/${id}?rel=0`}
                title={labelList[i] ?? `Відео ${i + 1}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
              />
            </div>
            {labelList[i] && (
              <div className="video-card__body">
                <div className="video-card__title">{labelList[i]}</div>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
