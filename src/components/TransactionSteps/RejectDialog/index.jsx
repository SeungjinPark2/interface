import { useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { approveTx } from "../../../pages/Home/Remittance/api";

const RejectDialog = ({ handleClose, show, id }) => {
  const [loading, setLoading] = useState(false);
  const [reason, setReason] = useState("");

  const handleChange = (e) => {
    setReason(e.target.value);
  };

  const handleClick = () => {
    setLoading(true);
    approveTx(id, "approve")
      .then(() => {
        window.alert("트렌젝션 승인에 성공했습니다.");
        setLoading(false);
      })
      .finally(() => setLoading(false));
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>반려 하기</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>반려 사유</Form.Label>
            <Form.Control
              type="text"
              name="id"
              placeholder="반려 사유를 기입해주세요"
              value={reason}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-info" onClick={handleClick}>
          {loading ? <Spinner animation="border" variant="info" /> : "제출"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RejectDialog;
