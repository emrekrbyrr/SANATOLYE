export const SCHOOL = {
  name: "SANATÖLYE",
  tagline: "Sanat Akademisi",
  motto: "Daha güzel bir dünya için sanat",
  email: "bilgi@sanatolye.com.tr",
  phone: "0531 102 60 85",
  phoneHref: "05311026085",
  website: "www.sanatolye.com.tr",
  websiteHref: "https://www.sanatolye.com.tr",
  address: "Alibey Mahallesi, Turgut Özal Bulvarı No:12 A Silivri/İSTANBUL",
  hours: "Hafta içi 10:00 – 20:00 · Cumartesi 10:00 – 18:00",
  transport: "Merkezi konum ve kolay ulaşım",
  instagram: "@sanatolyeakademi",
  instagramHref: "https://www.instagram.com/sanatolyeakademi/",
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Alibey Mahallesi, Turgut Özal Bulvarı No:12 A Silivri İstanbul"),
};

// WhatsApp: 0531... -> 90531...
export const WA_NUMBER = SCHOOL.phoneHref.replace(/\D/g, "").replace(/^0/, "90");
export const waLink = (text) =>
  `https://wa.me/${WA_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const NAV = [
  { id: "anasayfa", label: "Anasayfa" },
  { id: "hakkimizda", label: "Hakkımızda" },
  { id: "dersler", label: "Sanat Dalları" },
  { id: "neden", label: "Yaklaşımımız" },
  { id: "uygulama", label: "Uygulama" },
  { id: "galeri", label: "Galeri" },
  { id: "iletisim", label: "İletişim" },
];

export const MARQUEE = [
  "Müzik",
  "Resim",
  "Daha Güzel Bir Dünya İçin Sanat",
  "Sanat Yaşamı Güzelleştirir",
  "Yaratıcılığın Adresi",
];

export const CHAPTERS = [
  {
    no: "01",
    title: "Keşfet",
    text: "Müzik ve resim… Çocuklar farklı sanat dallarını deneyerek kendilerine en yakın olanı keşfeder.",
    color: "#E3A33A",
  },
  {
    no: "02",
    title: "Üret",
    text: "İlk nota, ilk fırça darbesi, ilk adım. Her çocuk kendi eserini yaratarak öğrenir.",
    color: "#D9472B",
  },
  {
    no: "03",
    title: "Paylaş",
    text: "Yıl sonu konserleri ve sergiler ile çocuklar emeğini herkesle paylaşır.",
    color: "#C93D78",
  },
  {
    no: "04",
    title: "Büyü",
    text: "Sanat; dikkati, hayal gücünü ve özgüveni besler. Biz sanatla büyüyen bireyler yetiştiriyoruz.",
    color: "#2A44B8",
  },
];

export const BRANCH_FILTERS = [
  { id: "all", label: "Tümü" },
  { id: "muzik", label: "Müzik" },
  { id: "resim", label: "Resim" },
];

export const LESSONS = [
  {
    id: "piyano",
    name: "Piyano",
    branch: "muzik",
    tag: "Müzik",
    desc: "Küçük parmaklar için renkli notalar. El-göz koordinasyonu ve melodi sevgisiyle başlıyoruz.",
    skills: ["Nota okuma", "Ritim duygusu", "İki el koordinasyonu"],
    image: "https://images.unsplash.com/photo-1577877777751-3f1ec20a0715?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
    accent: "ultra",
  },
  {
    id: "gitar",
    name: "Gitar",
    branch: "muzik",
    tag: "Müzik",
    desc: "İlk akorlar, ilk şarkılar! Çocuğunuz sevdiği melodileri kısa sürede çalmaya başlar.",
    skills: ["Akor geçişleri", "Şarkı eşliği", "Parmak gücü"],
    image: "https://images.unsplash.com/photo-1527236102507-6e5ac2692925?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
    accent: "ultra",
  },
  {
    id: "keman",
    name: "Keman",
    branch: "muzik",
    tag: "Müzik",
    desc: "Zarafet ve disiplinin buluştuğu enstrüman. Doğru duruş ve saf tınıyla başlangıç.",
    skills: ["Yay tekniği", "Kulak eğitimi", "Duruş & disiplin"],
    image: "https://images.unsplash.com/photo-1587794032575-de0040fe9186?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
    accent: "ultra",
  },
  {
    id: "bateri",
    name: "Bateri",
    branch: "muzik",
    tag: "Müzik",
    desc: "Enerjisi yüksek çocuklar için birebir! Ritim, koordinasyon ve bolca eğlence.",
    skills: ["Tempo kontrolü", "Kol-ayak uyumu", "Grup çalma"],
    image: "https://images.unsplash.com/photo-1678531730619-5c0cbb7735be?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
    accent: "ultra",
  },
  {
    id: "san",
    name: "Şan & Solfej",
    branch: "muzik",
    tag: "Müzik",
    desc: "Doğru nefes, temiz ses. Kendi sesini keşfeden çocuklar sahnede parlar.",
    skills: ["Nefes teknikleri", "Ses açma", "Solfej"],
    image: "https://images.unsplash.com/photo-1502781252888-9143ba7f074e?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
    accent: "ultra",
  },
  {
    id: "resim-atolye",
    name: "Çocuk Resim Atölyesi",
    branch: "resim",
    tag: "Resim",
    desc: "Boyalar, fırçalar ve sınırsız hayal gücü. En küçükler için renklerle tanışma atölyesi.",
    skills: ["Renk bilgisi", "El becerisi", "Yaratıcı ifade"],
    image: "https://images.unsplash.com/photo-1536221993589-9edbbca2c7fc?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
    accent: "cad",
  },
  {
    id: "yagliboya",
    name: "Yağlıboya & Karakalem",
    branch: "resim",
    tag: "Resim",
    desc: "Temel çizim tekniklerinden yağlıboyaya. Gözlem, perspektif ve kompozisyon becerileri.",
    skills: ["Çizim teknikleri", "Perspektif", "Kompozisyon"],
    image: "https://images.pexels.com/photos/7025567/pexels-photo-7025567.jpeg?auto=compress&cs=tinysrgb&w=1200",
    accent: "cad",
  },
];

export const FEATURES = [
  {
    icon: "GraduationCap",
    title: "Uzman Sanatçı Kadro",
    text: "Alanında deneyimli, çocukla iletişimi güçlü eğitmenlerle birebir ilgi.",
  },
  {
    icon: "Users",
    title: "Butik Sınıflar",
    text: "Az kişilik gruplar sayesinde her öğrenciye özel yaklaşım.",
  },
  {
    icon: "Sparkles",
    title: "Sahne & Sergi",
    text: "Yıl sonu konserleri ve resim sergileriyle sahne deneyimi.",
  },
  {
    icon: "Building2",
    title: "Modern Atölyeler",
    text: "Işıl ışıl, güvenli ve tam donanımlı müzik ve resim atölyeleri.",
  },
  {
    icon: "CalendarClock",
    title: "Esnek Program",
    text: "Hafta içi ve hafta sonu farklı saat seçenekleriyle ailelere uygun plan.",
  },
  {
    icon: "Gift",
    title: "Ücretsiz Tanışma",
    text: "İlk deneme dersi ücretsiz; çocuğunuz sevdiği sanat dalını keşfetsin.",
  },
];

export const TESTIMONIALS = [
  {
    quote: "Kızım resim atölyesine bayılıyor. Her hafta yeni bir eserle, kocaman bir gülümsemeyle eve geliyor.",
    author: "Ayşe K.",
    role: "Veli · Resim",
  },
  {
    quote: "Oğlum piyano derslerinden sonra çok daha özgüvenli. Sahnede çalarken gözlerindeki ışığı görmek paha biçilemez.",
    author: "Mehmet T.",
    role: "Veli · Müzik",
  },
];

export const GALLERY = [
  { src: "https://images.unsplash.com/photo-1577877777751-3f1ec20a0715?crop=entropy&cs=srgb&fm=jpg&q=85&w=1000", cat: "muzik", label: "Müzik" },
  { src: "https://images.pexels.com/photos/7025966/pexels-photo-7025966.jpeg?auto=compress&cs=tinysrgb&w=1000", cat: "resim", label: "Resim" },
  { src: "https://images.unsplash.com/photo-1527236102507-6e5ac2692925?crop=entropy&cs=srgb&fm=jpg&q=85&w=1000", cat: "sahne", label: "Sahne" },
  { src: "https://images.unsplash.com/photo-1536221993589-9edbbca2c7fc?crop=entropy&cs=srgb&fm=jpg&q=85&w=1000", cat: "resim", label: "Resim" },
  { src: "https://images.unsplash.com/photo-1678531730619-5c0cbb7735be?crop=entropy&cs=srgb&fm=jpg&q=85&w=1000", cat: "muzik", label: "Müzik" },
  { src: "https://images.pexels.com/photos/7025567/pexels-photo-7025567.jpeg?auto=compress&cs=tinysrgb&w=1000", cat: "resim", label: "Resim" },
];

export const GALLERY_FILTERS = [
  { id: "all", label: "Tümü" },
  { id: "muzik", label: "Müzik" },
  { id: "resim", label: "Resim" },
  { id: "sahne", label: "Sahne" },
];

export const BRANCHES = [
  {
    id: "muzik",
    no: "01",
    title: "Müzik",
    kicker: "Müzik Stüdyosu",
    lead: "İlk nota, ilk akor, ilk alkış.",
    text: "Piyanodan bateriye, kemandan şana… Çocuklar ritmi, kulağı ve sahneyi birlikte keşfeder; dinlemeyi, beklemeyi ve birlikte çalmayı öğrenir.",
  },
  {
    id: "resim",
    no: "02",
    title: "Resim",
    kicker: "Resim Atölyesi",
    lead: "Boyalar, fırçalar ve sınırsız hayal gücü.",
    text: "Renklerle tanışmaktan karakalem ve yağlıboyaya. Gözlem, kompozisyon ve kendini ifade etme becerisi tuvalde birlikte gelişir.",
  },
];

export const EVENTS = [
  {
    id: "konser",
    type: "Konser",
    title: "Yıl Sonu Konserleri",
    text: "Bir yıl boyunca çalışılan eserler sahnede, ailelerin önünde seslendirilir.",
    color: "ultra",
  },
  {
    id: "sergi",
    type: "Sergi",
    title: "Öğrenci Resim Sergileri",
    text: "Atölyede üretilen resimler, gerçek bir sergi düzeninde duvarlara asılır.",
    color: "cad",
  },
];

export const STEPS = [
  { no: "1", title: "Bize ulaşın", text: "Telefon, WhatsApp ya da e-posta ile yazın; çocuğunuzu ve ilgi alanlarını dinleyelim." },
  { no: "2", title: "Tanışma dersine gelin", text: "İlk deneme dersi ücretsiz. Çocuğunuz atölyeyi ve öğretmeniyle tanışır." },
  { no: "3", title: "Programı birlikte planlayalım", text: "Hafta içi ve hafta sonu seçenekleriyle size uygun saatleri belirleyelim." },
];

// Mobil uygulama — özellikler App Store / Google Play açıklamasından alınmıştır.
export const APP = {
  appStoreUrl: "https://apps.apple.com/tr/app/sanat%C3%B6lye/id6815321257?l=tr",
  googlePlayUrl: "https://play.google.com/store/apps/details?id=com.sanatolye.app",
  screens: [
    { id: "ana", src: "/images/app/05-ana.jpg", label: "Her şey tek bakışta", h: 5658, text: "Sıradaki ders, yeni ödevler, ders paketleri ve yaklaşan dersler ana sayfada." },
    { id: "program", src: "/images/app/07-program.jpg", label: "Haftalık program", h: 4251, text: "Haftanın dersleri ve uygun saatler takvim üzerinde." },
    { id: "ders", src: "/images/app/08-ders-odev.jpg", label: "Öğretmen notları & ödevler", h: 2532, text: "Derste ne çalışıldı, evde ne yapılacak — öğretmen doğrudan yazar." },
    { id: "bildirim", src: "/images/app/06-bildirimler.jpg", label: "Bildirimler", h: 2532, text: "Yeni ödev, ders notu ve ders hatırlatmaları anında telefonunuzda." },
    { id: "odeme", src: "/images/app/14-odemeler.jpg", label: "Ödeme durumu", h: 2532, text: "Aidat ve hesap dökümü tek ekranda. Uygulama kart bilgisi almaz." },
  ],
  // ekran görüntüleri 1170 px genişliğinde; h = orijinal yükseklik
  more: ["Telafi ve ek ders talebi", "Öğretmenle mesajlaşma", "Öğretmen ve yönetim ekranları", "Açık ve koyu tema"],
  audiences: ["Veliler", "Öğrenciler", "Öğretmenler"],
};
