import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Galeri | Salon XL',
  description: 'Salon XL salonundan ve profesyonel uygulamalardan kareleri inceleyin.',
  alternates: {
    canonical: 'https://salonxl.com.tr/galeri',
  },
  openGraph: {
    title: 'Galeri | Salon XL',
    description: 'Salon XL salonundan ve uygulamalarından kareler.',
    url: 'https://salonxl.com.tr/galeri',
    type: 'website',
  },
};

export default function GaleriLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
