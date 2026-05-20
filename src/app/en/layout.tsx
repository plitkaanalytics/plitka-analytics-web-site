import TopStrip from '@/components/TopStrip';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopStrip />
      <Header />
      {children}
      <Footer locale="en" />
    </>
  );
}
