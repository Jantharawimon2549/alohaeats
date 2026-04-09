import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Clock, Check, ChefHat, Bell, X } from "lucide-react";
import { toast } from "sonner";

type OrderStatus = "pending" | "confirmed" | "preparing" | "ready" | "completed" | "cancelled";

const statusConfig: Record<OrderStatus, { label: string; icon: React.ReactNode; color: string }> = {
  pending: { label: "รอยืนยัน", icon: <Clock className="w-4 h-4" />, color: "bg-yellow-100 text-yellow-800" },
  confirmed: { label: "ยืนยันแล้ว", icon: <Check className="w-4 h-4" />, color: "bg-blue-100 text-blue-800" },
  preparing: { label: "กำลังเตรียม", icon: <ChefHat className="w-4 h-4" />, color: "bg-purple-100 text-purple-800" },
  ready: { label: "พร้อมรับ", icon: <Bell className="w-4 h-4" />, color: "bg-green-100 text-green-800" },
  completed: { label: "เสร็จสิ้น", icon: <Check className="w-4 h-4" />, color: "bg-muted text-muted-foreground" },
  cancelled: { label: "ยกเลิก", icon: <X className="w-4 h-4" />, color: "bg-red-100 text-red-800" },
};

const nextStatus: Partial<Record<OrderStatus, OrderStatus>> = {
  pending: "confirmed",
  confirmed: "preparing",
  preparing: "ready",
  ready: "completed",
};

const AdminOrdersList = () => {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<OrderStatus | "all">("all");

  const { data: orders, isLoading } = useQuery({
    queryKey: ["admin-orders"],
    refetchInterval: 10000,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*, order_items(*), profiles!orders_user_id_fkey(display_name)")
        .order("created_at", { ascending: false })
        .limit(50);
      if (error) throw error;
      return data || [];
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: OrderStatus }) => {
      const { error } = await supabase.from("orders").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
      toast.success("อัปเดตสถานะสำเร็จ");
    },
  });

  const filtered = orders?.filter((o) => filter === "all" || o.status === filter) || [];

  return (
    <div>
      {/* Filter */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        <button onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-full font-body text-xs font-bold whitespace-nowrap ${filter === "all" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
          ทั้งหมด ({orders?.length || 0})
        </button>
        {(Object.keys(statusConfig) as OrderStatus[]).map((s) => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-full font-body text-xs font-bold whitespace-nowrap ${filter === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
            {statusConfig[s].label} ({orders?.filter((o) => o.status === s).length || 0})
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="text-center py-12 font-body text-muted-foreground">กำลังโหลด...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 font-body text-muted-foreground">ไม่มีออร์เดอร์</div>
      ) : (
        <div className="space-y-3">
          {filtered.map((order) => {
            const status = order.status as OrderStatus;
            const config = statusConfig[status];
            const next = nextStatus[status];
            return (
              <div key={order.id} className="bg-card/90 rounded-xl p-4 border border-border/40">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`flex items-center gap-1 text-xs font-body font-bold px-2 py-0.5 rounded-full ${config.color}`}>
                        {config.icon} {config.label}
                      </span>
                      <span className="font-body text-xs text-muted-foreground">
                        {order.order_type === "dine-in" ? "🍽️ ทานที่ร้าน" : "🥡 กลับบ้าน"}
                      </span>
                    </div>
                    <p className="font-body font-bold text-sm text-foreground">
                      {(order as any).profiles?.display_name || order.guest_name || "Guest"}
                    </p>
                    <p className="font-body text-xs text-muted-foreground">
                      {new Date(order.created_at).toLocaleString("th-TH", { hour: "2-digit", minute: "2-digit", day: "numeric", month: "short" })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-body font-bold text-lg text-accent">฿{order.total}</p>
                    {order.discount > 0 && <p className="font-body text-xs text-primary">ส่วนลด ฿{order.discount}</p>}
                  </div>
                </div>
                <div className="bg-muted/50 rounded-lg p-3 mb-3">
                  {(order.order_items as any[])?.map((item: any) => (
                    <div key={item.id} className="flex justify-between font-body text-xs mb-1">
                      <span className="text-foreground">{item.menu_item_name} x{item.quantity}</span>
                      <span className="text-muted-foreground">฿{item.total_price}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  {next && (
                    <button onClick={() => updateStatus.mutate({ id: order.id, status: next })}
                      className="flex-1 bg-primary text-primary-foreground font-body font-bold text-sm py-2 rounded-lg hover:opacity-90">
                      → {statusConfig[next].label}
                    </button>
                  )}
                  {status !== "cancelled" && status !== "completed" && (
                    <button onClick={() => updateStatus.mutate({ id: order.id, status: "cancelled" })}
                      className="px-4 py-2 bg-destructive/10 text-destructive font-body text-sm font-bold rounded-lg hover:bg-destructive/20">
                      ยกเลิก
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminOrdersList;
