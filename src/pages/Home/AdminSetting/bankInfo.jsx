import { useEffect, useMemo, useState } from "react";
import SecondContainer from "../../../components/SecondContainer";
import { getBankInfo } from "./api";
import { useTranslation } from "react-i18next";
import { ListGroup, Stack } from "react-bootstrap";

const BankInfoBox = () => {
  const [bankInfo, setBankInfo] = useState();
  const { t } = useTranslation("admin");

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
    getBankInfo().then((data) => {
      setBankInfo(data);
    });
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
