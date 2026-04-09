import { Phone, MessageCircle, Clock, MapPin } from "lucide-react";

const ContactSection = () => {
  return (
    <section className="py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="font-display text-3xl md:text-4xl text-center text-primary mb-2">
          ติดต่อเรา
        </h2>
        <p className="font-body text-center text-muted-foreground mb-8">
          สอบถามเมนู จองโต๊ะ หรือสั่งล่วงหน้า 🌺
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* LINE */}
          <a
            href="https://line.me/R/ti/p/@alohabites"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-card/80 backdrop-blur-sm rounded-2xl p-5 border border-border/40 hover:border-primary/50 hover:shadow-lg transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-[#06C755]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <MessageCircle className="w-6 h-6 text-[#06C755]" />
            </div>
            <div>
              <p className="font-body font-bold text-foreground">LINE Official</p>
              <p className="font-body text-sm text-muted-foreground">@alohabites</p>
              <p className="font-body text-xs text-primary mt-1">แชทสอบถาม / จองโต๊ะ</p>
            </div>
          </a>

          {/* Phone */}
          <a
            href="tel:+66812345678"
            className="flex items-center gap-4 bg-card/80 backdrop-blur-sm rounded-2xl p-5 border border-border/40 hover:border-primary/50 hover:shadow-lg transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Phone className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="font-body font-bold text-foreground">โทรศัพท์</p>
              <p className="font-body text-sm text-muted-foreground">081-234-5678</p>
              <p className="font-body text-xs text-primary mt-1">โทรสั่งหรือจองล่วงหน้า</p>
            </div>
          </a>

          {/* Hours */}
          <div className="flex items-center gap-4 bg-card/80 backdrop-blur-sm rounded-2xl p-5 border border-border/40">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
              <Clock className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="font-body font-bold text-foreground">เวลาเปิด-ปิด</p>
              <p className="font-body text-sm text-muted-foreground">จันทร์ - อาทิตย์</p>
              <p className="font-body text-xs text-accent mt-1">10:00 - 21:00 น.</p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-4 bg-card/80 backdrop-blur-sm rounded-2xl p-5 border border-border/40">
            <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <p className="font-body font-bold text-foreground">ที่ตั้งร้าน</p>
              <p className="font-body text-sm text-muted-foreground">123 ถ.ริมชายหาด</p>
              <p className="font-body text-xs text-secondary mt-1">ใกล้หาดพัทยาเหนือ</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
