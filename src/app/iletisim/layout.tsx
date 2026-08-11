import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'İletişim & Randevu | Salon XL',
  description: 'Salon XL Güngören adres, telefon ve konum bilgileri. Randevunuzu hemen planlayın.',
  alternates: {
    canonical: 'https://www.salonxl.com.tr/iletisim',
  },
  openGraph: {
    title: 'İletişim & Randevu | Salon XL',
    description: 'Salon XL ile iletişime geçin veya randevunuzu planlayın.',
    url: 'https://www.salonxl.com.tr/iletisim',
    type: 'website',
  },
};

export default function IletisimLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
