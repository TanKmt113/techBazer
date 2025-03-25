import { create } from "zustand";
import { api } from "@/utils/api";
import { Banner } from "@/types";

interface BannerState {
  bannerItems: Banner[];
  getBanner: () => Promise<void>;
}

const useBannerStore = create<BannerState>((set) => {
  // Hàm lấy dữ liệu banner
  const getBanner = async () => {
    try {
      const res = await api.get<{ metadata?: Banner[]}>("/branners");
      if (!res.metadata) throw new Error("Failed to fetch banners");

      set({ bannerItems: res.metadata });
    } catch (error) {
      console.error("Error fetching banners:", error);
    }
  };

  setTimeout(() => {
    getBanner();
  }, 0);

  return {
    bannerItems: [],
    getBanner,
  };
});

export default useBannerStore;
