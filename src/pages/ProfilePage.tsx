import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Star, Award, History } from "lucide-react";

const ProfilePage = () => {
  const { user, profile, signOut, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate("/auth");
  }, [user, loading, navigate]);

  const { data: orders } = useQuery({
    queryKey: ["my-orders", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase
        .from("orders")
        .select("*, order_items(*)")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false })
        .limit(10);
      return data || [];
    },
  });

  const { data: loyaltyTxns } = useQuery({
    queryKey: ["my-loyalty", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase
        .from("loyalty_transactions")
        .select("*")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false })
        .limit(20);
      return data || [];
    },
  });

  if (loading || !user) return null;

  const statusLabels: Record<string, string> = {
    pending: "⏳ รอยืนยัน",
    confirmed: "✅ ยืนยันแล้ว",
    preparing: "👨‍🍳 กำลังเตรียม",
    ready: "🔔 พร้อมรับ",
    completed: "✅ เสร็จสิ้น",
    cancelled: "❌ ยกเลิก",
  };

  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 z-30 bg-background/70 backdrop-blur-lg border-b border-border/30">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <Link to="/" className="font-display text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Aloha Bites
          </Link>
          <button onClick={signOut} className="font-body text-sm text-muted-foreground hover:text-destructive">
            ออกจากระบบ
          </button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Profile header */}
        <div className="bg-card/90 rounded-2xl p-6 border border-border/50 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-2xl">
              🌺
            </div>
            <div>
              <h1 className="font-body font-bold text-lg text-foreground">
                {profile?.display_name || user.email}
              </h1>
              <p className="font-body text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Loyalty points */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-6 border border-primary/20 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <Star className="w-6 h-6 text-accent" />
            <h2 className="font-body font-bold text-foreground">Loyalty Points</h2>
          </div>
          <p className="font-body text-3xl font-extrabold text-accent mb-1">
            {profile?.loyalty_points || 0} <span className="text-base font-normal text-muted-foreground">พอยต์</span>
          </p>
          <p className="font-body text-xs text-muted-foreground">
            {(profile?.loyalty_points || 0) >= 5000
              ? "🌊 Ocean VIP — ฟรีเครื่องดื่ม Signature!"
              : (profile?.loyalty_points || 0) >= 1000
              ? "🌺 Aloha Member — แลกของหวานฟรี!"
              : "สะสมพอยต์เพื่อรับสิทธิพิเศษ"}
          </p>
          {loyaltyTxns && loyaltyTxns.length > 0 && (
            <div className="mt-4 space-y-2">
              {loyaltyTxns.slice(0, 5).map((t) => (
                <div key={t.id} className="flex justify-between items-center text-xs font-body">
                  <span className="text-muted-foreground">{t.description}</span>
                  <span className={t.type === "earn" ? "text-primary font-bold" : "text-destructive font-bold"}>
                    {t.type === "earn" ? "+" : "-"}{t.points}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Order history */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <History className="w-5 h-5 text-secondary" />
            <h2 className="font-body font-bold text-foreground">ประวัติการจอง</h2>
          </div>
          {(!orders || orders.length === 0) ? (
            <div className="bg-card/60 rounded-2xl p-8 text-center">
              <Award className="w-12 h-12 mx-auto mb-2 text-muted-foreground/30" />
              <p className="font-body text-sm text-muted-foreground">ยังไม่มีรายการจอง</p>
            </div>
          ) : (
            <div className="space-y-3">
              {orders.map((order) => (
                <div key={order.id} className="bg-card/90 rounded-xl p-4 border border-border/40">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="font-body text-xs text-muted-foreground">
                        {new Date(order.created_at).toLocaleDateString("th-TH", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                      </span>
                      <p className="font-body font-bold text-sm text-foreground">
                        {order.order_type === "dine-in" ? "🍽️ ทานที่ร้าน" : "🥡 กลับบ้าน"}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="font-body text-xs">{statusLabels[order.status] || order.status}</span>
                      <p className="font-body font-bold text-accent">฿{order.total}</p>
                    </div>
                  </div>
                  {order.order_items && (
                    <div className="text-xs font-body text-muted-foreground">
                      {(order.order_items as any[]).map((item: any) => (
                        <span key={item.id} className="mr-2">{item.menu_item_name} x{item.quantity}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
