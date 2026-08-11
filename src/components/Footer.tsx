'use client'
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FiInstagram, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';

const Footer = () => {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;

  return (
    <footer className="relative bg-[#090909] text-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid gap-12 border-b border-white/10 py-16 lg:grid-cols-[1.1fr_.8fr_1.1fr_1.15fr]">
          <div>
            <Image src="/salonxl/logo.png" alt="Salon XL" width={3315} height={3315} className="h-28 w-28 rounded-full object-contain" />
            <p className="mt-6 max-w-sm text-sm leading-7 text-white/55">
              Güngören&apos;de saç tasarımı, güzellik ve kişisel bakım hizmetlerini 24 yılı aşan deneyimle sunuyoruz.
            </p>
            <a href="https://www.instagram.com/salonxlcomtr/" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-[#ed1c24] transition hover:border-[#ed1c24]" aria-label="Instagram">
              <FiInstagram />
            </a>
          </div>

          <div>
            <h3 className="font-serif text-2xl">Sayfalar</h3>
            <ul className="mt-5 space-y-3 text-sm text-white/55">
              <li><Link href="/">Ana Sayfa</Link></li><li><Link href="/hakkimizda">Hakkımızda</Link></li>
              <li><Link href="/hizmetlerimiz">Hizmetlerimiz</Link></li><li><Link href="/galeri">Galeri</Link></li>
              <li><Link href="/haberler">Blog</Link></li><li><Link href="/iletisim">İletişim</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-2xl">Öne Çıkan Hizmetler</h3>
            <ul className="mt-5 grid grid-cols-2 gap-3 text-sm text-white/55">
              {['Saç Kesimi','Ombre','Sombre','Mikro Kaynak','Röfle','Balyaj','Cilt Bakımı','Lazer Epilasyon','Protez Tırnak','Gelin Makyajı'].map(item => <li key={item}>{item}</li>)}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-2xl">İletişim</h3>
            <ul className="mt-5 space-y-5 text-sm text-white/55">
              <li className="flex gap-3"><FiMapPin className="mt-1 shrink-0 text-[#ed1c24]" /><span>Merkez Mah. Gazi Osman Paşa Cd. No:23<br />34164 Güngören / İstanbul</span></li>
              <li className="flex items-center gap-3"><FiPhone className="text-[#ed1c24]" /><a href="tel:+905057595559">+90 505 759 55 59</a></li>
              <li className="flex items-center gap-3"><FiPhone className="text-[#ed1c24]" /><a href="tel:+902126776743">+90 212 677 67 43</a></li>
              <li className="flex items-center gap-3"><FiMail className="text-[#ed1c24]" /><a href="mailto:info@salonxl.com.tr">info@salonxl.com.tr</a></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-2 py-6 text-sm text-white/40 sm:flex-row sm:justify-between">
          <p>© 2026 <span className="text-white">Salon XL</span>. Tüm hakları saklıdır.</p>
          <p>Güngören Bayan Kuaförü</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
