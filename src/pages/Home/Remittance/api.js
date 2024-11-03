import { HttpStatusCode } from "axios";
import { axioser } from "../../../axioser";

export const preflightTx = async (formdata) => {
  const { status, data } = await axioser().post("/api/transaction/preflight", {
    receiver: {
      firstname: formdata.firstname,
      lastname: formdata.lastname,
      accountNumber: formdata.accountNumber,
    },
    amount: formdata.amount,
    code: formdata.code,
  });

  if (status !== HttpStatusCode.Ok && status !== HttpStatusCode.NotModified) {
    throw new Error("failed to preflight");
  }

  return data;
};

export const submitTx = async (preflightedTx) => {
  const { status, data } = await axioser().post("/api/transaction/", {
    sender: preflightedTx.sender,
    receiver: preflightedTx.receiver,
    agreements: preflightedTx.agreements,
  });

  if (status !== HttpStatusCode.Ok && status !== HttpStatusCode.NotModified) {
    throw new Error("failed to submit tx");
  }

  return data;
};

export const associateBank = async (code) => {
  const { status } = await axioser().post("/api/bank/associate", {
    code,
  });

  if (status !== HttpStatusCode.Created) {
    throw new Error("Association failed");
  }
};

export const getTxs = async (txStatus) => {
  const { data, status } = await axioser().get(
    `/api/transaction/status/${txStatus}`
  );

  if (
    !(status === HttpStatusCode.Ok || status === HttpStatusCode.NotModified)
  ) {
    throw new Error("Fetching Bank Info Failed");
  }

  return data;
};

export const approveTx = async (id, choice, reason = "") => {
  const { data, status } = await axioser().post("/api/transaction/approve", {
    id,
    choice,
    reason,
  });

  if (
    !(status === HttpStatusCode.Ok || status === HttpStatusCode.NotModified)
  ) {
    throw new Error("Approvement failed");
  }

  return data;
};
