import fs from 'node:fs/promises';
import path from 'node:path';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const root = process.cwd();
const envText = await fs.readFile(path.join(root, '.env.local'), 'utf8');
const env = Object.fromEntries(
  envText.split(/\r?\n/).filter(Boolean).map((line) => {
    const separator = line.indexOf('=');
    return [line.slice(0, separator), line.slice(separator + 1)];
  }),
);

const app = initializeApp({
  apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.NEXT_PUBLIC_FIREBASE_APP_ID,
});

const db = getFirestore(app);
const storage = getStorage(app);
const now = new Date().toISOString();

const assets = [
  'gallery-1.jpg', 'gallery-2.jpg', 'gallery-3.jpg', 'gallery-4.jpg', 'gallery-5.jpg',
  'salon-interior.jpg', 'ombre.jpg', 'sombre.jpg', 'mikro-kaynak.jpg',
  'cilt-bakimi.jpg', 'lazer-epilasyon.jpg', 'protez-tirnak.jpg',
  'gallery-generated/balayage-v1.webp', 'gallery-generated/ombre-v1.webp',
  'gallery-generated/salon-interior-v1.webp', 'gallery-generated/bridal-updo-v1.webp',
  'gallery-generated/skincare-v1.webp', 'gallery-generated/nails-v1.webp',
];

const contentTypes = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp' };
const urls = {};
let storageReady = true;

for (const filename of assets) {
  if (storageReady) {
    try {
      const filePath = path.join(root, 'public', 'salonxl', filename);
      const bytes = await fs.readFile(filePath);
      const objectRef = ref(storage, `salonxl-content/${filename}`);
      await uploadBytes(objectRef, bytes, {
        contentType: contentTypes[path.extname(filename).toLowerCase()] || 'application/octet-stream',
        cacheControl: 'public,max-age=31536000,immutable',
      });
      urls[filename] = await getDownloadURL(objectRef);
      console.log(`Storage: ${filename}`);
    } catch (error) {
      storageReady = false;
      console.warn(`Storage bucket erişilebilir değil (${error.code || error.message}). Yerel yayın URL'leri kullanılacak.`);
    }
  }
  if (!urls[filename]) urls[filename] = `/salonxl/${filename}`;
}

const categories = [
  { id: 'salon', name: 'Salon', description: 'Salon XL atmosferi ve mekân detayları.', icon: '✦', color: 'gray', order: 1 },
  { id: 'sac-tasarim', name: 'Saç Tasarımı', description: 'Kesim, ombre, sombre ve renk çalışmalarımız.', icon: '✂️', color: 'red', order: 2 },
  { id: 'bakim', name: 'Güzellik & Bakım', description: 'Cilt, epilasyon ve tırnak uygulamalarımız.', icon: '◇', color: 'pink', order: 3 },
];

for (const category of categories) {
  await setDoc(doc(db, 'gallery_categories', category.id), {
    ...category,
    isActive: true,
    createdAt: now,
    updatedAt: now,
  }, { merge: true });
}

const gallery = [
  ['premium-salon-atmosferi', 'Salon XL Atmosferi', 'Sakin, modern ve özenli salon deneyimi.', 'salon', 'gallery-generated/salon-interior-v1.webp', ['salon xl', 'atmosfer']],
  ['karamel-balayage', 'Karamel Balayage', 'Boyutlu renk geçişleri ve sağlıklı parlaklık.', 'sac-tasarim', 'gallery-generated/balayage-v1.webp', ['balayage', 'saç tasarımı']],
  ['soguk-bej-ombre', 'Soğuk Bej Ombre', 'Doğal diplerden aydınlık uçlara zarif geçiş.', 'sac-tasarim', 'gallery-generated/ombre-v1.webp', ['ombre', 'renklendirme']],
  ['ozel-gun-sac-tasarimi', 'Özel Gün Saç Tasarımı', 'Modern ve zarif topuz tasarımı.', 'sac-tasarim', 'gallery-generated/bridal-updo-v1.webp', ['gelin saçı', 'topuz']],
  ['profesyonel-cilt-bakimi', 'Profesyonel Cilt Bakımı', 'Cildin ihtiyacına göre planlanan özenli bakım.', 'bakim', 'gallery-generated/skincare-v1.webp', ['cilt bakımı', 'güzellik']],
  ['kalici-oje-manikur', 'Kalıcı Oje & Manikür', 'Bakımlı eller için zarif bordo manikür.', 'bakim', 'gallery-generated/nails-v1.webp', ['manikür', 'kalıcı oje']],
];

const galleryIds = new Set(gallery.map(([id]) => id));
const existingGallery = await getDocs(collection(db, 'gallery_items'));
for (const existing of existingGallery.docs) {
  if (!galleryIds.has(existing.id)) await deleteDoc(existing.ref);
}

for (const [id, title, description, categoryId, filename, tags] of gallery) {
  await setDoc(doc(db, 'gallery_items', id), {
    title,
    description,
    categoryId,
    imageUrl: urls[filename],
    thumbnailUrl: urls[filename],
    tags,
    isActive: true,
    isFeatured: id === 'karamel-balayage' || id === 'premium-salon-atmosferi',
    order: gallery.findIndex((item) => item[0] === id) + 1,
    createdAt: now,
    updatedAt: now,
  }, { merge: true });
}

const news = [
  {
    id: 'ombre-sac-rengi-rehberi',
    title: 'Ombre Saç Rengi Seçerken Nelere Dikkat Edilmeli?',
    subtitle: 'Doğal geçişlerin sırrı doğru ton ve doğru teknikte.',
    description: 'Ten tonu, saçın mevcut yapısı ve günlük stilinize göre doğru ombre seçimini anlatıyoruz.',
    image: 'ombre.jpg', category: 'Saç Tasarımı', tags: ['ombre', 'saç rengi', 'saç tasarımı'], featured: true,
    content: '<p>Ombre uygulamasında güzel bir sonuç yalnızca açık renk uçlardan ibaret değildir. Ten alt tonu, saçın mevcut rengi, uzunluğu ve günlük kullanım alışkanlıkları birlikte değerlendirilmelidir.</p><p>Salon XL’de geçiş yüksekliği ve renk yoğunluğu kişiye özel planlanır. Amaç saçta sert bir çizgi oluşturmadan, doğal ve bakımlı bir görünüm elde etmektir.</p><h2>Bakımı nasıl yapılmalı?</h2><p>Renk koruyucu ürünler, düzenli nem bakımı ve kontrollü ısı kullanımı ombrenin parlaklığını daha uzun süre korumaya yardımcı olur.</p>',
  },
  {
    id: 'sombre-ve-ombre-farki',
    title: 'Sombre ve Ombre Arasındaki Fark Nedir?',
    subtitle: 'İki popüler renk tekniğini yakından tanıyın.',
    description: 'Daha doğal bir sonuç mu, daha belirgin bir değişim mi? Sombre ve ombre arasındaki temel farklar.',
    image: 'sombre.jpg', category: 'Saç Tasarımı', tags: ['sombre', 'ombre', 'renklendirme'], featured: false,
    content: '<p>Sombre, ombreye göre daha yumuşak ve düşük kontrastlı geçişler sunar. Ombre ise saç uçlarında daha belirgin bir aydınlık etkisi oluşturabilir.</p><p>Hangi tekniğin uygun olduğu saçın doğal rengine, istenen değişim seviyesine ve bakım alışkanlıklarına göre belirlenir. Salon XL uzmanları işlem öncesinde saç yapısını değerlendirerek kişiye özel yönlendirme yapar.</p>',
  },
  {
    id: 'mikro-kaynak-bakimi',
    title: 'Mikro Kaynak Sonrası Bakım Rehberi',
    subtitle: 'Dolgun ve uzun saç görünümünü koruyan küçük alışkanlıklar.',
    description: 'Mikro kaynak uygulamasının formunu ve doğal görünümünü korumak için bakım önerileri.',
    image: 'mikro-kaynak.jpg', category: 'Saç Bakımı', tags: ['mikro kaynak', 'saç bakımı'], featured: false,
    content: '<p>Mikro kaynak sonrası saçın doğru fırçayla ve nazik hareketlerle taranması önemlidir. Kaynak bağlantı noktalarına aşırı ısı uygulamaktan kaçınılmalıdır.</p><p>Saçı yatmadan önce gevşek biçimde toplamak ve önerilen bakım aralıklarına uymak uygulamanın daha uzun süre düzenli görünmesini destekler.</p>',
  },
  {
    id: 'sac-bakiminda-keratin',
    title: 'Keratin Bakımı Kimler İçin Uygundur?',
    subtitle: 'Yıpranmış ve kontrolü zor saçlar için bakım seçenekleri.',
    description: 'Keratin bakımının saçtaki etkisini ve işlem sonrası dikkat edilmesi gerekenleri inceleyin.',
    image: 'gallery-4.jpg', category: 'Saç Bakımı', tags: ['keratin', 'saç bakımı'], featured: false,
    content: '<p>Keratin bakımı; işlem görmüş, matlaşmış veya şekillendirmesi zorlaşmış saçlarda daha düzenli ve parlak bir görünümü destekleyebilir.</p><p>Uygulamanın içeriği ve süresi saçın ihtiyacına göre belirlenmelidir. İşlem sonrasında uzmanın önerdiği ürünleri kullanmak bakım etkisinin korunmasına yardımcı olur.</p>',
  },
  {
    id: 'cilt-bakimi-oncesi-hazirlik',
    title: 'Profesyonel Cilt Bakımı Öncesi Hazırlık',
    subtitle: 'Bakım randevusundan daha iyi verim almak için sade öneriler.',
    description: 'Cilt bakımı öncesinde ve sonrasında dikkat edilmesi gereken temel adımlar.',
    image: 'cilt-bakimi.jpg', category: 'Cilt Bakımı', tags: ['cilt bakımı', 'güzellik'], featured: false,
    content: '<p>Profesyonel cilt bakımı öncesinde cildi tahriş edebilecek yoğun uygulamalardan kaçınmak ve kullanılan ürünleri uzmanla paylaşmak önemlidir.</p><p>Salon XL’de cilt ihtiyacı uygulama öncesinde değerlendirilir. Bakım sonrasında nem desteği ve güneş koruması önerilen rutinin temel parçalarıdır.</p>',
  },
  {
    id: 'protez-tirnak-bakimi',
    title: 'Protez Tırnağın Ömrünü Uzatan Bakım Önerileri',
    subtitle: 'Bakımlı eller için günlük hayatta dikkat edilecek noktalar.',
    description: 'Protez tırnak uygulamasını daha uzun süre korumaya yardımcı olan pratik öneriler.',
    image: 'protez-tirnak.jpg', category: 'Tırnak', tags: ['protez tırnak', 'tırnak bakımı'], featured: false,
    content: '<p>Protez tırnakları sert yüzeyleri açmak için kullanmamak, temizlik ürünleriyle çalışırken eldiven takmak ve bakım randevularını aksatmamak önemlidir.</p><p>Herhangi bir kalkma veya çatlama fark edildiğinde uygulamayı evde çıkarmaya çalışmak yerine profesyonel destek alınmalıdır.</p>',
  },
];

for (const [index, item] of news.entries()) {
  await setDoc(doc(db, 'haberler', item.id), {
    title: item.title,
    subtitle: item.subtitle,
    description: item.description,
    content: item.content,
    imageUrl: urls[item.image],
    slug: item.id,
    author: 'Salon XL',
    category: item.category,
    tags: item.tags,
    featured: item.featured,
    isActive: true,
    order: index + 1,
    publishedAt: now,
    createdAt: now,
    updatedAt: now,
  }, { merge: true });
}

console.log(`Tamamlandı: ${gallery.length} galeri kaydı, ${news.length} blog yazısı. Görseller: ${storageReady ? 'Firebase Storage' : 'public/salonxl (Storage açılınca yeniden yüklenebilir)'}.`);
process.exit(0);
