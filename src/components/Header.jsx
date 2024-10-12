import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "../hooks/authStore";
import { useNavigate } from "react-router-dom";

function Header() {
  const { t } = useTranslation();
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Navbar expand="lg" className="bg-dark-subtle">
      <Container
        style={{
          maxWidth: "960px",
        }}
      >
        <Navbar.Brand href="#home" className="fw-bold">
          {t("header.logo")}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown
              title={t("header.foreign_exchange")}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="#action/3.1">
                {t("header.remittance")}
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                {t("header.remittance_records")}
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">
                {t("header.remittance_current")}
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <Nav className="ms-auto">
          <Button variant="outline-secondary" onClick={handleLogout}>
            {t("header.logout")}
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
