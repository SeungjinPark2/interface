import { useState } from "react";
import { Form, Button, Container, Row, Col, Anchor } from "react-bootstrap";
import { useAuthStore } from "../../../hooks/authStore";

const LoginForm = () => {
  const { login } = useAuthStore();
  const [error, setError] = useState(null);

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
      await login(formData.id, formData.password);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={4}>
          <h2 className="text-center">Login</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicId">
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="text"
                name="id"
                placeholder="Enter your ID"
                value={formData.id}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Anchor href="/signup">sign up</Anchor>
            <Button variant="primary" type="submit" className="mt-4 w-100">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
