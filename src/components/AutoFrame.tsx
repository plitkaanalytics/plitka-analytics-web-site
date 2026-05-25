'use client';
import { useEffect, useState } from 'react';

interface AutoFrameProps {
  src: string;
  title?: string;
  fallbackHeight?: number;
  mobileFallbackHeight?: number;
}

export function AutoFrame({ src, title, fallbackHeight = 820, mobileFallbackHeight }: AutoFrameProps) {
  const [height, setHeight] = useState(() => {
    if (typeof window === 'undefined') return fallbackHeight;
    if (mobileFallbackHeight && window.innerWidth < 768) return mobileFallbackHeight;
    return fallbackHeight;
  });

  useEffect(() => {
    function handler(e: MessageEvent) {
      if (typeof e.data?.iframeResize === 'number' && e.data.iframeResize > 400) {
        setHeight(e.data.iframeResize);
      }
    }
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  return (
    <iframe
      src={src}
      title={title}
      style={{
        width: '100%',
        height: `${height}px`,
        display: 'block',
        border: 'none',
        overflow: 'hidden',
        transition: 'height 0.2s ease',
      }}
      scrolling="no"
    />
  );
}
