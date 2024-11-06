import { useMemo } from "react";
import { Accordion, ListGroup } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const SenderAndReceiver = ({ transaction, style }) => {
  const { t } = useTranslation("step");
  const infoUi = useMemo(() => {
    let ret = <></>;
    if (transaction != null) {
      ret = [transaction.sender, transaction.receiver].map((p, idx) => {
        return (
          <Accordion.Item eventKey={idx} key={idx}>
            <Accordion.Header>
              {idx === 0 ? t("user.senderInfo") : t("user.receiverInfo")}
            </Accordion.Header>
            <Accordion.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  {t("user.name")}: {p.firstname} {p.lastname}
                </ListGroup.Item>
                <ListGroup.Item>
                  {t("user.accountNumber")}: {p.accountNumber}
                </ListGroup.Item>
              </ListGroup>
            </Accordion.Body>
          </Accordion.Item>
        );
      });
    }

    return ret;
  }, [transaction]);
  return <Accordion style={style}>{infoUi}</Accordion>;
};

export default SenderAndReceiver;
