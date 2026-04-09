import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TrendingUp, ShoppingBag, DollarSign, Calendar } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const AdminSalesReport = () => {
  const { data: orders } = useQuery({
    queryKey: ["admin-orders-report"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("id, total, status, created_at, order_type")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });

  const completed = orders?.filter(o => o.status === "completed") || [];
  const today = new Date().toDateString();
  const todayOrders = completed.filter(o => new Date(o.created_at).toDateString() === today);
  const totalRevenue = completed.reduce((s, o) => s + o.total, 0);
  const todayRevenue = todayOrders.reduce((s, o) => s + o.total, 0);

  // Last 7 days chart data
  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const key = d.toDateString();
    const label = d.toLocaleDateString("th-TH", { day: "numeric", month: "short" });
    const dayOrders = completed.filter(o => new Date(o.created_at).toDateString() === key);
    return { label, revenue: dayOrders.reduce((s, o) => s + o.total, 0), count: dayOrders.length };
  });

  const stats = [
    { label: "รายได้วันนี้", value: `฿${todayRevenue.toLocaleString()}`, icon: DollarSign, color: "text-primary" },
    { label: "ออร์เดอร์วันนี้", value: todayOrders.length, icon: ShoppingBag, color: "text-accent" },
    { label: "รายได้รวม", value: `฿${totalRevenue.toLocaleString()}`, icon: TrendingUp, color: "text-secondary" },
    { label: "ออร์เดอร์รวม", value: completed.length, icon: Calendar, color: "text-foreground" },
  ];

  return (
    <div>
      <h2 className="font-body font-bold text-lg text-foreground mb-4">รายงานยอดขาย</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {stats.map(s => (
          <div key={s.label} className="bg-card/90 rounded-xl p-4 border border-border/50">
            <div className="flex items-center gap-2 mb-1">
              <s.icon className={`w-4 h-4 ${s.color}`} />
              <span className="font-body text-xs text-muted-foreground">{s.label}</span>
            </div>
            <p className={`font-body text-xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-card/90 rounded-xl p-4 border border-border/50">
        <h3 className="font-body font-bold text-sm text-foreground mb-3">รายได้ 7 วันล่าสุด</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={last7}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="label" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
            <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
            <Tooltip
              contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontFamily: "var(--font-body)" }}
              formatter={(value: number) => [`฿${value.toLocaleString()}`, "รายได้"]}
            />
            <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminSalesReport;
