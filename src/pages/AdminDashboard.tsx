import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Package, UtensilsCrossed, Tag, BarChart3, Users } from "lucide-react";
import AdminOrdersList from "@/components/admin/AdminOrdersList";
import AdminMenuManager from "@/components/admin/AdminMenuManager";
import AdminPromotions from "@/components/admin/AdminPromotions";
import AdminSalesReport from "@/components/admin/AdminSalesReport";
import AdminMembers from "@/components/admin/AdminMembers";

type Tab = "orders" | "menu" | "promotions" | "reports" | "members";

const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
  { key: "orders", label: "ออร์เดอร์", icon: <Package className="w-4 h-4" /> },
  { key: "menu", label: "เมนู", icon: <UtensilsCrossed className="w-4 h-4" /> },
  { key: "promotions", label: "โปรโมชั่น", icon: <Tag className="w-4 h-4" /> },
  { key: "reports", label: "รายงาน", icon: <BarChart3 className="w-4 h-4" /> },
  { key: "members", label: "สมาชิก", icon: <Users className="w-4 h-4" /> },
];

const AdminDashboard = () => {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("orders");

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) navigate("/");
  }, [user, isAdmin, loading, navigate]);

  if (loading || !isAdmin) return null;

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-30 bg-background/70 backdrop-blur-lg border-b border-border/30">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Link to="/" className="font-display text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Aloha Bites
            </Link>
            <span className="bg-accent/20 text-accent font-body text-xs font-bold px-2 py-1 rounded-full">Admin</span>
          </div>
          <Link to="/" className="font-body text-sm text-muted-foreground hover:text-primary">
            ← กลับหน้าร้าน
          </Link>
        </div>
      </nav>

      {/* Tab Navigation */}
      <div className="border-b border-border/30 bg-background/50 backdrop-blur-sm sticky top-[57px] z-20">
        <div className="container mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-2">
            {tabs.map(t => (
              <button key={t.key} onClick={() => setActiveTab(t.key)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-body text-sm font-bold whitespace-nowrap transition-colors ${
                  activeTab === t.key
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}>
                {t.icon} {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {activeTab === "orders" && <AdminOrdersList />}
        {activeTab === "menu" && <AdminMenuManager />}
        {activeTab === "promotions" && <AdminPromotions />}
        {activeTab === "reports" && <AdminSalesReport />}
        {activeTab === "members" && <AdminMembers />}
      </div>
    </div>
  );
};

export default AdminDashboard;
