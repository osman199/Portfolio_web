import React from "react";
import "../Register/RegisterItem.css";
import axios from "axios";
import {
  Form,
  Button,
  Col,
  Container,
  Jumbotron,
  Modal,
} from "react-bootstrap";

export const RegisterItem = (props) => {
  const registerAxios = () => {
    var name = document.getElementById("name").value;
    var surname = document.getElementById("surname").value;
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var email = document.getElementById("email").value;
    var age = document.getElementById("age").value;
    var city = document.getElementById("city").value;
    var country = document.getElementById("country").value;
    var address = document.getElementById("address").value;

    var registerObject = {
      name: name,
      surname: surname,
      username: username,
      password: password,
      email: email,
      age: age,
      city: city,
      country: country,
      address: address,
    };
    axios
      .post(props.api + "/users/", registerObject)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        var res = error.response.data;
        var code = error.response.status;
        console.log(code + res);
      });
  };

  return (
    <div>
      <Jumbotron fluid>
        <Container>
          <Modal.Header>
            <Modal.Title>Register User</Modal.Title>
          </Modal.Header>
          <Form className="registerForm">
            <Form.Row>
              <Form.Group as={Col} controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" />
              </Form.Group>

              <Form.Group as={Col} controlId="surname">
                <Form.Label>Surname</Form.Label>
                <Form.Control type="text" placeholder="Enter surname" />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter your Username" />
              </Form.Group>

              <Form.Group as={Col} controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" />
              </Form.Group>

              <Form.Group as={Col} controlId="age">
                <Form.Label>Age</Form.Label>
                <Form.Control type="number" placeholder="Your Age" />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control type="text" placeholder="Enter city" />
              </Form.Group>

              <Form.Group as={Col} controlId="country">
                <Form.Label>Country</Form.Label>
                <Form.Control type="text" placeholder="country" />
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control placeholder="1234 Main St" />
            </Form.Group>
            <Modal.Footer>
              <Button
                variant="primary"
                type="button"
                href="/login"
                onClick={registerAxios}
              >
                Register
              </Button>
            </Modal.Footer>
          </Form>
        </Container>
      </Jumbotron>
    </div>
  );
};

export default RegisterItem;
