import { Stack } from "react-bootstrap";
import SecondContainer from "../../../../components/SecondContainer";
import TxList from "./TxList";
import { useEffect, useState } from "react";
import { getTxs } from "../../Remittance/api";
import { useBankStore } from "../../../../hooks/bankStore";

const ApproveTx = () => {
  const [unapprovedTxs, setUnapprovedTxs] = useState();
  const { bankInfo, getBankInfo } = useBankStore();

  useEffect(() => {
    if (bankInfo == null) {
      getBankInfo();
    } else {
      getTxs(bankInfo.code, 0).then((uTxs) => {
        setUnapprovedTxs(uTxs);
      });
    }
  }, [bankInfo]);
  return (
    <SecondContainer>
      <Stack className="p-2" gap={2}>
        <span className="fs-4">승인 대기중인 트렌젝션</span>
        <TxList
          unapprovedTxs={unapprovedTxs}
          bankCode={bankInfo?.code}
        ></TxList>
      </Stack>
    </SecondContainer>
  );
};

export default ApproveTx;
