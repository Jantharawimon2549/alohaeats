import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Users, Star, ShoppingBag } from "lucide-react";

const AdminMembers = () => {
  const { data: profiles, isLoading } = useQuery({
    queryKey: ["admin-members"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });

  const { data: orderCounts } = useQuery({
    queryKey: ["admin-member-orders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("user_id, total, status");
      if (error) throw error;
      const map: Record<string, { count: number; total: number }> = {};
      data?.forEach(o => {
        if (!o.user_id) return;
        if (!map[o.user_id]) map[o.user_id] = { count: 0, total: 0 };
        map[o.user_id].count++;
        if (o.status === "completed") map[o.user_id].total += o.total;
      });
      return map;
    },
  });

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Users className="w-5 h-5 text-primary" />
        <h2 className="font-body font-bold text-lg text-foreground">จัดการสมาชิก</h2>
        <span className="font-body text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{profiles?.length || 0} คน</span>
      </div>

      {isLoading ? (
        <p className="font-body text-muted-foreground text-center py-8">กำลังโหลด...</p>
      ) : !profiles?.length ? (
        <p className="font-body text-muted-foreground text-center py-8">ยังไม่มีสมาชิก</p>
      ) : (
        <div className="space-y-2">
          {profiles.map(p => {
            const stats = orderCounts?.[p.user_id] || { count: 0, total: 0 };
            return (
              <div key={p.id} className="flex items-center justify-between bg-card/80 border border-border/40 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-body font-bold text-sm">
                    {(p.display_name || "?")[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="font-body font-bold text-sm text-foreground">{p.display_name || "ไม่ระบุชื่อ"}</p>
                    <p className="font-body text-xs text-muted-foreground">
                      สมัครเมื่อ {new Date(p.created_at).toLocaleDateString("th-TH", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-right">
                  <div>
                    <div className="flex items-center gap-1 justify-end">
                      <Star className="w-3 h-3 text-accent" />
                      <span className="font-body text-sm font-bold text-accent">{p.loyalty_points}</span>
                    </div>
                    <span className="font-body text-xs text-muted-foreground">คะแนน</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 justify-end">
                      <ShoppingBag className="w-3 h-3 text-primary" />
                      <span className="font-body text-sm font-bold text-foreground">{stats.count}</span>
                    </div>
                    <span className="font-body text-xs text-muted-foreground">ออร์เดอร์</span>
                  </div>
                  <div>
                    <span className="font-body text-sm font-bold text-primary">฿{stats.total.toLocaleString()}</span>
                    <br />
                    <span className="font-body text-xs text-muted-foreground">ยอดรวม</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminMembers;
