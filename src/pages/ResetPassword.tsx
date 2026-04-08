import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      toast.success("เปลี่ยนรหัสผ่านสำเร็จ!");
      navigate("/");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-card/90 backdrop-blur-sm rounded-2xl p-6 border border-border/50">
        <h1 className="font-display text-2xl text-primary text-center mb-6">ตั้งรหัสผ่านใหม่</h1>
        <form onSubmit={handleReset} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="รหัสผ่านใหม่"
            required
            minLength={6}
            className="w-full bg-muted rounded-xl py-3 px-4 font-body text-sm outline-none focus:ring-2 focus:ring-primary/30"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground font-body font-bold py-3 rounded-xl"
          >
            {loading ? "กำลังดำเนินการ..." : "ยืนยัน"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
