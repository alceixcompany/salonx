import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { FiArrowRight, FiCheck } from 'react-icons/fi';
import PageHero from '@/components/PageHero';
import { serviceGroups } from '@/lib/salonData';

const servicesData = Object.fromEntries(serviceGroups.map(service => [service.slug, service]));

interface ServiceDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = servicesData[slug as keyof typeof servicesData];

  if (!service) {
    notFound();
  }

  return (
    <div className="page-flow min-h-screen bg-[var(--lale-emerald-deep)]">
      <PageHero
        eyebrow="Salon XL"
        title={<>{service.title}</>}
        description={service.description}
        image="/salonxl/sombre.jpg"
        imageAlt={`${service.title} hizmeti`}
        align="center"
        heightClassName="min-h-[420px] py-24 sm:min-h-[500px] sm:py-28"
      />

      <section className="lale-dark-section py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
            <div>
              <div className="mb-7 h-px w-28 bg-[linear-gradient(90deg,var(--lale-gold),transparent)]" />
              <h2 className="font-serif text-3xl leading-tight text-[var(--dream-dark)] sm:text-4xl">
                Hizmet kapsamında sunulan uygulamalar
              </h2>
              <p className="mt-5 text-base leading-8 text-[var(--dream-text)]">
                Randevu öncesinde ihtiyacınızı netleştiriyor, size uygun bakım akışını
                birlikte planlıyoruz.
              </p>
              <Link href="/iletisim" className="lale-gold-button mt-8 gap-3">
                Randevu Oluştur
                <FiArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {service.items.map((item) => (
                <div
                  key={item}
                  className="rounded-lg border border-[rgba(199,155,67,0.18)] bg-white/[0.62] p-5 shadow-[0_16px_40px_rgba(31,24,18,0.08)]"
                >
                  <div className="flex items-center gap-3">
                    <FiCheck className="h-5 w-5 shrink-0 text-[var(--lale-gold)]" />
                    <h3 className="text-base font-semibold text-[var(--dream-dark)]">{item}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export function generateStaticParams() {
  return serviceGroups.map(({ slug }) => ({ slug }));
}
