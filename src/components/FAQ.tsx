'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FiChevronDown } from 'react-icons/fi';

const faqs = [
  {
    question: 'Randevu almam gerekiyor mu?',
    answer: 'Bekleme yaşamamanız ve seçtiğiniz uzmanla uygun saati ayırabilmemiz için önceden randevu almanızı öneriyoruz.',
  },
  {
    question: 'Hangi saç işleminin bana uygun olduğunu nasıl belirliyorsunuz?',
    answer: 'Saç yapınız, mevcut renginiz, yüz hatlarınız ve beklentiniz değerlendirilerek kesim, renk ve bakım seçenekleri uzmanımız tarafından planlanır.',
  },
  {
    question: 'Tesettür saç hizmeti sunuyor musunuz?',
    answer: 'Evet. Tesettür saç kesimi, ombre, röfle, saç bakımı, keratin bakım ve dip boya hizmetleri sunuyoruz.',
  },
  {
    question: 'Özel gün saç ve makyaj hizmetiniz var mı?',
    answer: 'Evet. Gelin başı, tesettür gelin başı, nişan başı ve profesyonel makyaj hizmetleri randevulu olarak sunulur.',
  },
  {
    question: 'Hijyen konusunda nasıl bir süreç izliyorsunuz?',
    answer:
      'Uygulama alanları düzenli hazırlanır, kullanılan ürün ve ekipmanlar titizlikle kontrol edilir. Güvenli ve rahat hissetmeniz bizim için önceliklidir.',
  },
] as const;

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section className="lale-light-section py-16 sm:py-20 lg:py-24">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div>
            <div className="mb-7 h-px w-28 bg-[linear-gradient(90deg,var(--lale-gold),transparent)]" />
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--lale-gold)]">
              Sorular
            </p>
            <h2 className="font-serif text-3xl font-normal leading-tight text-[var(--dream-dark)] sm:text-4xl">
              Randevu öncesi aklınızda kalmasın.
            </h2>
            <p className="mt-5 text-base leading-8 text-[var(--dream-text)]">
              Saç tasarımı, bakım seçimi ve salon deneyimiyle ilgili en sık
              sorulan konuları sade şekilde yanıtladık.
            </p>
            <Link href="/iletisim" className="mt-8 inline-flex text-sm font-semibold text-[var(--lale-gold)]">
              Yine de sorunuzu iletin
            </Link>
          </div>

          <div className="border-y border-[rgba(199,155,67,0.22)]">
            {faqs.map((faq, index) => {
              const isActive = activeIndex === index;

              return (
                <div key={faq.question} className="border-b border-[rgba(199,155,67,0.16)] last:border-b-0">
                  <button
                    onClick={() => setActiveIndex(isActive ? null : index)}
                    className="flex w-full items-center justify-between gap-5 py-5 text-left"
                  >
                    <span className="text-base font-semibold text-[var(--dream-dark)]">{faq.question}</span>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[rgba(199,155,67,0.24)] text-[var(--lale-gold)]">
                      <FiChevronDown className={`h-5 w-5 transition-transform ${isActive ? 'rotate-180' : ''}`} />
                    </span>
                  </button>
                  <div className={`grid transition-all duration-300 ${isActive ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                    <div className="overflow-hidden">
                      <p className="max-w-3xl pb-5 text-sm leading-7 text-[var(--dream-text)]">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
