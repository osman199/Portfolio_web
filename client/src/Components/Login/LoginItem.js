import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";
import { setCookies } from "../../Sessions/CookiesController";
import {
  Form,
  Button,
  Container,
  Card,
  Jumbotron,
  Badge,
  Modal
} from "react-bootstrap";

export const LoginItem = ({ signedIn, onSignIn, changeIsSignedIn }) => {
  var api = "http://localhost:3001/api";

  const submitLogin = () => {
    var emailV = document.getElementById("email").value;
    var passV = document.getElementById("password").value;
    axios
      .post(api + "/users/login", { email: emailV, password: passV })
      .then(res => {
        var authenticated = res.data.authenticated;
        if (authenticated) {
          setCookies(res, 1);
        }
        changeIsSignedIn(authenticated);
        console.log(res.data);
      })
      .catch(error => {
        var res = error.response.data;
        var code = error.response.status;
        console.log(code);
        var authenticated = res.authenticated;
        changeIsSignedIn(authenticated);
      });
  };

  if (signedIn) {
    return (
      <Jumbotron fluid>
        <Container>
          <h1>The user is Logged In </h1>
        </Container>
      </Jumbotron>
    );
  } else {
    return (
      <div>
        <Jumbotron fluid>
          <Container className="loginBox">
            <Card>
              <Modal.Header>
                <h1>
                  <Badge variant="secondary">Login</Badge>
                </h1>
              </Modal.Header>
              <Card.Body>
                <Form>
                  <Form.Group controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                  </Form.Group>
                  <Modal.Footer>
                    <LinkContainer to="/">
                      <Button variant="primary" onClick={onSignIn}>
                        Sign in with Google
                      </Button>
                    </LinkContainer>
                    <LinkContainer to="/">
                      <Button
                        variant="primary"
                        type="button"
                        onClick={submitLogin}
                      >
                        Sign in
                      </Button>
                    </LinkContainer>
                  </Modal.Footer>
                </Form>
              </Card.Body>
            </Card>
          </Container>
        </Jumbotron>
      </div>
    );
  }
};

export default LoginItem;
