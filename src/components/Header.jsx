import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

function Header() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">KR Bank</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">홈</Nav.Link>
            <Nav.Link href="#link">금융</Nav.Link>
            <NavDropdown title="외환" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">해외송금</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                해외송금 기록
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">
                진행중인 송금 현황
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
