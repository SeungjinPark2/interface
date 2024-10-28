import { Container } from "react-bootstrap";

function MyContainer({ children }) {
  return (
    <Container
      className="d-flex justify-content-center bg-dark-subtle rounded py-3 my-3"
      style={{
        maxWidth: "960px",
      }}
    >
      {children}
    </Container>
  );
}

export default MyContainer;
