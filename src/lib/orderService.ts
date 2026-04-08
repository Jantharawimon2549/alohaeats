import { supabase } from "@/integrations/supabase/client";
import type { CartItem } from "@/data/menuData";

interface CreateOrderParams {
  userId: string | null;
  guestName?: string;
  guestPhone?: string;
  orderType: "dine-in" | "takeaway";
  items: CartItem[];
  promoCode: string;
  subtotal: number;
  discount: number;
  total: number;
  pickupTime?: string;
  notes?: string;
}

export const createOrder = async (params: CreateOrderParams) => {
  // Create order
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: params.userId,
      guest_name: params.guestName,
      guest_phone: params.guestPhone,
      order_type: params.orderType as any,
      promo_code: params.promoCode || null,
      subtotal: params.subtotal,
      discount: params.discount,
      total: params.total,
      pickup_time: params.pickupTime,
      notes: params.notes,
    })
    .select()
    .single();

  if (orderError) throw orderError;

  // Create order items
  const orderItems = params.items.map((item) => ({
    order_id: order.id,
    menu_item_id: item.id,
    menu_item_name: item.name,
    quantity: item.quantity,
    unit_price: item.price,
    total_price: item.price * item.quantity,
    notes: item.notes,
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems);

  if (itemsError) throw itemsError;

  // Award loyalty points (1 baht = 1 point) if logged in
  if (params.userId) {
    const points = params.total;
    await supabase.from("loyalty_transactions").insert({
      user_id: params.userId,
      order_id: order.id,
      points,
      type: "earn" as any,
      description: `ได้รับ ${points} พอยต์จากออร์เดอร์`,
    });

    // Update profile points
    const { data: profile } = await supabase
      .from("profiles")
      .select("loyalty_points")
      .eq("user_id", params.userId)
      .single();

    if (profile) {
      await supabase
        .from("profiles")
        .update({ loyalty_points: profile.loyalty_points + points })
        .eq("user_id", params.userId);
    }
  }

  return order;
};
