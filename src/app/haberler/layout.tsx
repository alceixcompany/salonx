import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Haberler & Blog | Salon XL',
  description: 'Saç bakımı, güzellik trendleri ve Salon XL’den güncel içerikler.',
  alternates: {
    canonical: 'https://www.salonxl.com.tr/haberler',
  },
  openGraph: {
    title: 'Haberler & Blog | Salon XL',
    description: 'Saç ve güzellik ipuçları ile Salon XL’den güncel içerikler.',
    url: 'https://www.salonxl.com.tr/haberler',
    type: 'website',
  },
};

export default function HaberlerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
