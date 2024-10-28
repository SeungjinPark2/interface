import { HttpStatusCode } from "axios";
import { axioser } from "../../../axioser";

export const associateBank = async (code) => {
  const { status } = await axioser().post("/api/bank/associate", {
    code,
  });

  if (status !== HttpStatusCode.Created) {
    throw new Error("Association failed");
  }
};

export const getBankInfo = async () => {
  const { data, status } = await axioser().get("/api/bank/");
  if (
    !(status === HttpStatusCode.Ok || status === HttpStatusCode.NotModified)
  ) {
    throw new Error("Fetching Bank Info Failed");
  }

  return data;
};
