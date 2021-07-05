import React, { useState } from "react";
import {
  Form,
  Button,
  Col,
  Container,
  Modal,
  Card,
  Alert,
} from "react-bootstrap";
import axios from "axios";
import { getCookieValue } from "../../Sessions/CookiesController";

export default function ProfileUpdateItem(props) {
  const [show, setShow] = useState(false);
  const [showSuccess, setSuccess] = useState(false);

  const updateName = () => {
    var DOMValue = document.getElementById(`${props.controlID}`).value;
    var api = "http://localhost:3001/api";
    if (DOMValue === "") {
      setShow(true);
    } else {
      var body = `{"` + props.itemToUpdate + `" : "` + DOMValue + `"}`;
      body = JSON.parse(body);
      axios
        .patch(api + "/users/" + getCookieValue("id"), body)
        .then((response) => {
          if (response.status === 200) {
            var newInfo = props.oldInfo;
            setSuccess(true);
            newInfo = getRightUpdateBody(body, newInfo);
            props.updateInfo(newInfo);
            document.getElementById(`${props.controlID}`).value = "";
          }
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  const getRightUpdateBody = (body, newInfo) => {
    if (body.email !== undefined) {
      newInfo.email = body.email;
      return newInfo;
    } else if (body.username !== undefined) {
      newInfo.username = body.username;
      return newInfo;
    } else if (body.password !== undefined) {
      newInfo.password = body.password;
      return newInfo;
    } else if (body.address !== undefined) {
      newInfo.address = body.address;
      return newInfo;
    } else if (body.city !== undefined) {
      newInfo.city = body.city;
      return newInfo;
    } else if (body.country !== undefined) {
      newInfo.country = body.country;
      return newInfo;
    }
    return null;
  };

  const returnDoneALert = () => {
    if (showSuccess) {
      return (
        <Alert variant="success" onClose={() => setSuccess(false)} dismissible>
          The Update was successful!
        </Alert>
      );
    } else return null;
  };
  const returnErrorALert = () => {
    if (show) {
      return (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          The Value is empty!
        </Alert>
      );
    } else return null;
  };

  return (
    <div>
      <Container>
        <Card>
          <Card.Body>
            <Modal.Header>
              <Modal.Title>Update User</Modal.Title>
            </Modal.Header>
            <Form className="registerForm">
              <Form.Row>
                <Form.Group as={Col} controlId={props.controlID}>
                  <Form.Label>{props.formLabel}</Form.Label>
                  <Form.Control
                    type={props.inputType}
                    placeholder="Enter the new Value here"
                  />
                </Form.Group>
              </Form.Row>

              <Modal.Footer>
                <Button variant="primary" type="button" onClick={updateName}>
                  Update
                </Button>
              </Modal.Footer>
            </Form>
          </Card.Body>
        </Card>
      </Container>
      {returnErrorALert()}
      {returnDoneALert()}
    </div>
  );
}
