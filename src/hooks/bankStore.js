import { create } from "zustand";
import { axioser } from "../axioser";
import { HttpStatusCode } from "axios";

export const useBankStore = create((set) => ({
  bankInfo: null,
  getBankInfo: async () => {
    const { data, status } = await axioser().get("/api/bank/");

    if (
      !(status === HttpStatusCode.Ok || status === HttpStatusCode.NotModified)
    ) {
      throw new Error("Fetching Bank Info Failed");
    }

    set({ bankInfo: data });
  },
}));
