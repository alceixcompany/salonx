import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { cache } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// SEO: her blog yazısına kendi başlığı, açıklaması, canonical adresi ve BlogPosting şeması (ALCEIX)
const SITE_URL = 'https://salonxl.com.tr';

export const revalidate = 600;

type Props = {
  children: ReactNode;
  params: Promise<{ slug: string }>;
};

type NewsDoc = {
  title?: string;
  subtitle?: string;
  description?: string;
  content?: string;
  imageUrl?: string;
  tags?: string[];
  isActive?: boolean;
  createdAt?: unknown;
  updatedAt?: unknown;
};

function createSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
}

function shorten(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const space = cut.lastIndexOf(' ');
  return (space > 40 ? cut.slice(0, space) : cut).trim() + '…';
}

function toIso(value: unknown): string | undefined {
  if (!value) return undefined;
  if (typeof value === 'string') return value;
  if (typeof value === 'object' && value !== null && 'toDate' in value && typeof (value as { toDate: unknown }).toDate === 'function') {
    return (value as { toDate: () => Date }).toDate().toISOString();
  }
  return undefined;
}

const getAllNews = cache(async (): Promise<NewsDoc[]> => {
  try {
    const snapshot = await getDocs(collection(db, 'haberler'));
    return snapshot.docs.map((doc) => doc.data() as NewsDoc);
  } catch (error) {
    console.error('Haber SEO verisi okunamadı:', error);
    return [];
  }
});

async function findNews(slug: string): Promise<NewsDoc | null> {
  const all = await getAllNews();
  return all.find((h) => h.isActive && Boolean(h.title) && createSlug(h.title || '') === slug) ?? null;
}

function imageFor(haber: NewsDoc): string {
  return haber.imageUrl && /^https?:\/\//.test(haber.imageUrl) ? haber.imageUrl : SITE_URL + '/salonxl/logo.png';
}

export async function generateMetadata({ params }: Omit<Props, 'children'>): Promise<Metadata> {
  const { slug } = await params;
  const path = '/haberler/' + slug;
  const haber = await findNews(slug);
  if (!haber || !haber.title) {
    return { alternates: { canonical: path } };
  }
  const title = haber.title.length <= 46 ? haber.title + ' | Salon XL' : haber.title;
  const description = shorten(haber.subtitle || haber.description || stripHtml(haber.content || ''), 155);
  const image = imageFor(haber);
  return {
    title,
    description,
    keywords: haber.tags && haber.tags.length > 0 ? haber.tags.join(', ') : undefined,
    alternates: { canonical: path },
    openGraph: {
      type: 'article',
      title: haber.title,
      description,
      url: SITE_URL + path,
      siteName: 'Salon XL',
      locale: 'tr_TR',
      images: [{ url: image }],
      publishedTime: toIso(haber.createdAt),
      modifiedTime: toIso(haber.updatedAt),
    },
    twitter: {
      card: 'summary_large_image',
      title: haber.title,
      description,
      images: [image],
    },
  };
}

export default async function NewsDetailLayout({ children, params }: Props) {
  const { slug } = await params;
  const haber = await findNews(slug);
  const path = '/haberler/' + slug;
  const jsonLd = haber && haber.title
    ? [
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: SITE_URL + '/haberler' },
            { '@type': 'ListItem', position: 3, name: haber.title, item: SITE_URL + path },
          ],
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: haber.title,
          description: shorten(haber.subtitle || haber.description || stripHtml(haber.content || ''), 300),
          image: imageFor(haber),
          datePublished: toIso(haber.createdAt),
          dateModified: toIso(haber.updatedAt) || toIso(haber.createdAt),
          author: { '@type': 'Organization', name: 'Salon XL', url: SITE_URL },
          publisher: { '@type': 'Organization', name: 'Salon XL', logo: { '@type': 'ImageObject', url: SITE_URL + '/salonxl/logo.png' } },
          mainEntityOfPage: SITE_URL + path,
          inLanguage: 'tr-TR',
        },
      ]
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
