import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PLITKA Analytics — OSINT-аналітика війни в Україні',
  description:
    'Незалежна OSINT-аналітика. Супутникові знімки, AIS, ADS-B, портові реєстри та геолокація.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
