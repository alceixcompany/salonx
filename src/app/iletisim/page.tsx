'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiCheckCircle,
  FiChevronDown,
  FiInstagram,
  FiMail,
  FiMapPin,
  FiMessageCircle,
  FiPhone,
  FiSend,
} from 'react-icons/fi';
import PageHero from '@/components/PageHero';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { RootState } from '../../store';
import { clearError, fetchContactInfo, sendContactMessage } from '../../store/slices/contactSlice';

interface ContactForm {
  name: string;
  phone: string;
  email: string;
  serviceType: string;
  urgency: string;
  message: string;
}

const initialForm: ContactForm = {
  name: '',
  phone: '',
  email: '',
  serviceType: '',
  urgency: 'normal',
  message: '',
};

const contactItems = [
  {
    icon: FiPhone,
    label: 'Cep telefonu',
    value: '+90 505 759 55 59',
    detail: 'Randevu ve bilgi hattı',
    href: 'tel:+905057595559',
  },
  {
    icon: FiPhone,
    label: 'Sabit telefon',
    value: '+90 212 677 67 43',
    detail: 'Salon XL Güngören',
    href: 'tel:+902126776743',
  },
  {
    icon: FiMail,
    label: 'E-posta',
    value: 'info@salonxl.com.tr',
    detail: 'Bilgi ve randevu',
    href: 'mailto:info@salonxl.com.tr',
  },
  {
    icon: FiMapPin,
    label: 'Adres',
    value: 'Merkez Mah. Gazi Osman Paşa Cd. No:23',
    detail: '34164 Güngören / İstanbul',
    href: 'https://www.google.com/maps/search/?api=1&query=Merkez+Mah.+Gazi+Osman+Paşa+Cd.+No%3A23+Güngören+İstanbul',
  },
] as const;

const fieldClass =
  'w-full rounded-xl border border-black/10 bg-[#faf8f5] px-4 py-3.5 text-sm text-[#1b1816] outline-none transition placeholder:text-[#9b938d] focus:border-[#ed1c24] focus:bg-white focus:ring-4 focus:ring-[#ed1c24]/10';

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactForm>(initialForm);
  const [success, setSuccess] = useState(false);
  const dispatch = useAppDispatch();
  const { isSending, error } = useAppSelector((state: RootState) => state.contact) as {
    isSending: boolean;
    error: string | null;
  };

  useEffect(() => {
    dispatch(fetchContactInfo());
    dispatch(clearError());
  }, [dispatch]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSuccess(false);

    if (!formData.name || !formData.phone || !formData.email || !formData.serviceType || !formData.message) return;

    try {
      await dispatch(
        sendContactMessage({
          ...formData,
          subject: `${formData.serviceType} - ${formData.urgency}`,
          priority: 'low' as const,
        }),
      ).unwrap();
      setFormData(initialForm);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    } catch (submitError) {
      console.error('Mesaj gönderilirken hata:', submitError);
    }
  };

  return (
    <main className="page-flow min-h-screen">
      <PageHero
        eyebrow="Bize Ulaşın"
        title={<>Sizi<br />bekliyoruz</>}
        description="Randevu planlamak veya hizmetlerimiz hakkında bilgi almak için bize ulaşın."
        image="/salonxl/gallery-generated/salon-interior-v1.webp"
        imageAlt="Salon XL iletişim"
        heightClassName="min-h-[380px] py-20 sm:min-h-[440px] sm:py-24"
      />

      <section className="bg-[#f7f3ef] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="mb-12 grid gap-6 border-b border-black/10 pb-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#ed1c24]">İletişim</p>
              <h1 className="mt-4 font-serif text-4xl leading-tight text-[#1b1816] sm:text-5xl">Size nasıl yardımcı olabiliriz?</h1>
            </div>
            <p className="max-w-2xl text-base leading-8 text-[#6f6761] lg:justify-self-end">
              Hizmet seçimi, uygun randevu saati ve salonumuza ulaşım hakkında ekibimizden hızlıca bilgi alabilirsiniz.
            </p>
          </div>

          <div className="grid overflow-hidden rounded-[32px] border border-black/10 bg-white shadow-[0_28px_80px_rgba(45,35,29,0.10)] lg:grid-cols-[0.88fr_1.12fr]">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
              className="bg-[#efe8e2] p-7 sm:p-10 lg:p-12"
            >
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-[#ed1c24]">Doğrudan ulaşın</p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://wa.me/905057595559"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-full bg-[#ed1c24] px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#cf161d]"
                >
                  <FiMessageCircle /> WhatsApp’tan Yazın
                </a>
                <a
                  href="tel:+905057595559"
                  className="inline-flex items-center gap-3 rounded-full border border-black/15 bg-white px-6 py-3.5 text-sm font-semibold text-[#1b1816] transition hover:-translate-y-0.5 hover:border-[#ed1c24] hover:text-[#ed1c24]"
                >
                  <FiPhone /> Hemen Arayın
                </a>
              </div>

              <div className="mt-9 divide-y divide-black/10 border-y border-black/10">
                {contactItems.map((item) => {
                  const Icon = item.icon;
                  const external = item.href.startsWith('http');
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noopener noreferrer' : undefined}
                      className="group flex items-start gap-4 py-5"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#ed1c24] shadow-sm transition group-hover:bg-[#ed1c24] group-hover:text-white">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span>
                        <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-[#918781]">{item.label}</span>
                        <span className="mt-1 block font-serif text-lg leading-6 text-[#1b1816] transition group-hover:text-[#ed1c24]">{item.value}</span>
                        <span className="mt-1 block text-xs text-[#7b726c]">{item.detail}</span>
                      </span>
                    </a>
                  );
                })}
              </div>

              <a
                href="https://www.instagram.com/salonxlcomtr/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-3 text-sm font-semibold text-[#1b1816] transition hover:text-[#ed1c24]"
              >
                <FiInstagram className="text-[#ed1c24]" /> @salonxlcomtr
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative border-t border-black/10 bg-white p-7 sm:p-10 lg:border-l lg:border-t-0 lg:p-12"
            >
              <span className="absolute inset-x-0 top-0 h-1 bg-[#ed1c24]" />
              <h2 className="font-serif text-3xl text-[#1b1816] sm:text-4xl">Randevu talebi oluşturun</h2>
              <p className="mt-2 text-sm leading-6 text-[#756c66]">Formu gönderdiğinizde ekibimiz sizinle iletişime geçecektir.</p>

              {success && (
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mt-6 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
                  <FiCheckCircle className="h-5 w-5 shrink-0" /> Mesajınız başarıyla iletildi. En kısa sürede sizi arayacağız.
                </motion.div>
              )}
              {error && <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>}

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="space-y-2 text-xs font-bold uppercase tracking-[0.14em] text-[#615954]">
                    Ad Soyad
                    <input className={fieldClass} type="text" name="name" value={formData.name} onChange={handleInputChange} required placeholder="Adınız ve soyadınız" />
                  </label>
                  <label className="space-y-2 text-xs font-bold uppercase tracking-[0.14em] text-[#615954]">
                    Telefon
                    <input className={fieldClass} type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required placeholder="05xx xxx xx xx" />
                  </label>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="space-y-2 text-xs font-bold uppercase tracking-[0.14em] text-[#615954]">
                    E-posta
                    <input className={fieldClass} type="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="ornek@email.com" />
                  </label>
                  <label className="space-y-2 text-xs font-bold uppercase tracking-[0.14em] text-[#615954]">
                    Hizmet
                    <span className="relative block">
                      <select className={`${fieldClass} appearance-none pr-10`} name="serviceType" value={formData.serviceType} onChange={handleInputChange} required>
                        <option value="">Hizmet seçiniz</option>
                        <option value="sac-kesimi">Saç Kesimi</option>
                        <option value="sac-tasarim">Ombre / Sombre / Röfle</option>
                        <option value="mikro-kaynak">Mikro Kaynak</option>
                        <option value="sac-bakimi">Saç Bakımı</option>
                        <option value="renklendirme">Renklendirme</option>
                        <option value="tirnak">Tırnak</option>
                        <option value="cilt-bakimi">Cilt Bakımı</option>
                        <option value="epilasyon">Epilasyon</option>
                        <option value="gelin-nisan">Gelin / Nişan</option>
                        <option value="diger">Diğer</option>
                      </select>
                      <FiChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#ed1c24]" />
                    </span>
                  </label>
                </div>

                <label className="block space-y-2 text-xs font-bold uppercase tracking-[0.14em] text-[#615954]">
                  Mesajınız
                  <textarea className={`${fieldClass} min-h-32 resize-none`} name="message" value={formData.message} onChange={handleInputChange} required placeholder="İstediğiniz işlem veya uygun olduğunuz saatler hakkında bilgi verebilirsiniz." />
                </label>

                <button type="submit" disabled={isSending} className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#ed1c24] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#cf161d] active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-[#b9b3af]">
                  {isSending ? <><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" /> Gönderiliyor...</> : <><FiSend /> Mesajı Gönder</>}
                </button>
              </form>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-20 overflow-hidden rounded-[24px] border border-black/10 bg-white shadow-[0_20px_55px_rgba(45,35,29,0.08)]"
          >
            <div className="flex flex-col gap-2 border-b border-white/10 bg-[#211d1a] px-7 py-6 text-white sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ed1c24]">Konum</p>
                <h2 className="mt-1 font-serif text-2xl text-white">Salon XL Güngören</h2>
              </div>
              <p className="text-sm text-white/65">Merkez Mah. Gazi Osman Paşa Cd. No:23</p>
            </div>
            <iframe
              src="https://www.google.com/maps?q=Merkez%20Mah.%20Gazi%20Osman%20Pa%C5%9Fa%20Cd.%20No%3A23%20G%C3%BCng%C3%B6ren%20%C4%B0stanbul&output=embed"
              width="100%"
              height="430"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Salon XL Konum"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </motion.div>
        </div>
      </section>
    </main>
  );
}
