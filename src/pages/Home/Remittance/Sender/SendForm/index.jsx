import { useTranslation } from "react-i18next";
import SecondContainer from "../../../../../components/SecondContainer";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { useState } from "react";
import { preflightTx } from "../../api";
import TxDialog from "./StepsDialog";

function SendForm() {
  const { t } = useTranslation("remittance");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [txObject, setTxObject] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formData, setFormData] = useState({
    code: "",
    firstname: "",
    lastname: "",
    accountNumber: "",
    amount: 0,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    preflightTx(formData)
      .then((preflightedTx) => {
        setTxObject(preflightedTx);
        setLoading(false);
        handleShow();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <SecondContainer
      style={{
        padding: "12px",
      }}
    >
      <TxDialog
        show={show}
        handleClose={handleClose}
        preflightedTx={txObject}
      />
      <span className="fs-4 mb-2">{t("sendTitle")}</span>
      <Form>
        <Form.Group className="p-2">
          <Form.Label>수취은행 코드</Form.Label>
          <Form.Control
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            placeholder="수취은행 코드 입력"
            required
          />
          <Form.Label className="mt-2">수취인 성명</Form.Label>
          <Row>
            <Col>
              <Form.Control
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                placeholder="성 입력"
                required
              />
            </Col>
            <Col>
              <Form.Control
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                placeholder="이름 입력"
                required
              />
            </Col>
          </Row>
          <Form.Label className="mt-2">수취인 계좌번호</Form.Label>
          <Form.Control
            type="text"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleChange}
            placeholder="수취인 계좌번호 입력"
            required
          />
          <Form.Label className="mt-2">송금액</Form.Label>
          <Form.Control
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="송금액 입력"
            required
          />
        </Form.Group>
        <Button
          className="mt-2"
          style={{
            width: "100%",
          }}
          variant="outline-info"
          onClick={handleSubmit}
        >
          {loading ? <Spinner animation="border" variant="info" /> : "개시"}
        </Button>
      </Form>
    </SecondContainer>
  );
}

export default SendForm;
