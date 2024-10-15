import { HttpStatusCode } from "axios";
import { create } from "zustand";
import { axioser } from "../axioser";

export const useUserStore = create((set) => ({
  userInfo: null,
  getUserInfo: async () => {
    // 로그인 API 호출
    const { status, data } = await axioser().get("/api/user");

    if (status == HttpStatusCode.Ok) {
      set({ userInfo: data });
    } else {
      throw new Error("fetch user info failed");
    }
  },
}));
