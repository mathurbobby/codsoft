import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Badge from "react-bootstrap/Badge";
import ModalComp from "./CartComp";
import { useCart } from "./ContextReducer";

const NavHeadBar = () => {
  const cartItem = useCart();
  const [modalShow, setModalShow] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    toast.error("Logged Out", { position: "top-center" });
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };
  return (
    <>
      {["sm"].map((expand) => (
        <Navbar
          key={expand}
          expand={expand}
          className="bg-bgbrown"
          variant="dark"
          fixed="top"
        >
          <Container fluid>
            <Navbar.Brand
              as={Link}
              to="/"
              className="fw-normal fst-italic fs-2"
            >
              ClickCart
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
              variant="light"
              style={{ width: "85vw" }}
            >
              <Offcanvas.Header
                closeButton
                closeVariant="white"
                style={{ backgroundColor: "#2874F0" }}
              >
                <Offcanvas.Title
                  id={`offcanvasNavbarLabel-expand-${expand}`}
                  className="fw-bolder text-white"
                >
                  ClickCart
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-start flex-grow-1 pe-3">
                  <Nav.Link as={Link} active to="/">
                    Home
                  </Nav.Link>
                  {localStorage.getItem("authToken") ? (
                    <Nav.Link as={Link} active to="/myorders">
                      My Orders
                    </Nav.Link>
                  ) : null}
                </Nav>
                {!localStorage.getItem("authToken") ? (
                  <Nav className="justify-content-end flex-grow-1 pe-5">
                    <Nav.Link as={Link} active to="/login" className="me-2">
                      Login
                    </Nav.Link>
                    <Nav.Link as={Link} active to="/createuser">
                      SignUp
                    </Nav.Link>
                  </Nav>
                ) : (
                  <Nav className="justify-content-end flex-grow-1 pe-5">
                    <Nav.Link
                      onClick={() => setModalShow(true)}
                      active

                      className="me-2 align-items-center justify-content-center"
                    >
                      Cart{" "}
                      {cartItem.length == 0 ? null : (<Badge pill bg='white' className="text-primary">
                    {cartItem.length}
                  </Badge>)}
                    </Nav.Link>
                    {modalShow && (
                      <ModalComp
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                      ></ModalComp>
                    )}
                    <Nav.Link active onClick={handleLogout}>
                      Logout
                    </Nav.Link>
                  </Nav>
                )}
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
};

export default NavHeadBar;
