import { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import SecondContainer from "../../../../components/SecondContainer";
import { associateBank } from "../../Remittance/api";

const AssociateBox = () => {
  const { t } = useTranslation("admin");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    code: "",
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
    associateBank(formData.code).then(() => {
      window.alert(t("associateSuccess"));
      setLoading(false);
    });
  };
  return (
    <SecondContainer>
      <Form>
        <Form.Group className="p-2" controlId="formBasicBankCode">
          <Form.Label>{t("associate")}</Form.Label>
          <div className="d-flex">
            <Form.Control
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              placeholder={t("associatePlaceHolder")}
            />
            <Button
              onClick={handleSubmit}
              style={{ width: "100px", marginLeft: "6px" }}
              variant="outline-info"
            >
              {loading ? (
                <Spinner animation="border" variant="info" />
              ) : (
                t("associateButton")
              )}
            </Button>
          </div>
          <Form.Text className="text-muted">{t("associateInfo")}</Form.Text>
        </Form.Group>
      </Form>
    </SecondContainer>
  );
};

export default AssociateBox;
