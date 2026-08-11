'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowRight, FiInstagram } from 'react-icons/fi';
import PageHero from '@/components/PageHero';

const gallery = [
  { src: '/salonxl/gallery-generated/salon-interior-v1.webp', title: 'Salon XL Atmosferi', category: 'Salon' },
  { src: '/salonxl/gallery-generated/balayage-v1.webp', title: 'Karamel Balayage', category: 'Saç Tasarımı' },
  { src: '/salonxl/gallery-generated/ombre-v1.webp', title: 'Soğuk Bej Ombre', category: 'Saç Tasarımı' },
  { src: '/salonxl/gallery-generated/bridal-updo-v1.webp', title: 'Özel Gün Saç Tasarımı', category: 'Gelin / Nişan' },
  { src: '/salonxl/gallery-generated/skincare-v1.webp', title: 'Profesyonel Cilt Bakımı', category: 'Güzellik' },
  { src: '/salonxl/gallery-generated/nails-v1.webp', title: 'Kalıcı Oje & Manikür', category: 'Tırnak' },
] as const;

export default function GalleryPage() {
  return (
    <main className="page-flow min-h-screen">
      <PageHero eyebrow="Salon XL" title={<>Galeri</>} description="Salonumuzdan, saç tasarımlarımızdan ve profesyonel uygulamalarımızdan seçilmiş kareler." image="/salonxl/gallery-generated/salon-interior-v1.webp" imageAlt="Salon XL galeri" />
      <section className="lale-light-section py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((item, index) => (
              <motion.article key={item.src} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: Math.min(index * .05, .25) }} className={`group relative overflow-hidden rounded-xl bg-black ${index === 0 ? 'sm:col-span-2 lg:row-span-2' : ''}`}>
                <div className={index === 0 ? 'relative min-h-[440px] lg:min-h-full' : 'relative min-h-[300px]'}><Image src={item.src} alt={item.title} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 40vw" /></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 p-6 text-white"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#ed1c24]">{item.category}</p><h2 className="mt-2 font-serif text-2xl">{item.title}</h2></div>
              </motion.article>
            ))}
          </div>
          <div className="mt-16 rounded-2xl bg-[#0a0a0a] px-7 py-12 text-center text-white sm:px-12">
            <FiInstagram className="mx-auto h-8 w-8 text-[#ed1c24]" /><h2 className="mt-5 font-serif text-3xl sm:text-4xl">Güncel çalışmalarımızı takip edin.</h2>
            <a href="https://www.instagram.com/salonxlcomtr/" target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#ed1c24] px-7 py-4 text-sm font-bold">@salonxlcomtr <FiArrowRight /></a>
          </div>
          <div className="mt-10 text-center"><Link href="/hizmetlerimiz" className="inline-flex items-center gap-2 text-sm font-bold text-[#ed1c24]">Hizmetleri İnceleyin <FiArrowRight /></Link></div>
        </div>
      </section>
    </main>
  );
}
