import Image from 'next/image';
import Link from 'next/link';
import { FiArrowUpRight, FiCheckCircle } from 'react-icons/fi';

const serviceGroups = [
  { title: 'Saç Kesimi & Tasarım', items: ['Saç Kesimi', 'Tesettür Saç Kesimi', 'Casper Saç Kesim'], image: '/salonxl/real/hair-styling.webp' },
  { title: 'Saç Tasarım', items: ['Ombre', 'Sombre', 'Röfle', 'Topuz', 'Maşa', 'Balyaj', 'Mikro Kaynak'], image: '/salonxl/real/color-application.webp' },
  { title: 'Saç Bakımı & Renk', items: ['Keratin Bakım', 'Saç Cila', 'Dip Boya', 'Komple Boya', 'Renk Değişimi'], image: '/salonxl/real/hair-wash-service.webp' },
  { title: 'El, Ayak & Tırnak', items: ['Pedikür', 'Spa Pedikür', 'Medikal Manikür', 'Protez Tırnak', 'Jel Tırnak', 'Kalıcı Oje'], image: '/salonxl/real/beauty-treatment-station.webp' },
  { title: 'Cilt & Epilasyon', items: ['Cilt Bakımı', 'Leke Bakımı', 'Anti Aging', 'Lazer Epilasyon', 'Buz Lazer', 'IPL Lazer'], image: '/salonxl/real/skincare-corridor.webp' },
  { title: 'Makyaj & Özel Gün', items: ['Gelin Makyajı', 'Gelin Başı', 'Tesettür Gelin Başı', 'Nişan Başı'], image: '/salonxl/real/styling-stations.webp' },
] as const;

const Services = () => (
  <section id="hizmetler" className="lale-light-section py-16 sm:py-20 lg:py-24">
    <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
      <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
        <div><p className="mb-4 text-xs font-bold uppercase tracking-[.22em] text-[var(--lale-gold)]">Uzmanlık Alanlarımız</p><h2 className="font-serif text-4xl leading-tight text-[var(--dream-dark)] sm:text-5xl">Tarzınızı tamamlayan kapsamlı hizmetler.</h2></div>
        <p className="text-base leading-8 text-[var(--dream-text)]">Saç kesimi ve renklendirmeden cilt bakımına, lazer epilasyondan tırnak ve özel gün hazırlığına kadar ihtiyacınız olan tüm uygulamalar Salon XL&apos;de.</p>
      </div>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {serviceGroups.map((group, index) => (
          <Link key={group.title} href="/hizmetlerimiz" className="group relative min-h-[390px] overflow-hidden rounded-lg bg-black shadow-xl">
            <Image src={group.image} alt={group.title} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(max-width: 640px) 100vw, 33vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
              <p className="text-xs text-[#ed1c24]">{String(index + 1).padStart(2, '0')}</p><h3 className="mt-2 font-serif text-2xl">{group.title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/65">{group.items.join(' · ')}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#ed1c24]">Detayları Gör <FiArrowUpRight /></span>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap gap-6 border-y border-black/10 py-6">
        {['24+ yıllık deneyim','Profesyonel ürünler','Kişiye özel tasarım'].map(item => <span key={item} className="flex items-center gap-2 text-sm"><FiCheckCircle className="text-[#ed1c24]" />{item}</span>)}
      </div>
    </div>
  </section>
);

export default Services;
