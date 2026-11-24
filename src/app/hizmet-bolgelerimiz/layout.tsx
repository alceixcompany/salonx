import type { Metadata } from 'next';
import type { ReactNode } from 'react';

// SEO: liste sayfasının kendi başlığı ve canonical adresi (önceden ana sayfaya işaret ediyordu) (ALCEIX)
export const metadata: Metadata = {
  title: 'Hizmet Bölgelerimiz | Salon XL Güngören',
  description: 'Salon XL, Merkez Mah. Gazi Osman Paşa Cd. No:23 Güngören adresinde bayan kuaförü ve güzellik hizmeti verir. Hizmet verdiğimiz bölgeleri inceleyin.',
  alternates: {
    canonical: '/hizmet-bolgelerimiz',
  },
  openGraph: {
    title: 'Hizmet Bölgelerimiz | Salon XL',
    description: "Salon XL'in Güngören merkezli hizmet bölgeleri.",
    url: 'https://salonxl.com.tr/hizmet-bolgelerimiz',
    siteName: 'Salon XL',
    locale: 'tr_TR',
    type: 'website',
  },
};

export default function ServiceAreasLayout({ children }: { children: ReactNode }) {
  return children;
}
