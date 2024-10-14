import { Container } from "react-bootstrap";

function MyContainer({ children }) {
  return (
    <Container className="py-3 d-flex justify-content-center bg-dark-subtle rounded">
      {children}
    </Container>
  );
}

export default MyContainer;
