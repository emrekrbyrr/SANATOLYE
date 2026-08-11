import { motion } from "framer-motion";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Clock, MapPinned, Copy, Instagram, Globe } from "lucide-react";
import { SCHOOL } from "../data/content";

export const Contact = () => {
  const copy = (text, label) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} kopyalandı!`, { description: text });
  };

  return (
    <section id="iletisim" className="py-20 lg:py-32 bg-ink relative overflow-hidden" data-testid="contact-section">
      <div className="absolute -top-40 -right-40 w-[34rem] h-[34rem] rounded-full bg-gold/15 blur-3xl" />
      <div className="relative px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-xs sm:text-sm uppercase tracking-widest font-semibold text-gold mb-4">
              İletişim
            </p>
            <h2 className="font-display font-semibold tracking-tight text-3xl sm:text-4xl lg:text-5xl text-cream leading-tight">
              Ücretsiz tanışma dersi için <span className="text-gold italic">bize ulaşın.</span>
            </h2>
            <p className="mt-6 text-cream/60 text-lg leading-relaxed max-w-lg">
              Çocuğunuza en uygun sanat dalını birlikte keşfedelim. Bir telefon
              ya da e-posta yeterli — gerisini biz hallederiz.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={`tel:${SCHOOL.phoneHref}`}
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-gold text-ink font-semibold hover:bg-gold-light transition-colors"
                data-testid="call-phone-btn"
              >
                <Phone size={18} /> Hemen Ara
              </a>
              <a
                href={`mailto:${SCHOOL.email}`}
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/10 text-cream font-semibold border border-white/20 hover:bg-white/20 transition-colors"
                data-testid="send-email-btn"
              >
                <Mail size={18} /> E-posta Gönder
              </a>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-8 space-y-5"
            data-testid="contact-card"
          >
            <ContactRow
              icon={<Phone size={20} />}
              label="Telefon"
              value={SCHOOL.phone}
              onCopy={() => copy(SCHOOL.phone, "Telefon")}
              testid="copy-phone-btn"
            />
            <ContactRow
              icon={<Mail size={20} />}
              label="E-posta"
              value={SCHOOL.email}
              onCopy={() => copy(SCHOOL.email, "E-posta")}
              testid="copy-email-btn"
            />
            <ContactRow
              icon={<Globe size={20} />}
              label="Web Sitesi"
              value={SCHOOL.website}
              onCopy={() => copy(SCHOOL.website, "Web sitesi")}
              testid="copy-website-btn"
            />
            <div className="h-px bg-borderlight" />
            <InfoRow icon={<MapPin size={20} />} label="Adres" value={SCHOOL.address} />
            <InfoRow icon={<Clock size={20} />} label="Çalışma Saatleri" value={SCHOOL.hours} />
            <InfoRow icon={<MapPinned size={20} />} label="Ulaşım" value={SCHOOL.transport} />
            <InfoRow icon={<Instagram size={20} />} label="Instagram" value={SCHOOL.instagram} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ContactRow = ({ icon, label, value, onCopy, testid }) => (
  <div className="flex items-center gap-4">
    <span className="grid place-items-center w-12 h-12 rounded-2xl bg-gold/12 text-gold-dark shrink-0">
      {icon}
    </span>
    <div className="min-w-0 flex-1">
      <p className="text-xs uppercase tracking-wider font-semibold text-ink/40">{label}</p>
      <p className="font-display font-bold text-ink text-lg truncate">{value}</p>
    </div>
    <button
      onClick={onCopy}
      className="grid place-items-center w-10 h-10 rounded-xl bg-butter text-ink hover:bg-gold transition-colors shrink-0"
      aria-label={`${label} kopyala`}
      data-testid={testid}
    >
      <Copy size={16} />
    </button>
  </div>
);

const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-start gap-4">
    <span className="grid place-items-center w-12 h-12 rounded-2xl bg-sand text-ink/60 shrink-0">
      {icon}
    </span>
    <div>
      <p className="text-xs uppercase tracking-wider font-semibold text-ink/40">{label}</p>
      <p className="text-ink/80 leading-snug">{value}</p>
    </div>
  </div>
);
