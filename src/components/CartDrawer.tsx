import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, Trash2, Tag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { toast } from "sonner";
import { createOrder } from "@/lib/orderService";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

const CartDrawer = ({ open, onClose }: CartDrawerProps) => {
  const { items, updateQuantity, removeItem, clearCart, total, discount, promoCode, setPromoCode, orderType, setOrderType } = useCart();
  const { user } = useAuth();
  const [codeInput, setCodeInput] = useState("");
  const [ordering, setOrdering] = useState(false);

  const applyCode = () => {
    setPromoCode(codeInput);
    if (codeInput) toast.success("ใช้โค้ดส่วนลดแล้ว! 🎉");
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/30 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-background border-l border-border z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h2 className="font-display text-2xl text-primary">ตะกร้า</h2>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-muted transition-colors">
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Order type */}
            <div className="flex gap-2 px-5 pt-4">
              {(["dine-in", "takeaway"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setOrderType(t)}
                  className={`flex-1 py-2 rounded-xl font-body font-bold text-sm transition-all ${
                    orderType === t
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {t === "dine-in" ? "🍽️ ทานที่ร้าน" : "🥡 สั่งกลับบ้าน"}
                </button>
              ))}
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {items.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                  <ShoppingBag className="w-16 h-16 mb-3 opacity-30" />
                  <p className="font-body">ยังไม่มีรายการ</p>
                </div>
              )}
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  className="flex gap-3 bg-card rounded-xl p-3 border border-border/40"
                >
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-body font-bold text-sm text-foreground truncate">{item.name}</h4>
                    <p className="font-body text-accent font-bold text-sm">฿{item.price}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-body font-bold text-sm w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <span className="font-body font-bold text-foreground text-sm">
                      ฿{item.price * item.quantity}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Promo code */}
            {items.length > 0 && (
              <div className="px-5 pb-3">
                <div className="flex gap-2">
                  <div className="flex-1 flex items-center gap-2 bg-muted rounded-xl px-3">
                    <Tag className="w-4 h-4 text-muted-foreground" />
                    <input
                      value={codeInput}
                      onChange={(e) => setCodeInput(e.target.value)}
                      placeholder="โค้ดส่วนลด"
                      className="bg-transparent font-body text-sm py-2 flex-1 outline-none text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <button
                    onClick={applyCode}
                    className="bg-accent text-accent-foreground font-body font-bold text-sm px-4 rounded-xl hover:opacity-90"
                  >
                    ใช้
                  </button>
                </div>
                {promoCode && discount > 0 && (
                  <p className="font-body text-xs text-primary mt-1">✅ ส่วนลด ฿{discount}</p>
                )}
              </div>
            )}

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border p-5 space-y-3">
                {discount > 0 && (
                  <div className="flex justify-between font-body text-sm text-primary">
                    <span>ส่วนลด</span>
                    <span>-฿{discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="font-body font-bold text-foreground">รวมทั้งหมด</span>
                  <span className="font-body font-extrabold text-xl text-accent">฿{total}</span>
                </div>
                <button
                  className="w-full bg-primary text-primary-foreground font-body font-bold py-3.5 rounded-xl text-base shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                  disabled={ordering}
                  onClick={async () => {
                    setOrdering(true);
                    try {
                      const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
                      await createOrder({
                        userId: user?.id || null,
                        orderType: orderType as "dine-in" | "takeaway",
                        items,
                        promoCode,
                        subtotal,
                        discount,
                        total,
                      });
                      toast.success("🎉 ส่งออร์เดอร์สำเร็จ! ขอบคุณครับ");
                      clearCart();
                      onClose();
                    } catch (err: any) {
                      toast.error(err.message || "เกิดข้อผิดพลาด");
                    } finally {
                      setOrdering(false);
                    }
                  }}
                >
                  {ordering ? "กำลังส่งออร์เดอร์..." : "สั่งเลย 🌺"}
                </button>
                <button
                  onClick={clearCart}
                  className="w-full font-body text-sm text-muted-foreground hover:text-destructive transition-colors"
                >
                  ล้างตะกร้า
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
