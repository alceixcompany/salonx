export const serviceGroups = [
  { slug: 'sac-kesimi', title: 'Saç Kesimi ve Tasarım', description: 'Yüz hatlarınıza, saç yapınıza ve stilinize uygun profesyonel kesim.', items: ['Saç Kesimi', 'Tesettür Saç Kesimi', 'Casper Saç Kesim'] },
  { slug: 'sac-tasarim', title: 'Saç Tasarım', description: 'Güncel tekniklerle doğal geçişler ve kişiye özel tasarımlar.', items: ['Ombre', 'Tesettür Ombre', 'Sombre', 'Röfle', 'Tesettür Röfle', 'Topuz', 'Maşa', 'Balyaj', 'At Kuyruğu', 'Mikro Kaynak'] },
  { slug: 'sac-bakimi', title: 'Saç Bakımı', description: 'Saçın ihtiyacına göre parlaklık, güç ve canlılık kazandıran uygulamalar.', items: ['Saç Bakımı', 'Keratin Bakım', 'Tesettür Saç Bakımı', 'Tesettür Keratin Bakım', 'Saç Cila Uygulama'] },
  { slug: 'renklendirme', title: 'Renklendirme', description: 'Profesyonel ürünlerle kişiselleştirilmiş renk uygulamaları.', items: ['Dip Boya', 'Saç Renk Değişimi', 'Komple Boya', 'Tesettür Dip Boya'] },
  { slug: 'el-ayak', title: 'El / Ayak Bakımı', description: 'Bakımlı el ve ayaklar için hijyenik ve profesyonel uygulamalar.', items: ['Pedikür', 'Spa Pedikür', 'Ayak Bakımı', 'Medikal Manikür', 'Medikal Ayak Bakımı'] },
  { slug: 'epilasyon', title: 'Epilasyon', description: 'Modern teknolojilerle konforlu ve planlı epilasyon hizmetleri.', items: ['Lazer Epilasyon', 'Buz Lazer', 'IPL Lazer Uygulama'] },
  { slug: 'agda', title: 'Ağda', description: 'Farklı bölgelere yönelik hijyenik ağda uygulamaları.', items: ['Kol Ağda', 'Kol Altı Ağda', 'Komple Bacak Ağda', 'Komple Ağda'] },
  { slug: 'tirnak', title: 'Tırnak', description: 'Estetik, güçlü ve uzun ömürlü tırnak uygulamaları.', items: ['Protez Tırnak', 'Takma Tırnak', 'Jel Tırnak', 'Kalıcı Oje', 'Ayak Kalıcı Oje', 'Kalıcı Oje Çıkarma', 'Protez Jel Çıkartma'] },
  { slug: 'makyaj', title: 'Makyaj', description: 'Yüz hatlarınıza ve özel gün konseptinize uygun profesyonel makyaj.', items: ['Gelin Makyajı', 'Profesyonel Makeup'] },
  { slug: 'gelin-nisan', title: 'Gelin / Nişan', description: 'En özel gününüz için saç ve görünüm tasarımı.', items: ['Gelin Başı', 'Tesettür Gelin Başı', 'Nişan Başı'] },
  { slug: 'cilt-bakimi', title: 'Cilt Bakımı', description: 'Cildin ihtiyacına göre yenileyici ve destekleyici uygulamalar.', items: ['Yüz Alımı', 'Cilt Leke Bakımı', 'Anti Aging Bakım', 'Et Beni Alımı', 'Kırışıklık Giderme', 'Dudak Renklendirme'] },
] as const;

export const salon = {
  name: 'Salon XL',
  phone: '+90 505 759 55 59',
  phoneHref: 'tel:+905057595559',
  landline: '+90 212 677 67 43',
  landlineHref: 'tel:+902126776743',
  whatsapp: 'https://wa.me/905057595559',
  email: 'info@salonxl.com.tr',
  instagram: 'https://www.instagram.com/salonxlcomtr/',
  instagramHandle: '@salonxlcomtr',
  address: 'Merkez Mah. Gazi Osman Paşa Cd. No:23, 34164 Güngören / İstanbul',
  maps: 'https://maps.app.goo.gl/HSW2jB2mXeFrQLkz9',
} as const;
