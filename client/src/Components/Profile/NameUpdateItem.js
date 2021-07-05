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

export default function NameUpdateItem(props) {
  const [show, setShow] = useState(false);
  const [showSuccess, setSuccess] = useState(false);

  const updateName = () => {
    var nameU = document.getElementById("update-name").value;
    var surnameU = document.getElementById("update-surname").value;
    var api = "http://localhost:3001/api";
    if (nameU === "" || surnameU === "") {
      setShow(true);
    } else {
      var body = {
        name: nameU,
        surname: surnameU,
      };

      axios
        .patch(api + "/users/" + getCookieValue("id"), body)
        .then((response) => {
          if (response.status === 200) {
            document.getElementById("update-name").value = "";
            document.getElementById("update-surname").value = "";
            var newInfo = props.oldInfo;
            setSuccess(true);
            newInfo.name = body.name;
            newInfo.surname = body.surname;
            props.updateInfo(newInfo);
          }
        })
        .catch((error) => {
          alert(error);
        });
    }
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
          Both Name and Surname has to be written!
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
                <Form.Group as={Col} controlId="update-name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder={props.user_name} />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="update-surname">
                  <Form.Label>Surname</Form.Label>
                  <Form.Control type="text" placeholder={props.user_surname} />
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
