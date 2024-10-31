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

export const getTxs = async (currentBankCode, txStatus) => {
  const { data, status } = await axioser().get(
    `/api/transaction/status/${txStatus}`
  );

  if (
    !(status === HttpStatusCode.Ok || status === HttpStatusCode.NotModified)
  ) {
    throw new Error("Fetching Bank Info Failed");
  }

  // api 가 넘겨주는 txs 는 전체 tx 상태가 ONGOING 인 것들을 제공해줌.
  // 따라서 본 은행에서만 필요로 하는 것을 파싱할 필요가 있다.
  const txs = data.filter((tx) => {
    const agreement = tx.agreements.find(
      (agre) => agre.code === currentBankCode
    );

    return parseInt(agreement.status) === 0;
  });

  return txs;
};
