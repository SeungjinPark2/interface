import { Stack } from "react-bootstrap";
import Header from "../../components/Header";
import { Outlet } from "react-router-dom";
import MyContainer from "../../components/MyContainer";

function Home() {
  return (
    <>
      <Header />
      <MyContainer>
        <Stack gap={2}>
          <Outlet />
        </Stack>
      </MyContainer>
    </>
  );
}

export default Home;
