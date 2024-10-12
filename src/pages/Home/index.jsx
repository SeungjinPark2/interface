import { Container, Stack } from "react-bootstrap";
import Header from "../../components/Header";

function Home() {
  return (
    <>
      <Header></Header>
      <Container
        className="d-flex justify-content-center bg-dark-subtle rounded"
        style={{
          marginTop: "20px",
          maxWidth: "960px",
        }}
      >
        <Stack>
          <div
            style={{
              height: "300px",
              overflow: "hidden",
              backgroundImage: `url("main-image.jpg")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              marginTop: "10px",
            }}
          ></div>
          <div>
            <h1>Hyperledger를 이용한 은행간 송금 네트워크 프로토타입</h1>
            <h2>2024 광운대학교 인공지능융합대학 졸업작품</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laudantium est minus earum perferendis eligendi vero corporis
              reiciendis aliquam inventore. Nemo voluptates expedita omnis
              officiis vero nulla est, minus ipsum possimus.
            </p>
          </div>
        </Stack>
      </Container>
    </>
  );
}

export default Home;
