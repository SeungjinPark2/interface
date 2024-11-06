import { Stack } from "react-bootstrap";
import SecondContainer from "../../../../components/SecondContainer";
import TxList from "./TxList";
import { useEffect, useState } from "react";
import { getTxs } from "../../Remittance/api";
import { useBankStore } from "../../../../hooks/bankStore";
import { useTranslation } from "react-i18next";

const ApproveTx = () => {
  const [unapprovedTxs, setUnapprovedTxs] = useState();
  const { bankInfo, getBankInfo } = useBankStore();
  const { t } = useTranslation("admin");

  useEffect(() => {
    if (bankInfo == null) {
      getBankInfo();
    } else {
      getTxs(0).then((uTxs) => {
        setUnapprovedTxs(uTxs);
      });
    }
  }, [bankInfo]);

  return (
    <SecondContainer>
      <Stack className="p-2" gap={2}>
        <span className="fs-4">{t("waitingToBeApprovedTxs")}</span>
        <TxList
          transactions={unapprovedTxs}
          bankCode={bankInfo?.code}
          addApproval={true}
          addStatus={true}
        />
      </Stack>
    </SecondContainer>
  );
};

export default ApproveTx;
