import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hakkımızda | Salon XL',
  description: 'Salon XL’in 24 yılı aşan deneyimini, profesyonel ekibini ve Güngören’de sunduğu saç tasarımı ile güzellik hizmetlerini keşfedin.',
  alternates: {
    canonical: 'https://www.salonxl.com.tr/hakkimizda',
  },
  openGraph: {
    title: 'Hakkımızda | Salon XL',
    description: 'Salon XL’in hikayesini, ekibini ve 24 yılı aşan deneyimini keşfedin.',
    url: 'https://www.salonxl.com.tr/hakkimizda',
    type: 'website',
  },
};

export default function HakkimizdaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
