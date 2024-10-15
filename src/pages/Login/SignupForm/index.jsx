import { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { signup } from "../api";

const SignupForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // 에러 상태 초기화
    setSuccess(null); // 성공 상태 초기화

    // 비밀번호 일치 여부 확인
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await signup(
        formData.id,
        formData.password,
        formData.firstName,
        formData.lastName
      );
      setSuccess("Signup successful!");
      window.alert("Signup succeeded");
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={4}>
          <h2 className="text-center">{t("signup.signup")}</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicId" className="mt-2">
              <Form.Label>{t("signup.id")}</Form.Label>
              <Form.Control
                type="text"
                name="id"
                placeholder={t("signup.id_hint")}
                value={formData.id}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formFirstName" className="mt-2">
              <Form.Label>{t("signup.firstName")}</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                placeholder={t("signup.firstNameHint")}
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formLastName" className="mt-2">
              <Form.Label>{t("signup.lastName")}</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                placeholder={t("signup.lastNameHint")}
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mt-2">
              <Form.Label>{t("signup.password")}</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder={t("signup.password_hint")}
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPasswordConfirm" className="mt-2">
              <Form.Label>{t("signup.password_confirm")}</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                placeholder={t("signup.password_confirm_hint")}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-4 w-100">
              {t("signup.signup")}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupForm;
