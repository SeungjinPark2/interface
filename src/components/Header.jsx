import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../pages/Login/api";
import { useUserStore } from "../hooks/userStore";
import { useEffect, useMemo } from "react";

function Header() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { userInfo, getUserInfo } = useUserStore();

  const renderAdmin = useMemo(
    () =>
      userInfo?.role === "ADMIN" ? (
        <Nav.Link>
          <Link to="/home/admin-setting">{t("header.admin-setting")}</Link>
        </Nav.Link>
      ) : (
        ""
      ),
    [userInfo]
  );

  useEffect(() => {
    getUserInfo();
  }, []);

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
        <Navbar.Brand className="fw-bold">
          <Link to="/home">{t("header.logo")}</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <Link to="/home/overview">{t("header.overview")}</Link>
            </Nav.Link>
            <NavDropdown
              title={t("header.foreign_exchange")}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item>
                <Link to="/home/remittance/sender">
                  {t("header.remittance")}
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/home/remittance/history">
                  {t("header.remittance_records")}
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/home/remittance/track">
                  {t("header.remittance_current")}
                </Link>
              </NavDropdown.Item>
            </NavDropdown>
            {renderAdmin}
          </Nav>
        </Navbar.Collapse>
        <Nav className="ms-auto">
          <Navbar.Text className="me-2">
            {userInfo?.firstName ?? ""} {userInfo?.lastName ?? ""}
          </Navbar.Text>
          <Button variant="outline-secondary" onClick={handleLogout}>
            {t("header.logout")}
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
