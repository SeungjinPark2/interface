import { useEffect, useMemo } from "react";
import SecondContainer from "../../../../components/SecondContainer";
import { useTranslation } from "react-i18next";
import { ListGroup, Stack } from "react-bootstrap";
import { useBankStore } from "../../../../hooks/bankStore";

const BankInfoBox = () => {
  const { t } = useTranslation("admin");
  const { bankInfo, getBankInfo } = useBankStore();

  const listRender = useMemo(
    () =>
      bankInfo == null
        ? ""
        : bankInfo?.correspondentBanks.map((b) => (
            <ListGroup.Item as="li" key={b}>
              {b}
            </ListGroup.Item>
          )),
    [bankInfo]
  );

  useEffect(() => {
    getBankInfo();
  }, []);

  return (
    <SecondContainer>
      <Stack gap={2} className="p-2">
        <span className="fs-2">{bankInfo?.code ?? "..."}</span>
        <span>{t("correspondentList")}</span>
        <ListGroup as="ol">{listRender}</ListGroup>
      </Stack>
    </SecondContainer>
  );
};

export default BankInfoBox;
