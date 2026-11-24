import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hizmetlerimiz | Salon XL',
  description: 'Salon XL saç kesimi, ombre, sombre, röfle, mikro kaynak, saç bakımı, cilt bakımı, epilasyon, tırnak ve özel gün hizmetlerini inceleyin.',
  alternates: {
    canonical: 'https://salonxl.com.tr/hizmetlerimiz',
  },
  openGraph: {
    title: 'Hizmetlerimiz | Salon XL',
    description: 'Salon XL saç tasarımı, güzellik ve kişisel bakım hizmetleri.',
    url: 'https://salonxl.com.tr/hizmetlerimiz',
    type: 'website',
  },
};

export default function HizmetlerimizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
