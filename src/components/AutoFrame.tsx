'use client';
import { useEffect, useState } from 'react';

interface AutoFrameProps {
  src: string;
  title?: string;
  fallbackHeight?: number;
}

export function AutoFrame({ src, title, fallbackHeight = 820 }: AutoFrameProps) {
  const [height, setHeight] = useState(fallbackHeight);

  useEffect(() => {
    function handler(e: MessageEvent) {
      if (typeof e.data?.iframeResize === 'number') {
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
