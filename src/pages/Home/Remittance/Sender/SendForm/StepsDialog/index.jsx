import { useMemo, useState } from "react";
import { Button, ListGroup, Modal, Spinner } from "react-bootstrap";
import { submitTx } from "../../../api";
import TransactionSteps from "../../../../../../components/TransactionSteps";

const TxDialog = ({ handleClose, show, preflightedTx }) => {
  const [loading, setLoading] = useState(false);

  const receiverQuote = useMemo(() => {
    let rendering = "";
    if (preflightedTx != null) {
      const receiverFullName = `${preflightedTx.receiver.firstname} ${preflightedTx.receiver.lastname}`;
      const lastOne = preflightedTx.agreements.pop();
      preflightedTx.agreements.push(lastOne);
      rendering = (
        <div>
          최종적으로 <b>{receiverFullName}</b> 님이 받을 금액은
          <b>
            {lastOne.amount} {lastOne.currencyCode}
          </b>{" "}
          입니다.
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
        window.alert("트렌젝션 제안에 성공했습니다.");
      });
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>송금 검토</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>{remittanceSteps}</ListGroup>
        {receiverQuote}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={handleClose}>
          취소
        </Button>
        <Button variant="outline-info" onClick={handleClick}>
          {loading ? <Spinner animation="border" variant="info" /> : "제출"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TxDialog;
