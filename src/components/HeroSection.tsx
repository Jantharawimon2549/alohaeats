import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const HeroSection = ({ onScrollToMenu }: { onScrollToMenu: () => void }) => {
  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden px-4">
      {/* Animated wave background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-sand/60 to-transparent" />
        <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 120" fill="none">
          <motion.path
            d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,50 1440,60 L1440,120 L0,120 Z"
            fill="hsl(177, 100%, 39%)"
            fillOpacity="0.12"
            animate={{ d: [
              "M0,60 C360,120 720,0 1080,60 C1260,90 1380,50 1440,60 L1440,120 L0,120 Z",
              "M0,80 C360,20 720,100 1080,40 C1260,60 1380,80 1440,50 L1440,120 L0,120 Z",
              "M0,60 C360,120 720,0 1080,60 C1260,90 1380,50 1440,60 L1440,120 L0,120 Z",
            ]}}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path
            d="M0,80 C480,20 960,100 1440,40 L1440,120 L0,120 Z"
            fill="hsl(204, 100%, 37%)"
            fillOpacity="0.08"
            animate={{ d: [
              "M0,80 C480,20 960,100 1440,40 L1440,120 L0,120 Z",
              "M0,50 C480,100 960,20 1440,80 L1440,120 L0,120 Z",
              "M0,80 C480,20 960,100 1440,40 L1440,120 L0,120 Z",
            ]}}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>

      {/* Palm leaf decorative elements */}
      <div className="absolute top-8 right-4 md:right-16 opacity-10 text-7xl md:text-9xl select-none animate-float">🌴</div>
      <div className="absolute top-20 left-4 md:left-16 opacity-8 text-5xl md:text-7xl select-none animate-float" style={{ animationDelay: "1s" }}>🌺</div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl"
      >
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent drop-shadow-sm"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Aloha Bites
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl font-body text-foreground/70 mb-2 font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          🌊 สดจากทะเลฮาวาย ใส่ใจทุกคำ
        </motion.p>
        <motion.p
          className="text-sm md:text-base font-body text-muted-foreground mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          อาหาร · เครื่องดื่ม · ของหวาน — จองล่วงหน้า พร้อมเสิร์ฟเมื่อคุณมาถึง
        </motion.p>
        <motion.button
          onClick={onScrollToMenu}
          className="bg-primary text-primary-foreground font-body font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          🍽️ เริ่มจองเลย
        </motion.button>
      </motion.div>

      <motion.div
        className="absolute bottom-8 cursor-pointer"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        onClick={onScrollToMenu}
      >
        <ChevronDown className="w-8 h-8 text-primary/50" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
