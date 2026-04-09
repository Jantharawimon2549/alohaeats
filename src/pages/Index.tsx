import { useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PromoBanner from "@/components/PromoBanner";
import MenuSection from "@/components/MenuSection";
import FloatingCart from "@/components/FloatingCart";
import CartDrawer from "@/components/CartDrawer";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  const menuRef = useRef<HTMLElement>(null);
  const [cartOpen, setCartOpen] = useState(false);

  const scrollToMenu = () => {
    menuRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      <Navbar onCartClick={() => setCartOpen(true)} />
      <HeroSection onScrollToMenu={scrollToMenu} />
      <PromoBanner />
      <MenuSection ref={menuRef} />
      <ContactSection />

      {/* Footer */}
      <footer className="py-8 text-center border-t border-border/30">
        <p className="font-display text-xl text-primary/60 mb-1">Aloha Bites</p>
        <p className="font-body text-xs text-muted-foreground">
          © 2026 Aloha Bites — สดจากทะเลฮาวาย ใส่ใจทุกคำ 🌺
        </p>
      </footer>

      <FloatingCart onClick={() => setCartOpen(true)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
};

export default Index;
