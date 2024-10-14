import { Container, Stack } from "react-bootstrap";
import Header from "../../components/Header";
import { Outlet } from "react-router-dom";

function Home() {
  return (
    <>
      <Header />
      <Container
        className="d-flex justify-content-center"
        style={{
          marginTop: "20px",
          maxWidth: "960px",
        }}
      >
        <Stack gap={3} className="py-3">
          <Outlet />
        </Stack>
      </Container>
    </>
  );
}

export default Home;
