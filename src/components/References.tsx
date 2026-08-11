import Image from 'next/image';

const team = [
  { name: 'Cansu Nişan', role: 'Güzellik Uzmanı', image: '/salonxl/cansu-nisan.webp', text: 'Cilt bakımı, makyaj, kaş tasarımı, el-ayak bakımı ve estetik uygulamalarda kişiye özel çözümler sunar.' },
  { name: 'Tarık Nişan', role: 'Bayan Kuaförü', image: '/salonxl/tarik-nisan.webp', text: 'Saç tasarımı, renklendirme, kesim ve styling alanlarında yaratıcı, kişiye özel çalışmalar gerçekleştirir.' },
] as const;

const References = () => (
  <section className="bg-[#0a0a0a] py-16 text-white sm:py-20 lg:py-24">
    <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
      <p className="text-xs font-bold uppercase tracking-[.22em] text-[#ed1c24]">Ekibimiz</p>
      <div className="mt-4 grid gap-7 lg:grid-cols-[.8fr_1.2fr] lg:items-end"><h2 className="font-serif text-4xl sm:text-5xl">Deneyim ve yaratıcılık bir arada.</h2><p className="leading-8 text-white/55">Salon XL ekibi, güzellik ve saç tasarımındaki güncel teknikleri kişisel dokunuşlarla birleştirir.</p></div>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {team.map(person => <article key={person.name} className="grid overflow-hidden rounded-lg border border-white/10 bg-white/5 sm:grid-cols-[220px_1fr]">
          <div className="relative min-h-[320px]"><Image src={person.image} alt={person.name} fill className="object-cover" sizes="220px" /></div>
          <div className="flex flex-col justify-center p-7"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#ed1c24]">{person.role}</p><h3 className="mt-3 font-serif text-3xl">{person.name}</h3><p className="mt-5 text-sm leading-7 text-white/55">{person.text}</p></div>
        </article>)}
      </div>
    </div>
  </section>
);

export default References;
