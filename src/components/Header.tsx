'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin') || false;
  const navLinks = [
    { href: '/', label: 'Ana Sayfa' },
    { href: '/hizmetlerimiz', label: 'Hizmetlerimiz' },
    { href: '/galeri', label: 'Galeri' },
    { href: '/haberler', label: 'Haberler' },
    { href: '/hakkimizda', label: 'Hakkımızda' },
    { href: '/iletisim', label: 'İletişim' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close menu on escape key and handle body scroll
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    // Simple body scroll lock without jumping to top
    if (isMenuOpen) {
      // Store current scroll position
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY.replace('-', '')));
      }
    }

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Admin sayfasında Header'ı gösterme
  if (isAdminPage) {
    return null;
  }

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 border-b transition-[background-color,box-shadow,border-color] duration-500 ${
        isScrolled
          ? 'border-[#ded6cf] bg-[rgba(248,245,241,0.96)] shadow-[0_10px_30px_rgba(28,21,17,.12)]'
          : 'border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className={`flex items-center justify-between gap-6 transition-[height] duration-500 ease-out ${isScrolled ? 'h-[70px]' : 'h-[88px]'}`}>
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center"
            aria-label="Salon XL ana sayfa"
          >
            <motion.div
              className="relative flex items-center"
              whileHover={{ scale: 1.06, rotate: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 320, damping: 20 }}
            >
              <Image 
                src="/salonxl/logo.png"
                alt="Salon XL"
                width={3315}
                height={3315}
                className={`rounded-full object-contain transition-[width,height] duration-500 ${isScrolled ? 'h-11 w-11' : 'h-14 w-14'}`}
                priority
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <motion.nav
            className="hidden h-full items-center gap-7 lg:flex xl:gap-9"
            aria-label="Ana menü"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.055, delayChildren: 0.08 } },
            }}
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <motion.div
                  key={link.href}
                  className="h-full"
                  variants={{
                    hidden: { opacity: 0, y: -10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={link.href}
                    className={`group relative flex h-full items-center whitespace-nowrap text-sm font-semibold transition-colors duration-300 ${
                      isScrolled
                        ? isActive
                          ? 'text-[#171412]'
                          : 'text-[#5f5853] hover:text-[#171412]'
                        : isActive
                          ? 'text-white'
                          : 'text-white/75 hover:text-white'
                    }`}
                  >
                    <span className="transition-transform duration-300 group-hover:-translate-y-0.5">{link.label}</span>
                    {isActive ? (
                      <motion.span
                        layoutId="navbar-active-line"
                        className="absolute inset-x-0 bottom-0 h-[2px] bg-[#ed1c24]"
                        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      />
                    ) : (
                      <span className="absolute inset-x-0 bottom-0 h-[2px] origin-center scale-x-0 bg-[#ed1c24] transition-transform duration-300 group-hover:scale-x-100" />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </motion.nav>

          {/* Mobile Menu Button */}
          <button
            className={`border p-3 transition-colors lg:hidden ${
              isScrolled
                ? 'border-black/15 text-[#171412] hover:border-[#ed1c24] hover:text-[#ed1c24]'
                : 'border-white/25 text-white hover:border-[#ed1c24] hover:text-[#ed1c24]'
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Mobil menüyü aç"
            aria-expanded={isMenuOpen}
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                isMenuOpen ? 'rotate-45 translate-y-1.5' : 'translate-y-0'
              }`}></span>
              <span className={`block w-5 h-0.5 bg-current transition-all duration-300 my-1 ${
                isMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}></span>
              <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                isMenuOpen ? '-rotate-45 -translate-y-1.5' : 'translate-y-0'
              }`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu Portal */}
        {isMenuOpen && typeof window !== 'undefined' && createPortal(
          <div className="fixed inset-0 z-[9999] bg-[#f8f5f1] text-[#171412] lg:hidden">
            {/* Header */}
            <div className="flex h-[82px] items-center justify-between border-b border-black/10 px-5">
              <Link
                href="/"
                className="inline-flex items-center"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Salon XL ana sayfa"
              >
                <Image 
                  src="/salonxl/logo.png"
                  alt="Salon XL"
                  width={3315}
                  height={3315}
                  className="h-12 w-12 rounded-full object-contain"
                  priority
                />
              </Link>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="border border-black/15 p-3 text-[#171412] transition-colors hover:border-[#ed1c24] hover:text-[#ed1c24]"
                aria-label="Mobil menüyü kapat"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto px-5 py-7">
              <div className="border-t border-black/10">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`block border-b px-1 py-5 text-sm font-semibold tracking-[0.08em] transition-colors duration-200 ${
                        isActive
                          ? 'border-[#ed1c24] text-[#ed1c24]'
                          : 'border-black/10 text-[#5f5853] hover:text-[#171412]'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </nav>
          </div>,
          document.body
        )}
      </div>
    </header>
  );
};

export default Header;
