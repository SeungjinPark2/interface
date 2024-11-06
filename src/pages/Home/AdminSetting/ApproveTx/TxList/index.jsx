import { useMemo } from "react";
import { Accordion } from "react-bootstrap";
import TransactionSteps from "../../../../../components/TransactionSteps";
import SenderAndReceiver from "../../../../../components/SenderAndReceiverInfo";

const TxList = ({ transactions, bankCode, addApproval, addStatus }) => {
  const renderAccordionItem = useMemo(() => {
    let rendering = "";
    if (transactions != null && bankCode != null) {
      rendering = transactions.map((tx, idx) => (
        <Accordion.Item eventKey={idx} key={idx}>
          <Accordion.Header>Transaction {idx}</Accordion.Header>
          <Accordion.Body>
            <SenderAndReceiver
              style={{ marginBottom: "8px" }}
              transaction={tx}
            />
            {
              <TransactionSteps
                transaction={tx}
                addApproval={addApproval}
                addStatus={addStatus}
              />
            }
          </Accordion.Body>
        </Accordion.Item>
      ));
    }
    return rendering;
  }, [transactions, bankCode]);
  return <Accordion>{renderAccordionItem}</Accordion>;
};

export default TxList;
