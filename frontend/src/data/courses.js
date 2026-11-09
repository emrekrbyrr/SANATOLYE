// Kurs sayfaları (SEO). Her sayfa kendi aramasını hedefler: "silivri piyano kursu" gibi.
// Metinler yalnızca bildiğimiz bilgilere dayanır (ders içerikleri content.js'deki LESSONS,
// adres/saat SCHOOL). Yaş aralığı, ücret, ders süresi gibi bilinmeyen şeyler yazılmaz.
// Bu dosya hem React hem de build sonrası prerender betiği (scripts/prerender.mjs) tarafından
// okunur; bu yüzden başka bir dosyayı import etmez.

export const COURSES = [
  {
    slug: "silivri-piyano-kursu",
    lessons: ["piyano"],
    branch: "muzik",
    name: "Piyano",
    h1: "Silivri Piyano Kursu",
    title: "Silivri Piyano Kursu | Çocuklar İçin Piyano Dersi – SANATÖLYE",
    description:
      "Silivri'de çocuklar için piyano kursu: nota okuma, ritim ve iki el koordinasyonu. Butik sınıflar, uzman eğitmenler. İlk deneme dersi ücretsiz.",
    lead: "Küçük parmaklar için renkli notalar. Piyanoyla müziğin temelini sağlam atıyoruz.",
    intro: [
      "Piyano, müziğe başlamak için en sağlam enstrümanlardan biridir: tuşların önünde melodiyi ve armoniyi aynı anda görür, iki elinizi birbirinden bağımsız kullanmayı öğrenirsiniz. SANATÖLYE'nin Silivri'deki müzik stüdyosunda çocuklar piyanoyla önce müziği sevmeyi, sonra okumayı ve çalmayı öğrenir.",
      "Derslerde nota okuma, ritim duygusu ve iki el koordinasyonu adım adım çalışılır. Öğretmenin her dersten sonra yazdığı notları ve ödevleri SANATÖLYE mobil uygulamasından takip edebilirsiniz.",
    ],
    faq: [
      {
        q: "Daha önce hiç piyano çalmamış bir çocuk başlayabilir mi?",
        a: "Evet. Piyano dersleri temelden başlar: tuşları tanımak, ilk notaları okumak ve el-göz koordinasyonu. Ön bilgi gerekmez.",
      },
    ],
  },
  {
    slug: "silivri-bateri-kursu",
    lessons: ["bateri"],
    branch: "muzik",
    name: "Bateri",
    h1: "Silivri Bateri Kursu",
    title: "Silivri Bateri Kursu | Çocuklar İçin Bateri Dersi – SANATÖLYE",
    description:
      "Silivri'de çocuklar için bateri kursu: tempo kontrolü, kol-ayak uyumu ve grup çalma. Enerjisi yüksek çocuklar için birebir. İlk deneme dersi ücretsiz.",
    lead: "Enerjisi yüksek çocuklar için birebir: ritim, koordinasyon ve bolca eğlence.",
    intro: [
      "Bateri, çocuğun enerjisini ritme dönüştürdüğü bir enstrümandır. Bir yandan iki el ve iki ayak aynı anda farklı işler yaparken, öte yandan tempoyu korumayı ve diğer müzisyenleri dinlemeyi öğrenir.",
      "SANATÖLYE'nin Silivri'deki müzik stüdyosunda bateri derslerinde tempo kontrolü, kol-ayak uyumu ve grup içinde çalma çalışılır. Yıl sonu konserlerinde çocuklar öğrendiklerini sahnede çalar.",
    ],
    faq: [
      {
        q: "Bateri dersi hangi çocuklara uygun?",
        a: "Ritme ilgisi olan, enerjisini bir şeye yöneltmek isteyen her çocuğa. Dersler temelden başlar; tempo ve koordinasyon adım adım gelişir.",
      },
    ],
  },
  {
    slug: "silivri-gitar-kursu",
    lessons: ["gitar"],
    branch: "muzik",
    name: "Gitar",
    h1: "Silivri Gitar Kursu",
    title: "Silivri Gitar Kursu | Çocuklar İçin Gitar Dersi – SANATÖLYE",
    description:
      "Silivri'de çocuklar için gitar kursu: ilk akorlar, akor geçişleri ve şarkı eşliği. Butik sınıflar, uzman eğitmenler. İlk deneme dersi ücretsiz.",
    lead: "İlk akorlar, ilk şarkılar! Sevdiği melodileri kısa sürede çalmaya başlar.",
    intro: [
      "Gitar, çocuğun sevdiği şarkılara en hızlı ulaştığı enstrümanlardan biridir. İlk birkaç akorla bile tanıdık melodilere eşlik etmek mümkün olduğu için motivasyon yüksek kalır.",
      "SANATÖLYE'nin Silivri'deki müzik stüdyosunda gitar derslerinde akor geçişleri, şarkı eşliği ve parmak gücü çalışılır. Ders notları ve ödevler mobil uygulamada veliyle paylaşılır.",
    ],
    faq: [
      {
        q: "Gitar dersine başlamak için ön bilgi gerekir mi?",
        a: "Hayır. Dersler ilk akorlardan başlar; çocuk kısa sürede sevdiği şarkılara eşlik etmeye başlar.",
      },
    ],
  },
  {
    slug: "silivri-keman-kursu",
    lessons: ["keman"],
    branch: "muzik",
    name: "Keman",
    h1: "Silivri Keman Kursu",
    title: "Silivri Keman Kursu | Çocuklar İçin Keman Dersi – SANATÖLYE",
    description:
      "Silivri'de çocuklar için keman kursu: yay tekniği, kulak eğitimi, doğru duruş ve disiplin. İlk deneme dersi ücretsiz. SANATÖLYE Sanat Akademisi.",
    lead: "Zarafet ve disiplinin buluştuğu enstrüman: doğru duruş ve saf tınıyla başlangıç.",
    intro: [
      "Keman, kulağı en çok geliştiren enstrümanlardan biridir: perdesiz bir sapta doğru sesi bulmak, çocuğa dikkatle dinlemeyi öğretir. Doğru duruş ve yay tekniği baştan doğru kurulduğunda ilerleme çok daha keyifli olur.",
      "SANATÖLYE'nin Silivri'deki müzik stüdyosunda keman derslerinde yay tekniği, kulak eğitimi, duruş ve disiplin çalışılır.",
    ],
    faq: [
      {
        q: "Keman zor bir enstrüman mı?",
        a: "Başlangıçta doğru duruş ve yay tekniği önemlidir; derslerde tam da buradan başlanır. Temel doğru kurulunca çocuk adım adım ilerler.",
      },
    ],
  },
  {
    slug: "silivri-san-kursu",
    lessons: ["san"],
    branch: "muzik",
    name: "Şan & Solfej",
    h1: "Silivri Şan ve Solfej Kursu",
    title: "Silivri Şan ve Solfej Kursu | Çocuklar İçin Ses Eğitimi – SANATÖLYE",
    description:
      "Silivri'de çocuklar için şan ve solfej kursu: nefes teknikleri, ses açma ve solfej. Kendi sesini keşfeden çocuklar sahnede parlar. İlk deneme dersi ücretsiz.",
    lead: "Doğru nefes, temiz ses. Kendi sesini keşfeden çocuklar sahnede parlar.",
    intro: [
      "Şan dersleri, çocuğun kendi sesini tanıması ve onu doğru kullanmasıyla başlar. Doğru nefes alışkanlığı hem şarkı söylerken hem de günlük konuşmada özgüven kazandırır.",
      "SANATÖLYE'nin Silivri'deki müzik stüdyosunda şan ve solfej derslerinde nefes teknikleri, ses açma çalışmaları ve solfej yapılır. Solfej, her enstrüman için de sağlam bir müzik temeli oluşturur.",
    ],
    faq: [
      {
        q: "Solfej ne işe yarar?",
        a: "Solfej, notaları okuyup seslendirmeyi öğretir. Hem şarkı söylemek hem de herhangi bir enstrümanı çalmak için müzikal bir temel oluşturur.",
      },
    ],
  },
  {
    slug: "silivri-resim-kursu",
    lessons: ["resim-atolye", "yagliboya"],
    branch: "resim",
    name: "Resim",
    h1: "Silivri Resim Kursu",
    title: "Silivri Resim Kursu | Çocuk Resim Atölyesi, Yağlıboya & Karakalem – SANATÖLYE",
    description:
      "Silivri'de çocuklar için resim kursu: çocuk resim atölyesi, karakalem ve yağlıboya. Renk bilgisi, perspektif, kompozisyon. İlk deneme dersi ücretsiz.",
    lead: "Boyalar, fırçalar ve sınırsız hayal gücü: renklerle tanışmaktan yağlıboyaya.",
    intro: [
      "SANATÖLYE'nin Silivri'deki resim atölyesinde iki ayrı program var. Çocuk Resim Atölyesi en küçükler için renklerle tanışma yeridir: renk bilgisi, el becerisi ve yaratıcı ifade. Yağlıboya & Karakalem ise temel çizim tekniklerinden yağlıboyaya uzanır: gözlem, perspektif ve kompozisyon.",
      "Atölyede üretilen eserler yıl içinde öğrenci resim sergilerinde, gerçek bir sergi düzeninde duvarlara asılır.",
    ],
    faq: [
      {
        q: "Çocuk Resim Atölyesi ile Yağlıboya & Karakalem arasındaki fark ne?",
        a: "Çocuk Resim Atölyesi renklerle tanışma ve yaratıcı ifade üzerine kuruludur. Yağlıboya & Karakalem ise çizim teknikleri, perspektif ve kompozisyon gibi daha teknik becerilere odaklanır.",
      },
    ],
  },
];

export const courseBySlug = (slug) => COURSES.find((c) => c.slug === slug);
export const courseForLesson = (lessonId) => COURSES.find((c) => c.lessons.includes(lessonId));

/** FAQs shared by every course page — all answers come from known school facts. */
export const commonFaq = (course, school) => [
  {
    q: `Silivri'de ${course.name.toLowerCase()} kursunuz nerede?`,
    a: `SANATÖLYE Sanat Akademisi: ${school.address}. Merkezi konumdadır ve ulaşımı kolaydır.`,
  },
  {
    q: "Deneme dersi ücretli mi?",
    a: "Hayır. İlk deneme dersi ücretsizdir; çocuğunuz atölyeyi ve öğretmeniyle tanışır.",
  },
  {
    q: "Ders saatleri nasıl?",
    a: `Çalışma saatlerimiz: ${school.hours}. Hafta içi ve hafta sonu farklı saat seçenekleri vardır.`,
  },
  {
    q: "Sınıflar kaç kişilik?",
    a: "Butik sınıflarla çalışıyoruz: az kişilik gruplar sayesinde her öğrenciye özel ilgi gösterilir.",
  },
  {
    q: "Derslerin nasıl gittiğini takip edebilir miyim?",
    a: "Evet. SANATÖLYE mobil uygulamasından haftalık programı, ders notlarını, ödevleri ve ödeme durumunu takip edebilirsiniz.",
  },
];
