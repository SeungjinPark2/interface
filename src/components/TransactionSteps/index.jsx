import { useCallback, useMemo, useState } from "react";
import { Button, Image, ListGroup, Spinner } from "react-bootstrap";
import { useBankStore } from "../../hooks/bankStore";
import RejectDialog from "./RejectDialog";
import { approveTx } from "../../pages/Home/Remittance/api";

const TransactionSteps = ({ transaction, addApproval }) => {
  const { bankInfo } = useBankStore();
  const variants = ["warning", "info", "danger"];
  const quotesForStatus = ["진행중", "승인완료", "거절됨"];
  const [loading, setLoading] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const statusToVariant = (status) => {
    if (status == null) return "info";
    else return variants[status];
  };

  const handleClick = (id, choice) => {
    if (choice === "reject") handleShow();
    else {
      setLoading(true);
      console.log(id, choice);
      approveTx(id, "approve")
        .then(() => {
          window.alert("트렌젝션 승인에 성공했습니다.");
          setLoading(false);
        })
        .finally(() => setLoading(false));
    }
  };

  const renderApprovalButton = useCallback(
    (agreement) => {
      if (!addApproval) return <></>;
      else {
        let approveBtn = <></>;
        let rejectBtn = <></>;
        if (bankInfo.code === agreement.code) {
          approveBtn = (
            <Button
              disabled={agreement.status !== 0}
              variant="outline-info"
              style={{
                marginLeft: "4px",
              }}
              onClick={() => handleClick(transaction.id, "approve")}
            >
              {loading ? <Spinner animation="border" variant="info" /> : "승인"}
            </Button>
          );
          rejectBtn = (
            <Button
              disabled={agreement.status !== 0}
              variant="outline-danger"
              onClick={() => handleClick(transaction.id, "reject")}
            >
              {loading ? (
                <Spinner animation="border" variant="danger" />
              ) : (
                "반려"
              )}
            </Button>
          );
        }

        return (
          <>
            <ListGroup.Item>
              <div className="d-flex justify-content-between align-items-center">
                <span className={`text-${variants[agreement.status]}`}>
                  {quotesForStatus[agreement.status]}
                </span>
                <div className="d-flex">
                  {rejectBtn}
                  {approveBtn}
                </div>
              </div>
            </ListGroup.Item>
            <RejectDialog
              handleClose={handleClose}
              show={show}
              id={transaction.id}
            />
          </>
        );
      }
    },
    [bankInfo, show, loading]
  );

  const stepsUi = useMemo(
    () =>
      transaction.agreements.map((agreement, idx) => (
        <ListGroup.Item key={idx}>
          <div className="d-flex align-items-center">
            <Image src="/bank.png" />
            <ListGroup
              variant="flush"
              style={{
                width: "100%",
              }}
            >
              <ListGroup.Item variant={statusToVariant(agreement.status)}>
                {agreement.code}
              </ListGroup.Item>
              <ListGroup.Item>
                수수료: {agreement.collectedFee} {agreement.currencyCode}
              </ListGroup.Item>
              <ListGroup.Item>
                전송될 금액: {agreement.amount} {agreement.currencyCode}
              </ListGroup.Item>
              {renderApprovalButton(agreement)}
            </ListGroup>
          </div>
        </ListGroup.Item>
      )),
    [bankInfo, renderApprovalButton]
  );
  return <>{stepsUi}</>;
};

export default TransactionSteps;
