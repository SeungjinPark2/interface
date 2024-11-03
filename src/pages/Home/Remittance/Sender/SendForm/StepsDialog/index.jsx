import { useMemo, useState } from "react";
import { Button, ListGroup, Modal, Spinner } from "react-bootstrap";
import { submitTx } from "../../../api";
import TransactionSteps from "../../../../../../components/TransactionSteps";
import { useTranslation } from "react-i18next";

const TxDialog = ({ handleClose, show, preflightedTx }) => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation("remittance");

  const receiverQuote = useMemo(() => {
    let rendering = "";
    if (preflightedTx != null) {
      const receiverFullName = `${preflightedTx.receiver.firstname} ${preflightedTx.receiver.lastname}`;
      const lastOne = preflightedTx.agreements.pop();
      preflightedTx.agreements.push(lastOne);
      rendering = (
        <div>
          {t("dialog.q1")} <b>{receiverFullName}</b> {t("dialog.q2")}
          <b>
            {lastOne.amount} {lastOne.currencyCode}
          </b>{" "}
          {t("dialog.q3")}
        </div>
      );
    }
    return rendering;
  }, [preflightedTx]);

  const remittanceSteps = useMemo(() => {
    let ui = <></>;
    if (preflightedTx != null)
      ui = <TransactionSteps transaction={preflightedTx} addApproval={false} />;
    return ui;
  }, [preflightedTx]);

  const handleClick = async () => {
    setLoading(true);
    if (preflightedTx != null) {
      submitTx(preflightedTx).finally(() => {
        setLoading(false);
        window.alert(t("dialog.alert"));
      });
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t("dialog.modal.title")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>{remittanceSteps}</ListGroup>
        {receiverQuote}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={handleClose}>
          {t("dialog.modal.cancel")}
        </Button>
        <Button variant="outline-info" onClick={handleClick}>
          {loading ? (
            <Spinner animation="border" variant="info" />
          ) : (
            t("dialog.modal.submit")
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TxDialog;
