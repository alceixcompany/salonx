import React from 'react';
import Link from 'next/link';
import { FiArrowRight, FiCheck } from 'react-icons/fi';
import PageHero from '@/components/PageHero';
import { serviceGroups } from '@/lib/salonData';

const ServicesPage = () => {
  return (
    <main className="page-flow min-h-screen bg-[var(--lale-emerald-deep)]">
      <PageHero
        eyebrow="Salon XL"
        title={<>Hizmet<br />menümüz</>}
        description="Saç tasarımı, bakım, renklendirme, tırnak, cilt bakımı, epilasyon ve özel gün hizmetlerimizi keşfedin."
        image="/salonxl/real/salon-service-wide.webp"
        imageAlt="Salon XL ekibi saç tasarımı uygularken"
      />

      <section className="lale-dark-section py-20 sm:py-24">
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div>
              <div className="mb-7 h-px w-28 bg-[linear-gradient(90deg,var(--lale-gold),transparent)]" />
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--lale-gold)]">
                Uygulamalar
              </p>
              <h2 className="max-w-xl font-serif text-3xl font-normal leading-tight text-[var(--dream-dark)] sm:text-4xl lg:text-5xl">
                Bakım ihtiyaçlarınıza göre düzenlenen kapsamlı hizmet listesi.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-[var(--dream-text)]">
              Her hizmet randevu öncesi kısa ihtiyaç değerlendirmesiyle planlanır.
              Amacımız temiz, konforlu ve size uygun bir bakım deneyimi sunmaktır.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {serviceGroups.map((group, index) => (
              <article
                key={group.slug}
                className="rounded-lg border border-[rgba(199,155,67,0.18)] bg-white/[0.58] p-6 shadow-[0_20px_54px_rgba(31,24,18,0.08)]"
              >
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="font-serif text-2xl text-[var(--lale-gold)]">
                      {String(index + 1).padStart(2, '0')}
                    </p>
                    <h3 className="mt-4 font-serif text-3xl text-[var(--dream-dark)]">{group.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--dream-text)]">{group.description}</p>
                  </div>
                  <Link
                    href={`/hizmetlerimiz/${group.slug}`}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[rgba(199,155,67,0.24)] text-[var(--lale-gold)] transition-transform hover:rotate-45"
                    aria-label={`${group.title} detayları`}
                  >
                    <FiArrowRight className="h-5 w-5" />
                  </Link>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {group.items.map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm text-[var(--dream-dark)]">
                      <FiCheck className="h-4 w-4 shrink-0 text-[var(--lale-gold)]" />
                      {item}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/iletisim" className="lale-gold-button gap-3">
              Randevu Oluştur
              <FiArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServicesPage;
