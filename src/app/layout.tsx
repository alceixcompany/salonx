import type { Metadata } from "next";
import { DM_Sans, Marcellus, Dancing_Script } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import ReduxProvider from "@/components/ReduxProvider";

const dmSans = DM_Sans({ 
  subsets: ["latin", "latin-ext"],
  variable: '--font-dm-sans',
});

const marcellus = Marcellus({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  variable: '--font-marcellus',
});

const dancingScript = Dancing_Script({
  subsets: ["latin", "latin-ext"],
  variable: '--font-dancing',
});

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'HairSalon',
  name: 'Salon XL',
  url: 'https://www.salonxl.com.tr',
  logo: 'https://www.salonxl.com.tr/salonxl/logo.png',
  image: 'https://www.salonxl.com.tr/salonxl/real/salon-service-wide.webp',
  telephone: ['+90 505 759 55 59', '+90 212 677 67 43'],
  email: 'info@salonxl.com.tr',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Merkez Mah. Gazi Osman Paşa Cd. No:23',
    postalCode: '34164',
    addressLocality: 'Güngören',
    addressRegion: 'İstanbul',
    addressCountry: 'TR',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 41.021921, longitude: 28.8723374 },
  sameAs: ['https://www.instagram.com/salonxlcomtr/'],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.salonxl.com.tr"),
  title: "Salon XL | Güngören Bayan Kuaförü",
  description: "Salon XL Güngören'de saç kesimi, ombre, sombre, mikro kaynak, saç bakımı, cilt bakımı, lazer epilasyon, protez tırnak ve özel gün hizmetleri sunar.",
  keywords: [
    "salon xl",
    "güngören bayan kuaförü",
    "bayan kuaförü",
    "cilt bakımı",
    "ombre",
    "sombre",
    "mikro kaynak",
    "lazer epilasyon",
    "protez tırnak",
    "el ayak bakımı",
    "saç",
    "gelin makyajı",
    "istanbul bayan kuaförü",
    "güngören güzellik merkezi",
    "profesyonel cilt bakımı",
    "premium güzellik merkezi",
    "lazer epilasyon istanbul",
    "bakım merkezi istanbul"
  ].join(", "),
  authors: [{ name: "Salon XL" }],
  creator: "Salon XL",
  publisher: "Salon XL",
  robots: "index, follow",
  alternates: {
    canonical: "https://www.salonxl.com.tr"
  },
  category: "beauty",
  classification: "Business",
  other: {
    "geo.region": "TR-34",
    "geo.placename": "Güngören, İstanbul"
  },
  icons: {
    icon: [
      { url: '/salonxl/icon.png', sizes: '270x270', type: 'image/png' },
    ],
    shortcut: '/salonxl/icon.png',
    apple: [
      { url: '/salonxl/icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/salonxl/icon.png' },
    ],
  },
  openGraph: {
    title: "Salon XL | Güngören Bayan Kuaförü",
    description: "Saç tasarımı, ombre, sombre, mikro kaynak ve güzellik uygulamalarında 24+ yıllık deneyim.",
    type: "website",
    locale: "tr_TR",
    siteName: "Salon XL",
    url: "https://www.salonxl.com.tr",
    images: [
      {
        url: '/salonxl/logo.png',
        width: 3315,
        height: 3315,
        alt: 'Salon XL'
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Salon XL",
    description: "Güngören bayan kuaförü ve profesyonel güzellik hizmetleri.",
    images: ['/salonxl/logo.png']
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${dmSans.variable} ${marcellus.variable} ${dancingScript.variable} font-sans`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <ReduxProvider>
          <RootLayoutContent>{children}</RootLayoutContent>
        </ReduxProvider>
      </body>
    </html>
  );
}

function RootLayoutContent({ children }: { children: React.ReactNode }) {
  // Admin sayfalarında Header, Footer ve FloatingContact gösterme
  // Bu kontrol client-side'da yapılacak
  return (
    <>
      <Header />
      {children}
      <Footer />
      <FloatingContact />
    </>
  );
}
