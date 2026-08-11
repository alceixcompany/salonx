'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Haber {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  content: string;
  imageUrl: string;
  tags: string[];
  featured: boolean;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

const createSlug = (title: string): string => {
  return title
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
};

const News = () => {
  const [haberler, setHaberler] = useState<Haber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const newsSnapshot = await getDocs(collection(db, 'haberler'));
        const newsData = newsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Haber[];

        const activeNews = newsData.filter((haber) => haber.isActive);
        activeNews.sort((a, b) => (a.order || 0) - (b.order || 0));
        setHaberler(activeNews.slice(0, 3));
      } catch (error) {
        console.error('Haber verisi yüklenirken hata:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="lale-light-section py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[var(--lale-gold)] border-t-transparent" />
          <p className="mt-4 text-sm text-[var(--dream-text)]">İçerikler hazırlanıyor...</p>
        </div>
      </section>
    );
  }

  if (haberler.length === 0) {
    return null;
  }

  const [featuredNews, ...otherNews] = haberler;

  return (
    <section className="lale-light-section py-16 sm:py-20 lg:py-24">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="mb-12 flex flex-col gap-5 border-b border-[rgba(199,155,67,0.18)] pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--lale-gold)]">Blog</p>
            <h2 className="mt-4 max-w-2xl font-serif text-3xl font-normal leading-tight text-[var(--dream-dark)] sm:text-4xl lg:text-5xl">
              Bakım rutininize sakin ve temiz notlar.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-[var(--dream-text)]">
            Salon XL&apos;den güncel öneriler, işlem sonrası bakım notları ve
            güzellik rutinlerinizi kolaylaştıracak kısa içerikler.
          </p>
        </div>

        <Link
          href={`/haberler/${createSlug(featuredNews.title)}`}
          className="group grid gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:items-center"
        >
          <div className="relative min-h-[320px] overflow-hidden rounded-lg bg-[#f4eadb] sm:min-h-[420px]">
            {featuredNews.imageUrl ? (
              <Image
                src={featuredNews.imageUrl}
                alt={featuredNews.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
            ) : (
              <div className="flex h-full min-h-[320px] items-center justify-center font-serif text-6xl text-[var(--lale-gold)] sm:min-h-[420px]">
                01
              </div>
            )}
          </div>

          <article className="lg:pl-6">
            <div className="mb-7 h-px w-28 bg-[linear-gradient(90deg,var(--lale-gold),transparent)]" />
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--lale-gold)]">
              {new Date(featuredNews.createdAt).toLocaleDateString('tr-TR')}
            </p>
            <h3 className="mt-5 font-serif text-3xl font-normal leading-tight text-[var(--dream-dark)] sm:text-4xl">
              {featuredNews.title}
            </h3>
            <p className="mt-5 max-w-xl text-base leading-8 text-[var(--dream-text)]">
              {featuredNews.description}
            </p>
            <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[var(--lale-gold)]">
              Yazıyı Oku
              <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </article>
        </Link>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
          {otherNews.length > 0 && (
            <div className="grid border-y border-[rgba(199,155,67,0.2)] lg:grid-cols-2">
              {otherNews.map((haber, index) => (
                <Link
                  key={haber.id}
                  href={`/haberler/${createSlug(haber.title)}`}
                  className="group grid gap-5 border-b border-[rgba(199,155,67,0.16)] py-7 last:border-b-0 lg:border-b-0 lg:border-r lg:px-7 lg:first:pl-0 lg:last:border-r-0"
                >
                  <span className="text-xs uppercase tracking-[0.16em] text-[var(--lale-gold)]">
                    {String(index + 2).padStart(2, '0')} / {new Date(haber.createdAt).toLocaleDateString('tr-TR')}
                  </span>
                  <h3 className="text-xl font-semibold leading-snug text-[var(--dream-dark)] transition-colors group-hover:text-[var(--lale-gold)]">
                    {haber.title}
                  </h3>
                  <p className="line-clamp-2 text-sm leading-7 text-[var(--dream-text)]">{haber.description}</p>
                </Link>
              ))}
            </div>
          )}

          <div className="lg:pl-6">
            <Link
              href="/haberler"
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(199,155,67,0.34)] bg-white/40 px-6 py-3 text-sm font-semibold text-[var(--dream-dark)] transition-colors hover:border-[var(--lale-gold)] hover:text-[var(--lale-gold)]"
            >
              Tüm İçerikleri Gör
              <FiArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default News;
