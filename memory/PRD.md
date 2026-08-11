# SANATÖLYE Sanat Akademisi — PRD

## Orijinal Talep
Modern, okunabilirliği yüksek bir müzik okulu web sitesi. Sonradan genişletildi: **SANATÖLYE Sanat Akademisi** (Müzik · Resim · Dans), çocuklara yönelik, tanıtım sitesi. Domain: www.sanatolye.com.tr. Kullanıcının kendi sunucusu var.

## Kullanıcı Tercihleri
- Sadece tanıtım sitesi (auth yok, form yok)
- Bölümler: Anasayfa, Hakkımızda, Sanat Dalları, Neden Biz, Galeri, İletişim
- İletişim: sadece e-posta + telefon gösterimi (form yok)
- Açık renkler, çocuklara yönelik; marka: elegant altın + antrasit (logo temelli)
- Örnek/placeholder içerik
- Adres: Silivri / İstanbul (geçici)

## Mimari
- Frontend: React 19 (CRA + craco), Tailwind, framer-motion, sonner. Tek sayfa (single-page), native smooth scroll (`hooks/useSmoothScroll.js` → `scrollToId`).
- Backend/DB: kullanılmıyor (statik tanıtım sitesi). server.py şablon hali korundu.
- Fontlar: Fraunces (display serif) + Plus Jakarta Sans (body) + Caveat (accent).
- Logo: `/public/sanatolye_emblem.png` (altın yüz + S emblemi, şeffaf).

## Tamamlananlar (2026-06)
- Kinetik Hero (satır satır maskeli reveal, parallax görsel, floating ikonlar, disiplin etiketleri)
- Editorial marquee (Müzik·Resim·Dans mottoları)
- Hakkımızda: 4 numaralı manifesto + istatistikler
- Sanat Dalları: 9 kart (Müzik/Resim/Dans), branş filtresi
- Neden Biz: 6 özellik kartı + 3 veli yorumu (Eğitmenler bölümünün yerine)
- Galeri: filtreli mozaik
- İletişim: telefon/e-posta/web kopyalama + bilgi kartı (Silivri)
- Footer, glassmorphism navbar (mobil menü), responsive layout, overflow-x hidden

## Bilinen Notlar
- Screenshot aracı yalnızca sayfa üstünü yakalıyor; mobil ve alt bölümler kodla (responsive Tailwind) sağlandı, görselle doğrulanamadı.
- İçerikler placeholder (telefon/e-posta örnek).

## Backlog / Sonraki Adımlar
- P1: Gerçek telefon/e-posta/adres ve gerçek fotoğraflar
- P1: Eğitmen kadrosu fotoğraflarıyla "Eğitmenler" bölümünü geri ekleme
- P2: SSS, fiyat/kayıt bilgisi, WhatsApp butonu
- P2: SEO meta + favicon (logo), Google Maps konumu
