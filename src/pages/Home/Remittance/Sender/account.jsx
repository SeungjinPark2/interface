import { useTranslation } from "react-i18next";
import MyContainer from "../../../../components/MyContainer";
import { amountEncoder } from "../../../../util";

function Account({ accountInfo }) {
  const { t } = useTranslation("remittance");
  return (
    <MyContainer>
      <div
        className="px-2 d-flex flex-column bg-body-tertiary rounded"
        style={{
          width: "600px",
          height: "210px",
        }}
      >
        <div className="d-flex justify-content-between">
          <span className="fs-5">
            {t("accountNumber")} {" " + accountInfo?.accountNumber}
          </span>
          <span className="fs-5">{t("balance")}</span>
        </div>

        <span className="mx-auto my-auto fs-1">
          {accountInfo != null ? amountEncoder(accountInfo.balance) : "0"}
          {t("ticker")}
        </span>
      </div>
    </MyContainer>
  );
}

export default Account;
