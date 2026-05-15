'use client';

import { useEffect, useState } from 'react';
import { makePage } from '@keystatic/next/ui/app';
import config from '../../../../keystatic.config';

const KeystaticApp = makePage(config);

export default function KeystaticPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;
  return <KeystaticApp />;
}
