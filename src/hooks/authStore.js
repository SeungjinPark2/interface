import axios from "axios";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  token: null,
  login: async (id, password) => {
    // 로그인 API 호출
    const response = await axios.post(
      "/api/login",
      { id, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (response.ok) {
      set({ token: data.token });
    } else {
      throw new Error("Login failed");
    }
  },
  logout: () => set({ token: null }),
}));
