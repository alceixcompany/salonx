import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

const images = [
  { src: '/salonxl/real/salon-service-wide.webp', title: 'Salon XL’de Bir Gün', className: 'sm:col-span-2 sm:row-span-2' },
  { src: '/salonxl/real/color-application.webp', title: 'Profesyonel Renk Uygulaması', className: '' },
  { src: '/salonxl/real/hair-styling.webp', title: 'Saç Şekillendirme', className: '' },
  { src: '/salonxl/real/hair-wash-service.webp', title: 'Saç Bakım Alanı', className: '' },
  { src: '/salonxl/real/styling-stations.webp', title: 'Salon İstasyonlarımız', className: '' },
] as const;

const Gallery = () => (
  <section className="lale-light-section py-16 sm:py-20 lg:py-24">
    <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="text-xs font-bold uppercase tracking-[.22em] text-[#ed1c24]">Galeri</p><h2 className="mt-4 font-serif text-4xl sm:text-5xl">Salonumuzdan kareler.</h2></div>
        <Link href="/galeri" className="inline-flex items-center gap-2 text-sm font-bold text-[#ed1c24]">Tümünü Görüntüle <FiArrowRight /></Link>
      </div>
      <div className="mt-10 grid auto-rows-[220px] gap-4 sm:grid-cols-4">
        {images.map(item => <Link href="/galeri" key={item.src} className={`group relative overflow-hidden rounded-lg ${item.className}`}>
          <Image src={item.src} alt={item.title} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(max-width: 640px) 100vw, 50vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" /><h3 className="absolute bottom-5 left-5 font-serif text-xl text-white">{item.title}</h3>
        </Link>)}
      </div>
    </div>
  </section>
);

export default Gallery;
