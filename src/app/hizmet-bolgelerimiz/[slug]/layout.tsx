import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { cache } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// SEO: her hizmet bölgesi sayfasına kendi başlığı, açıklaması ve canonical adresi (ALCEIX)
const SITE_URL = 'https://salonxl.com.tr';

export const revalidate = 600;

type Props = {
  children: ReactNode;
  params: Promise<{ slug: string }>;
};

type AreaDoc = {
  name?: string;
  description?: string;
  content?: string;
  imageUrl?: string;
};

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
}

function shorten(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const space = cut.lastIndexOf(' ');
  return (space > 40 ? cut.slice(0, space) : cut).trim() + '…';
}

const findArea = cache(async (slug: string): Promise<AreaDoc | null> => {
  try {
    const snapshot = await getDocs(
      query(collection(db, 'hizmet_bolgeleri'), where('slug', '==', slug), where('isActive', '==', true))
    );
    return snapshot.empty ? null : (snapshot.docs[0].data() as AreaDoc);
  } catch (error) {
    console.error('Hizmet bölgesi SEO verisi okunamadı:', error);
    return null;
  }
});

export async function generateMetadata({ params }: Omit<Props, 'children'>): Promise<Metadata> {
  const { slug } = await params;
  const path = '/hizmet-bolgelerimiz/' + slug;
  const area = await findArea(slug);
  if (!area || !area.name) {
    return { alternates: { canonical: path } };
  }
  const title = area.name + ' | Salon XL';
  const summary = area.description || stripHtml(area.content || '');
  const description = shorten(summary || area.name + ' için Salon XL Güngören kuaför ve güzellik hizmetleri.', 155);
  const image = area.imageUrl && /^https?:\/\//.test(area.imageUrl) ? area.imageUrl : SITE_URL + '/salonxl/logo.png';
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      title,
      description,
      url: SITE_URL + path,
      siteName: 'Salon XL',
      locale: 'tr_TR',
      images: [{ url: image }],
    },
  };
}

export default async function ServiceAreaDetailLayout({ children, params }: Props) {
  const { slug } = await params;
  const area = await findArea(slug);
  const jsonLd = area && area.name
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Hizmet Bölgelerimiz', item: SITE_URL + '/hizmet-bolgelerimiz' },
          { '@type': 'ListItem', position: 3, name: area.name, item: SITE_URL + '/hizmet-bolgelerimiz/' + slug },
        ],
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
      )}
      {children}
    </>
  );
}
