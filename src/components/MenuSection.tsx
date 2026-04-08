import { useState, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { menuItems, type MenuCategory } from "@/data/menuData";
import MenuCard from "./MenuCard";
import { UtensilsCrossed, GlassWater, IceCreamCone } from "lucide-react";

const tabs: { key: MenuCategory; label: string; icon: React.ReactNode }[] = [
  { key: "food", label: "อาหาร", icon: <UtensilsCrossed className="w-4 h-4" /> },
  { key: "drink", label: "เครื่องดื่ม", icon: <GlassWater className="w-4 h-4" /> },
  { key: "dessert", label: "ของหวาน", icon: <IceCreamCone className="w-4 h-4" /> },
];

const MenuSection = forwardRef<HTMLElement>((_, ref) => {
  const [active, setActive] = useState<MenuCategory>("food");
  const [filter, setFilter] = useState<string>("all");

  const filtered = menuItems
    .filter((i) => i.category === active)
    .filter((i) => filter === "all" || i.tags.includes(filter));

  const tagOptions = active === "food"
    ? [{ key: "all", label: "ทั้งหมด" }, { key: "seafood", label: "🦐 ทะเล" }, { key: "meat", label: "🥩 เนื้อ" }]
    : active === "drink"
    ? [{ key: "all", label: "ทั้งหมด" }, { key: "vegan", label: "🌱 Vegan" }]
    : [{ key: "all", label: "ทั้งหมด" }, { key: "vegan", label: "🌱 Vegan" }];

  return (
    <section ref={ref} className="py-10 px-4" id="menu">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl text-center mb-8 bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
          เมนูของเรา
        </h2>

        {/* Category tabs */}
        <div className="flex justify-center gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => { setActive(tab.key); setFilter("all"); }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-body font-bold text-sm transition-all ${
                active === tab.key
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card/70 text-muted-foreground hover:bg-card border border-border/50"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Filter tags */}
        <div className="flex justify-center gap-2 mb-8">
          {tagOptions.map((tag) => (
            <button
              key={tag.key}
              onClick={() => setFilter(tag.key)}
              className={`px-4 py-1.5 rounded-full font-body text-xs font-semibold transition-all ${
                filter === tag.key
                  ? "bg-accent/20 text-accent border border-accent/30"
                  : "bg-card/50 text-muted-foreground hover:bg-card/80 border border-border/30"
              }`}
            >
              {tag.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active + filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {filtered.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
});

MenuSection.displayName = "MenuSection";

export default MenuSection;
