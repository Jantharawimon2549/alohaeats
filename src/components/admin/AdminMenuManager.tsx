import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { toast } from "sonner";

interface MenuItem {
  id: string;
  name: string;
  description: string | null;
  category: string;
  price: number;
  image_url: string | null;
  badge: string | null;
  is_available: boolean;
  sort_order: number;
}

const emptyItem = { name: "", description: "", category: "food", price: 0, image_url: "", badge: "", is_available: true, sort_order: 0 };

const AdminMenuManager = () => {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<Partial<MenuItem> | null>(null);
  const [isNew, setIsNew] = useState(false);

  const { data: items, isLoading } = useQuery({
    queryKey: ["admin-menu-items"],
    queryFn: async () => {
      const { data, error } = await supabase.from("menu_items").select("*").order("sort_order");
      if (error) throw error;
      return data as MenuItem[];
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (item: Partial<MenuItem>) => {
      const payload = {
        name: item.name!,
        description: item.description || null,
        category: item.category!,
        price: item.price!,
        image_url: item.image_url || null,
        badge: item.badge || null,
        is_available: item.is_available ?? true,
        sort_order: item.sort_order ?? 0,
      };
      if (item.id) {
        const { error } = await supabase.from("menu_items").update(payload).eq("id", item.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("menu_items").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-menu-items"] });
      setEditing(null);
      setIsNew(false);
      toast.success("บันทึกเมนูสำเร็จ");
    },
    onError: () => toast.error("เกิดข้อผิดพลาด"),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("menu_items").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-menu-items"] });
      toast.success("ลบเมนูสำเร็จ");
    },
  });

  const categories = { food: "🍽️ อาหาร", drink: "🥤 เครื่องดื่ม", dessert: "🍰 ของหวาน" };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-body font-bold text-lg text-foreground">จัดการเมนู</h2>
        <button
          onClick={() => { setEditing(emptyItem); setIsNew(true); }}
          className="flex items-center gap-1 bg-primary text-primary-foreground font-body text-sm font-bold px-4 py-2 rounded-lg"
        >
          <Plus className="w-4 h-4" /> เพิ่มเมนู
        </button>
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="bg-card border border-border/50 rounded-xl p-4 mb-4">
          <div className="flex justify-between items-center mb-3">
            <span className="font-body font-bold text-foreground">{isNew ? "เพิ่มเมนูใหม่" : "แก้ไขเมนู"}</span>
            <button onClick={() => { setEditing(null); setIsNew(false); }}><X className="w-5 h-5 text-muted-foreground" /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input placeholder="ชื่อเมนู" value={editing.name || ""} onChange={e => setEditing({ ...editing, name: e.target.value })}
              className="font-body text-sm border border-border rounded-lg px-3 py-2 bg-background text-foreground" />
            <select value={editing.category || "food"} onChange={e => setEditing({ ...editing, category: e.target.value })}
              className="font-body text-sm border border-border rounded-lg px-3 py-2 bg-background text-foreground">
              <option value="food">อาหาร</option>
              <option value="drink">เครื่องดื่ม</option>
              <option value="dessert">ของหวาน</option>
            </select>
            <input type="number" placeholder="ราคา (บาท)" value={editing.price || ""} onChange={e => setEditing({ ...editing, price: Number(e.target.value) })}
              className="font-body text-sm border border-border rounded-lg px-3 py-2 bg-background text-foreground" />
            <input placeholder="Badge (เช่น ขายดี, ใหม่)" value={editing.badge || ""} onChange={e => setEditing({ ...editing, badge: e.target.value })}
              className="font-body text-sm border border-border rounded-lg px-3 py-2 bg-background text-foreground" />
            <input placeholder="URL รูปภาพ" value={editing.image_url || ""} onChange={e => setEditing({ ...editing, image_url: e.target.value })}
              className="font-body text-sm border border-border rounded-lg px-3 py-2 bg-background text-foreground col-span-full" />
            <textarea placeholder="คำอธิบาย" value={editing.description || ""} onChange={e => setEditing({ ...editing, description: e.target.value })}
              className="font-body text-sm border border-border rounded-lg px-3 py-2 bg-background text-foreground col-span-full" rows={2} />
            <label className="flex items-center gap-2 font-body text-sm text-foreground">
              <input type="checkbox" checked={editing.is_available ?? true} onChange={e => setEditing({ ...editing, is_available: e.target.checked })} />
              เปิดขาย
            </label>
          </div>
          <button onClick={() => saveMutation.mutate(editing)}
            disabled={!editing.name || !editing.price}
            className="mt-3 bg-primary text-primary-foreground font-body text-sm font-bold px-6 py-2 rounded-lg disabled:opacity-50">
            บันทึก
          </button>
        </div>
      )}

      {/* List */}
      {isLoading ? (
        <p className="font-body text-muted-foreground text-center py-8">กำลังโหลด...</p>
      ) : !items?.length ? (
        <p className="font-body text-muted-foreground text-center py-8">ยังไม่มีเมนู กดเพิ่มเมนูใหม่ได้เลย</p>
      ) : (
        <div className="space-y-2">
          {items.map(item => (
            <div key={item.id} className="flex items-center justify-between bg-card/80 border border-border/40 rounded-xl p-3">
              <div className="flex items-center gap-3">
                {item.image_url && <img src={item.image_url} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-body font-bold text-sm text-foreground">{item.name}</span>
                    {item.badge && <span className="font-body text-xs bg-accent/20 text-accent px-2 py-0.5 rounded-full">{item.badge}</span>}
                    {!item.is_available && <span className="font-body text-xs bg-destructive/10 text-destructive px-2 py-0.5 rounded-full">ปิดขาย</span>}
                  </div>
                  <span className="font-body text-xs text-muted-foreground">
                    {categories[item.category as keyof typeof categories]} · ฿{item.price}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setEditing(item); setIsNew(false); }} className="p-2 hover:bg-muted rounded-lg">
                  <Pencil className="w-4 h-4 text-muted-foreground" />
                </button>
                <button onClick={() => { if (confirm("ลบเมนูนี้?")) deleteMutation.mutate(item.id); }} className="p-2 hover:bg-destructive/10 rounded-lg">
                  <Trash2 className="w-4 h-4 text-destructive" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminMenuManager;
