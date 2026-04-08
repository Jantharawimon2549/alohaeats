import { motion } from "framer-motion";
import { Plus, Clock } from "lucide-react";
import type { MenuItem, Badge } from "@/data/menuData";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

const badgeStyles: Record<Badge, string> = {
  hot: "bg-accent text-accent-foreground",
  new: "bg-secondary text-secondary-foreground",
  vegan: "bg-emerald-500/90 text-primary-foreground",
  bestseller: "bg-primary text-primary-foreground",
};

const badgeLabels: Record<Badge, string> = {
  hot: "🔥 Hot",
  new: "✨ New",
  vegan: "🌱 Vegan",
  bestseller: "⭐ Best",
};

const MenuCard = ({ item }: { item: MenuItem }) => {
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem(item);
    toast.success(`เพิ่ม ${item.name} ลงตะกร้าแล้ว 🛒`);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      className="bg-card/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-border/40 group"
    >
      <div className="relative overflow-hidden aspect-square">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          width={512}
          height={512}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
          {item.badges.map((badge) => (
            <span
              key={badge}
              className={`text-[10px] font-body font-bold px-2 py-0.5 rounded-full ${badgeStyles[badge]}`}
            >
              {badgeLabels[badge]}
            </span>
          ))}
        </div>
        {/* Quick add button */}
        <motion.button
          onClick={handleAdd}
          whileTap={{ scale: 0.9 }}
          className="absolute bottom-3 right-3 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Plus className="w-5 h-5" />
        </motion.button>
      </div>
      <div className="p-4">
        <h3 className="font-body font-bold text-foreground text-sm leading-tight mb-0.5">
          {item.name}
        </h3>
        <p className="font-body text-muted-foreground text-xs leading-snug mb-3 line-clamp-2">
          {item.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="font-body font-extrabold text-accent text-lg">
            ฿{item.price}
          </span>
          <span className="flex items-center gap-1 text-muted-foreground text-xs font-body">
            <Clock className="w-3 h-3" />
            {item.prepTime} นาที
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default MenuCard;
