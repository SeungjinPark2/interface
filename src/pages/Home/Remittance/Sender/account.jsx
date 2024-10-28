import { useTranslation } from "react-i18next";
import { amountEncoder } from "../../../../util";
import SecondContainer from "../../../../components/SecondContainer";

function Account({ accountInfo }) {
  const { t } = useTranslation("remittance");
  return (
    <SecondContainer>
      <div className="d-flex justify-content-between">
        <span className="fs-5">
          {t("accountNumber")} {" " + accountInfo?.accountNumber}
        </span>
        <span className="fs-5">{t("balance")}</span>
      </div>

      <span className="mx-auto my-auto fs-1">
        {accountInfo != null ? amountEncoder(accountInfo.balance + "") : "0"}
        {t("ticker")}
      </span>
    </SecondContainer>
  );
}

export default Account;
