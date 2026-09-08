import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getTwinMap } from '@/lib/articles';

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header twins={getTwinMap()} />
      {children}
      <Footer locale="en" />
    </>
  );
}
