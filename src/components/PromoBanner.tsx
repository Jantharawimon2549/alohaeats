import { motion } from "framer-motion";
import { promotions } from "@/data/menuData";

const PromoBanner = () => {
  return (
    <section className="py-8 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl text-center mb-6 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
          โปรโมชั่น
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {promotions.map((promo, i) => (
            <motion.div
              key={promo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card/80 backdrop-blur-sm rounded-2xl p-5 border border-border/50 shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-body font-bold text-foreground text-base mb-1">{promo.title}</h3>
              <p className="font-body text-muted-foreground text-sm mb-3">{promo.description}</p>
              <div className="inline-block bg-primary/10 text-primary font-body font-bold text-xs px-3 py-1 rounded-full">
                Code: {promo.code}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
