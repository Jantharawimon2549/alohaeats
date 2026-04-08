import { ShoppingBag, User, Shield } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

const Navbar = ({ onCartClick }: { onCartClick: () => void }) => {
  const { itemCount } = useCart();
  const { user, isAdmin } = useAuth();

  return (
    <nav className="sticky top-0 z-30 bg-background/70 backdrop-blur-lg border-b border-border/30">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="font-display text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Aloha Bites
        </Link>
        <div className="flex items-center gap-2">
          {isAdmin && (
            <Link to="/admin" className="p-2 rounded-full hover:bg-muted transition-colors" title="Admin">
              <Shield className="w-5 h-5 text-accent" />
            </Link>
          )}
          {user ? (
            <Link to="/profile" className="p-2 rounded-full hover:bg-muted transition-colors">
              <User className="w-5 h-5 text-foreground" />
            </Link>
          ) : (
            <Link to="/auth" className="font-body text-sm font-semibold text-primary hover:underline px-3 py-1.5">
              เข้าสู่ระบบ
            </Link>
          )}
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
      </div>
    </nav>
  );
};

export default Navbar;
