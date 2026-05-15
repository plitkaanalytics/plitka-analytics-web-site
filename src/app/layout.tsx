import type { Metadata } from 'next';
import './globals.css';
import TopStrip from '@/components/TopStrip';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'PLITKA Analytics — OSINT-аналітика війни в Україні',
  description:
    'Незалежна OSINT-аналітика. Супутникові знімки, AIS, ADS-B, портові реєстри та геолокація.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <body>
        <TopStrip />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
