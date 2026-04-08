import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const FloatingCart = ({ onClick }: { onClick: () => void }) => {
  const { itemCount, total } = useCart();

  return (
    <AnimatePresence>
      {itemCount > 0 && (
        <motion.button
          initial={{ scale: 0, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0, y: 20 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClick}
          className="fixed bottom-6 right-6 z-30 bg-primary text-primary-foreground rounded-2xl px-5 py-3.5 shadow-xl flex items-center gap-3 hover:shadow-2xl transition-shadow"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-accent text-accent-foreground text-[10px] font-body font-bold rounded-full flex items-center justify-center">
              {itemCount}
            </span>
          </div>
          <span className="font-body font-bold text-sm">฿{total}</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default FloatingCart;
