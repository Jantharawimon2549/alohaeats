import { ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const Navbar = ({ onCartClick }: { onCartClick: () => void }) => {
  const { itemCount } = useCart();

  return (
    <nav className="sticky top-0 z-30 bg-background/70 backdrop-blur-lg border-b border-border/30">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <h1 className="font-display text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Aloha Bites
        </h1>
        <button
          onClick={onCartClick}
          className="relative p-2 rounded-full hover:bg-muted transition-colors"
        >
          <ShoppingBag className="w-5 h-5 text-foreground" />
          {itemCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-accent text-accent-foreground text-[10px] font-body font-bold rounded-full flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
