import { useEffect, useState } from "react";
import SecondContainer from "../../../../components/SecondContainer";
import { useBankStore } from "../../../../hooks/bankStore";
import TxList from "../../AdminSetting/ApproveTx/TxList";
import { getUserTxs } from "../api";
import { Stack } from "react-bootstrap";
import { useTranslation } from "react-i18next";

function Track() {
  const [txs, setTxs] = useState();
  const { bankInfo, getBankInfo } = useBankStore();
  const { t } = useTranslation("remittance");

  useEffect(() => {
    getBankInfo();
    getUserTxs().then(setTxs);
  }, []);

  return (
    <SecondContainer
      style={{
        padding: "12px",
      }}
    >
      <Stack gap={2}>
        <span className="fs-3">{t("track.currentStatus")}</span>
        <span className="fs-5">{t("track.transactionList")}</span>
        <TxList
          transactions={txs}
          bankCode={bankInfo?.code}
          addApproval={false}
        />
      </Stack>
    </SecondContainer>
  );
}

export default Track;
