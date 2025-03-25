import { CartItem } from "@/types";
import { create } from "zustand";
import { api } from "@/utils/api";

interface CartState {
  cartItems: CartItem[];
  couponCode: string | null;
  fetchCart: () => Promise<void>;
  addToCart: (newItem: CartItem) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, newQuantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  applyCoupon: (code: string) => Promise<void>;
  removeCoupon: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getTax: () => number;
  getShippingFee: () => number;
  getTotalAmount: () => number;
}

const useCartStore = create<CartState>((set, get) => {
  const fetchCart = async () => {
    try {
      const res = await api.get<any>("/cart");
      if (!res.metadata) throw new Error("Failed to fetch cart");
      const data = res.metadata;
      set({ cartItems: data.items });
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  setTimeout(() => {
    fetchCart();
  }, 0);

  return {
    cartItems: [],
    couponCode: null,
    fetchCart,
    addToCart: async (newItem: CartItem) => {
      try {
        const res = await api.post<any>(`cart/addToCart`, newItem);
        if (res.status !== 200) throw new Error("Failed to add item");
        await get().fetchCart();
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    },
    removeFromCart: async (itemId: string) => {
      try {
        console.log({productId:itemId});
        
        const res = await api.del<any>(`cart/RemoveItem/`,{productId:itemId});
        if (!res.metadata) throw new Error("Failed to remove item");
        await get().fetchCart();
      } catch (error) {
        console.error("Error removing from cart:", error);
      }
    },
    updateQuantity: async (itemId: string,newQuantity: number) => {
      try {
        const res = await api.post<any>(`/cart/UpdateItem`,{
          productId:itemId,
          quantity:newQuantity
        });
        if (!res.metadata) throw new Error("Failed to update quantity");
        await get().fetchCart();
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    },
    clearCart: async () => {
      try {
        const res = await fetch(`/clear`, { method: "DELETE" });
        if (!res.ok) throw new Error("Failed to clear cart");
        set({ cartItems: [], couponCode: null });
      } catch (error) {
        console.error("Error clearing cart:", error);
      }
    },
    applyCoupon: async (code: string) => {
      try {
        const res = await fetch(`/apply-coupon`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        });
        if (!res.ok) throw new Error("Invalid coupon");
        set({ couponCode: code });
      } catch (error) {
        console.error("Error applying coupon:", error);
      }
    },
    removeCoupon: () => {
      set({ couponCode: null });
    },
    getTotalItems: () => get().cartItems?.length,
    getTotalPrice: () => get().cartItems?.reduce((acc, item) => acc + (item?.price ?? 1) * item.quantity, 0),
    getTax: () => get().getTotalPrice() * 0.1,
    getShippingFee: () => 5,
    getTotalAmount: () => get().getTotalPrice() + get().getTax() + get().getShippingFee(),
  };
});

export default useCartStore;
