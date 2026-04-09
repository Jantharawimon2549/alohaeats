import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { toast } from "sonner";

interface Promotion {
  id: string;
  name: string;
  description: string | null;
  promo_code: string | null;
  discount_type: string;
  discount_value: number;
  min_order: number;
  max_uses: number | null;
  used_count: number;
  is_active: boolean;
  starts_at: string;
  ends_at: string | null;
}

const emptyPromo = { name: "", description: "", promo_code: "", discount_type: "percentage", discount_value: 0, min_order: 0, max_uses: null as number | null, is_active: true };

const AdminPromotions = () => {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<Partial<Promotion> | null>(null);
  const [isNew, setIsNew] = useState(false);

  const { data: promos, isLoading } = useQuery({
    queryKey: ["admin-promotions"],
    queryFn: async () => {
      const { data, error } = await supabase.from("promotions").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as Promotion[];
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (item: Partial<Promotion>) => {
      const payload = {
        name: item.name!,
        description: item.description || null,
        promo_code: item.promo_code || null,
        discount_type: item.discount_type!,
        discount_value: item.discount_value!,
        min_order: item.min_order ?? 0,
        max_uses: item.max_uses || null,
        is_active: item.is_active ?? true,
      };
      if (item.id) {
        const { error } = await supabase.from("promotions").update(payload).eq("id", item.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("promotions").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-promotions"] });
      setEditing(null);
      setIsNew(false);
      toast.success("บันทึกโปรโมชั่นสำเร็จ");
    },
    onError: () => toast.error("เกิดข้อผิดพลาด"),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("promotions").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-promotions"] });
      toast.success("ลบโปรโมชั่นสำเร็จ");
    },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-body font-bold text-lg text-foreground">จัดการโปรโมชั่น</h2>
        <button onClick={() => { setEditing(emptyPromo); setIsNew(true); }}
          className="flex items-center gap-1 bg-primary text-primary-foreground font-body text-sm font-bold px-4 py-2 rounded-lg">
          <Plus className="w-4 h-4" /> เพิ่มโปรโมชั่น
        </button>
      </div>

      {editing && (
        <div className="bg-card border border-border/50 rounded-xl p-4 mb-4">
          <div className="flex justify-between items-center mb-3">
            <span className="font-body font-bold text-foreground">{isNew ? "เพิ่มโปรโมชั่นใหม่" : "แก้ไขโปรโมชั่น"}</span>
            <button onClick={() => { setEditing(null); setIsNew(false); }}><X className="w-5 h-5 text-muted-foreground" /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input placeholder="ชื่อโปรโมชั่น" value={editing.name || ""} onChange={e => setEditing({ ...editing, name: e.target.value })}
              className="font-body text-sm border border-border rounded-lg px-3 py-2 bg-background text-foreground" />
            <input placeholder="โค้ดส่วนลด (เช่น ALOHA20)" value={editing.promo_code || ""} onChange={e => setEditing({ ...editing, promo_code: e.target.value.toUpperCase() })}
              className="font-body text-sm border border-border rounded-lg px-3 py-2 bg-background text-foreground uppercase" />
            <select value={editing.discount_type || "percentage"} onChange={e => setEditing({ ...editing, discount_type: e.target.value })}
              className="font-body text-sm border border-border rounded-lg px-3 py-2 bg-background text-foreground">
              <option value="percentage">ส่วนลด %</option>
              <option value="fixed">ส่วนลดจำนวนเงิน (บาท)</option>
            </select>
            <input type="number" placeholder="มูลค่าส่วนลด" value={editing.discount_value || ""} onChange={e => setEditing({ ...editing, discount_value: Number(e.target.value) })}
              className="font-body text-sm border border-border rounded-lg px-3 py-2 bg-background text-foreground" />
            <input type="number" placeholder="ยอดขั้นต่ำ (บาท)" value={editing.min_order || ""} onChange={e => setEditing({ ...editing, min_order: Number(e.target.value) })}
              className="font-body text-sm border border-border rounded-lg px-3 py-2 bg-background text-foreground" />
            <input type="number" placeholder="จำนวนครั้งสูงสุด (ว่าง=ไม่จำกัด)" value={editing.max_uses ?? ""} onChange={e => setEditing({ ...editing, max_uses: e.target.value ? Number(e.target.value) : null })}
              className="font-body text-sm border border-border rounded-lg px-3 py-2 bg-background text-foreground" />
            <textarea placeholder="คำอธิบาย" value={editing.description || ""} onChange={e => setEditing({ ...editing, description: e.target.value })}
              className="font-body text-sm border border-border rounded-lg px-3 py-2 bg-background text-foreground col-span-full" rows={2} />
            <label className="flex items-center gap-2 font-body text-sm text-foreground">
              <input type="checkbox" checked={editing.is_active ?? true} onChange={e => setEditing({ ...editing, is_active: e.target.checked })} />
              เปิดใช้งาน
            </label>
          </div>
          <button onClick={() => saveMutation.mutate(editing)}
            disabled={!editing.name || !editing.discount_value}
            className="mt-3 bg-primary text-primary-foreground font-body text-sm font-bold px-6 py-2 rounded-lg disabled:opacity-50">
            บันทึก
          </button>
        </div>
      )}

      {isLoading ? (
        <p className="font-body text-muted-foreground text-center py-8">กำลังโหลด...</p>
      ) : !promos?.length ? (
        <p className="font-body text-muted-foreground text-center py-8">ยังไม่มีโปรโมชั่น</p>
      ) : (
        <div className="space-y-2">
          {promos.map(p => (
            <div key={p.id} className="flex items-center justify-between bg-card/80 border border-border/40 rounded-xl p-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-body font-bold text-sm text-foreground">{p.name}</span>
                  {p.promo_code && <span className="font-body text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{p.promo_code}</span>}
                  {!p.is_active && <span className="font-body text-xs bg-destructive/10 text-destructive px-2 py-0.5 rounded-full">ปิดใช้งาน</span>}
                </div>
                <span className="font-body text-xs text-muted-foreground">
                  {p.discount_type === "percentage" ? `${p.discount_value}%` : `฿${p.discount_value}`} ลด
                  {p.min_order > 0 ? ` · ขั้นต่ำ ฿${p.min_order}` : ""}
                  {p.max_uses ? ` · ใช้แล้ว ${p.used_count}/${p.max_uses}` : ""}
                </span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setEditing(p); setIsNew(false); }} className="p-2 hover:bg-muted rounded-lg">
                  <Pencil className="w-4 h-4 text-muted-foreground" />
                </button>
                <button onClick={() => { if (confirm("ลบโปรโมชั่นนี้?")) deleteMutation.mutate(p.id); }} className="p-2 hover:bg-destructive/10 rounded-lg">
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

export default AdminPromotions;
