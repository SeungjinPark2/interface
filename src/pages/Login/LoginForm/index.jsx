import { useState } from "react";
import { Form, Button, Container, Row, Col, Anchor } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { login } from "../api";
import { useLocalStorage } from "@uidotdev/usehooks";

const LoginForm = () => {
  // const { login } = useAuthStore();
  const [, saveToken] = useLocalStorage("token", null);

  const [error, setError] = useState(null);
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    id: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 로그인 처리 함수 호출
    setError(null); // 에러 상태 초기화

    try {
      await login(formData.id, formData.password, saveToken);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={4}>
          <h2 className="text-center">{t("login.login")}</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicId">
              <Form.Label>{t("login.id")}</Form.Label>
              <Form.Control
                type="text"
                name="id"
                placeholder={t("login.id_hint")}
                value={formData.id}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mt-3">
              <Form.Label>{t("login.password")}</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder={t("login.password_hint")}
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Anchor href="/signup">{t("login.signup_link")}</Anchor>
            <Button variant="primary" type="submit" className="mt-4 w-100">
              {t("login.login")}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
