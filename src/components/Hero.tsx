import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight, FiPhone } from 'react-icons/fi';

const Hero = () => (
  <section className="relative min-h-[790px] overflow-hidden bg-[#111] text-white sm:min-h-[850px]">
    <Image
      src="/salonxl/real/salon-service-wide.webp"
      alt="Salon XL profesyonel saç tasarımı"
      fill
      priority
      className="object-cover object-center"
      sizes="100vw"
    />

    <div className="absolute inset-0 bg-black/55 sm:bg-[linear-gradient(90deg,rgba(8,8,8,.92)_0%,rgba(8,8,8,.75)_34%,rgba(8,8,8,.23)_62%,rgba(8,8,8,.06)_100%)]" />
    <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/65 to-transparent" />

    <div className="relative mx-auto flex min-h-[790px] max-w-7xl items-center px-5 pb-28 pt-36 sm:min-h-[850px] sm:px-8 lg:px-12">
      <div className="max-w-[610px]">
        <div className="mb-7 flex items-center gap-4">
          <span className="h-px w-10 bg-[#ed1c24]" />
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-white/65">
            Güngören · İstanbul
          </p>
        </div>

        <h1 className="font-serif text-[clamp(3.4rem,5.7vw,5.9rem)] font-normal leading-[0.98] tracking-[-0.045em]">
          Saçınıza özel,<br />
          <span className="italic text-[#ed1c24]">size ait</span> bir stil.
        </h1>

        <p className="mt-7 max-w-lg text-base leading-8 text-white/65 sm:text-lg">
          Saç kesimi, ombre, sombre, renklendirme ve bakım uygulamalarında
          24 yılı aşan deneyimle yanınızdayız.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/iletisim"
            className="group inline-flex items-center justify-center gap-4 rounded-full bg-[#ed1c24] px-7 py-4 text-sm font-semibold transition hover:bg-white hover:text-black"
          >
            Randevu Al
            <FiArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href="tel:+905057595559"
            className="inline-flex items-center justify-center gap-3 rounded-full border border-white/25 bg-black/15 px-7 py-4 text-sm font-semibold text-white backdrop-blur-md transition hover:border-white hover:bg-white hover:text-black"
          >
            <FiPhone className="h-4 w-4" /> Hemen Ara
          </a>
        </div>
      </div>
    </div>

    <div className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-black/30 backdrop-blur-md">
      <div className="mx-auto grid max-w-7xl grid-cols-2 px-5 sm:grid-cols-4 sm:px-8 lg:px-12">
        {[
          ['01', 'Saç Tasarımı'],
          ['02', 'Renklendirme'],
          ['03', 'Bakım'],
          ['24+', 'Yıllık Deneyim'],
        ].map(([number, label], index) => (
          <div key={label} className={`flex items-center gap-3 py-5 text-xs ${index > 0 ? 'sm:border-l sm:border-white/10 sm:pl-6' : ''}`}>
            <span className="font-serif text-base text-[#ed1c24]">{number}</span>
            <span className="text-white/55">{label}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Hero;
