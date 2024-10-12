import axios, { HttpStatusCode } from "axios";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  token: null,
  login: async (id, password) => {
    // 로그인 API 호출
    const { status, data } = await axios.post(
      "/api/login",
      { username: id, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (status == HttpStatusCode.Ok) {
      set({ token: data.token });
    } else {
      throw new Error("Login failed");
    }
  },
  signup: async (id, password) => {
    const response = await axios.post(
      "/api/signup",
      { username: id, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status !== HttpStatusCode.Created) {
      throw new Error("Signup failed");
    }
  },
  logout: () => set({ token: null }),
}));
