import { Navbar, Nav } from "react-bootstrap/";
import { BrowserRouter } from "react-router-dom/";
import { LinkContainer } from "react-router-bootstrap";
import React from "react";
import Router from "../../router";

export const NavBar = ({
  signedIn,
  onSignIn,
  onSignOut,
  changeIsSignedIn,
  api,
}) => {
  React.returnSignOut = () => {
    if (signedIn)
      return (
        <LinkContainer to="/login">
          <Nav.Link onClick={onSignOut}> Sign Out</Nav.Link>
        </LinkContainer>
      );
    else return null;
  };

  React.returnLogin = () => {
    if (signedIn) return null;
    else
      return (
        <LinkContainer to="/login">
          <Nav.Link>Login</Nav.Link>
        </LinkContainer>
      );
  };

  React.returnRegister = () => {
    if (signedIn) return null;
    else
      return (
        <LinkContainer to="/register">
          <Nav.Link>Register</Nav.Link>
        </LinkContainer>
      );
  };

  React.returnProfile = () => {
    if (signedIn)
      return (
        <LinkContainer to="/profile">
          <Nav.Link>Profile</Nav.Link>
        </LinkContainer>
      );
    else return null;
  };

  React.returnProtfolio = () => {
    if (signedIn)
      return (
        <LinkContainer to="/portfolio/skeleton">
          <Nav.Link>Portfolio</Nav.Link>
        </LinkContainer>
      );
    else return null;
  };

  return (
    <BrowserRouter>
      <div>
        <header>
          <Navbar bg="dark" variant="dark" expand="lg">
            <LinkContainer to="/">
              <Navbar.Brand href="/">Portfolios</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <LinkContainer to="/">
                  <Nav.Link>Home</Nav.Link>
                </LinkContainer>
                {React.returnProfile()}
                {React.returnProtfolio()}
                {React.returnLogin()}
                {React.returnRegister()}
                {React.returnSignOut()}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </header>
        <section className="main-container">
          <Router
            signedIn={signedIn}
            onSignIn={onSignIn}
            changeIsSignedIn={changeIsSignedIn}
            api={api}
          />
        </section>
      </div>
    </BrowserRouter>
  );
};

export default NavBar;
