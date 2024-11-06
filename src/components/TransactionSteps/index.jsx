import { useCallback, useMemo, useState } from "react";
import { Button, Image, ListGroup, Spinner } from "react-bootstrap";
import { useBankStore } from "../../hooks/bankStore";
import RejectDialog from "./RejectDialog";
import { approveTx } from "../../pages/Home/Remittance/api";
import { useTranslation } from "react-i18next";

const TransactionSteps = ({ transaction, addStatus, addApproval }) => {
  const { t } = useTranslation("step");
  const { bankInfo } = useBankStore();
  const variants = ["warning", "info", "danger"];
  const quotesForStatus = [t("qs0"), t("qs1"), t("qs2")];
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
      approveTx(id, "approve")
        .then(() => {
          window.alert(t("alert"));
          setLoading(false);
        })
        .finally(() => setLoading(false));
    }
  };

  const renderApproval = useCallback(
    (agreement) => {
      let approveBtn = <></>;
      let rejectBtn = <></>;
      let statusUi = <></>;

      if (addApproval) {
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
              {loading ? (
                <Spinner animation="border" variant="info" />
              ) : (
                t("approve")
              )}
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
                t("reject")
              )}
            </Button>
          );
        }

        if (addStatus) {
          statusUi = (
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
          );
        }

        return (
          <>
            {statusUi}
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
                {t("fee")}: {agreement.collectedFee} {agreement.currencyCode}
              </ListGroup.Item>
              <ListGroup.Item>
                {t("amount")}: {agreement.amount} {agreement.currencyCode}
              </ListGroup.Item>
              {renderApproval(agreement)}
            </ListGroup>
          </div>
        </ListGroup.Item>
      )),
    [bankInfo, renderApproval]
  );
  return <>{stepsUi}</>;
};

export default TransactionSteps;
