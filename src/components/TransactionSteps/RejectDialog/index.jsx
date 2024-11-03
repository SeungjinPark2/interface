import { useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { approveTx } from "../../../pages/Home/Remittance/api";
import { useTranslation } from "react-i18next";

const RejectDialog = ({ handleClose, show, id }) => {
  const { t } = useTranslation("step");
  const [loading, setLoading] = useState(false);
  const [reason, setReason] = useState("");

  const handleChange = (e) => {
    setReason(e.target.value);
  };

  const handleClick = () => {
    setLoading(true);
    approveTx(id, "approve")
      .then(() => {
        window.alert(t("alert"));
        setLoading(false);
      })
      .finally(() => setLoading(false));
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t("dialog.alert")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>{t("dialog.reason")}</Form.Label>
            <Form.Control
              type="text"
              name="id"
              placeholder={t("dialog.reasonPH")}
              value={reason}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-info" onClick={handleClick}>
          {loading ? (
            <Spinner animation="border" variant="info" />
          ) : (
            t("dialog.submit")
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RejectDialog;
