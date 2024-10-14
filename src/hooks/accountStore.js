import { HttpStatusCode } from "axios";
import { create } from "zustand";
import { axioser } from "../axioser";

export const useAccountStore = create((set) => ({
  accountInfo: null,
  getAccountInfo: async () => {
    // 로그인 API 호출
    const { status, data } = await axioser().get("/api/account");

    if (status == HttpStatusCode.Ok) {
      set({ accountInfo: data });
    } else {
      throw new Error("fetch account info failed");
    }
  },
}));
