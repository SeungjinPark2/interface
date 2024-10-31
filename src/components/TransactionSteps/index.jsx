import { useCallback, useMemo } from "react";
import { Button, Image, ListGroup } from "react-bootstrap";
import { useBankStore } from "../../hooks/bankStore";

const TransactionSteps = ({ transaction, addApproval }) => {
  const { bankInfo } = useBankStore();
  const variants = ["warning", "info", "danger"];
  const quotesForStatus = ["진행중", "승인완료", "거절됨"];

  const statusToVariant = (status) => {
    if (status == null) return "info";
    else return variants[status];
  };

  const renderApprovalButton = useCallback(
    (agreement) => {
      if (!addApproval) return <></>;
      else {
        let btn = <></>;
        if (bankInfo.code === agreement.code)
          btn = <Button variant="outline-info">승인</Button>;

        return (
          <ListGroup.Item>
            <div className="d-flex justify-content-between">
              <span>{quotesForStatus[agreement.status]}</span>
              {btn}
            </div>
          </ListGroup.Item>
        );
      }
    },
    [bankInfo]
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
    [bankInfo]
  );
  return <>{stepsUi}</>;
};

export default TransactionSteps;
