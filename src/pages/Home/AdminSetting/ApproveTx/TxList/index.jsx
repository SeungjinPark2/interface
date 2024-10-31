import { useMemo } from "react";
import { Accordion } from "react-bootstrap";
import TransactionSteps from "../../../../../components/TransactionSteps";

const TxList = ({ unapprovedTxs, bankCode }) => {
  const renderAccordionItem = useMemo(() => {
    let rendering = "";
    if (unapprovedTxs != null) {
      rendering = unapprovedTxs.map((tx, idx) => (
        <Accordion.Item eventKey={idx} key={idx}>
          <Accordion.Header>Transaction {idx}</Accordion.Header>
          <Accordion.Body>
            {<TransactionSteps transaction={tx} addApproval={true} />}
          </Accordion.Body>
        </Accordion.Item>
      ));
    }
    return rendering;
  }, [unapprovedTxs, bankCode]);
  return <Accordion>{renderAccordionItem}</Accordion>;
};

export default TxList;
