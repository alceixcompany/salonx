import React from 'react';
import Link from 'next/link';
import { FiArrowUpRight, FiInstagram, FiMapPin, FiPhone } from 'react-icons/fi';

const contacts = [
  {
    label: 'Telefon',
    value: '+90 505 759 55 59',
    href: 'tel:+905057595559',
    icon: FiPhone,
  },
  {
    label: 'Instagram',
    value: '@salonxlcomtr',
    href: 'https://www.instagram.com/salonxlcomtr/',
    icon: FiInstagram,
  },
  {
    label: 'Adres',
    value: 'Merkez Mah. Gazi Osman Paşa Cd. No:23, Güngören / İstanbul',
    href: '/iletisim',
    icon: FiMapPin,
  },
] as const;

const Contact = () => {
  return (
    <section id="iletisim" className="lale-light-section py-16 sm:py-20 lg:py-24">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="border-y border-[rgba(199,155,67,0.2)] py-10 sm:py-12 lg:py-14">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--lale-gold)]">İletişim</p>
              <h2 className="mt-4 max-w-2xl font-serif text-3xl font-normal leading-tight text-[var(--dream-dark)] sm:text-4xl lg:text-5xl">
                Size uygun randevuyu sakin sakin planlayalım.
              </h2>
            </div>

            <div>
              <p className="max-w-2xl text-base leading-8 text-[var(--dream-text)]">
                İşlem seçimi, uygun saat ve merkezimize ulaşım için bizi arayabilir,
                Instagram üzerinden yazabilir ya da iletişim formunu doldurabilirsiniz.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="tel:+905057595559" className="lale-gold-button gap-3">
                  Hemen Ara
                  <FiPhone className="h-4 w-4" />
                </a>
                <Link
                  href="/iletisim"
                  className="inline-flex items-center justify-center rounded-full border border-[rgba(31,24,18,0.16)] bg-white/36 px-6 py-3 text-sm font-medium text-[var(--dream-dark)] transition-colors hover:border-[var(--lale-gold)] hover:text-[var(--lale-gold)]"
                >
                  Formu Doldur
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-10 divide-y divide-[rgba(199,155,67,0.18)] border-t border-[rgba(199,155,67,0.18)] lg:mt-12">
            {contacts.map((item) => {
              const Icon = item.icon;
              const isExternal = item.href.startsWith('http');

              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className="group grid gap-5 py-6 sm:grid-cols-[72px_0.42fr_1fr_auto] sm:items-center"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#fbf2e3] text-[var(--lale-gold)]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--lale-gold)]">
                    {item.label}
                  </span>
                  <span className="text-lg font-semibold leading-8 text-[var(--dream-dark)]">
                    {item.value}
                  </span>
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(199,155,67,0.28)] text-[var(--lale-gold)] transition-colors group-hover:border-[var(--lale-gold)] group-hover:bg-[#fbf2e3]">
                    <FiArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
