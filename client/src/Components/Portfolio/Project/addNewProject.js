import React, { useState } from "react";
import { Accordion, Card, Form, Button, Toast } from "react-bootstrap";
import axios from "axios";

export default function AddNewProject(props) {
  const [show, setShow] = useState(false);
  const [message, newMessage] = useState("");
  let nameRef = React.useRef(null);
  let linkRef = React.useRef(null);
  let detailRef = React.useRef(null);
  let pictureRef = React.useRef(null);

  let resetForm = () => {
    nameRef.current.value = "";
    linkRef.current.value = "";
    detailRef.current.value = "";
    pictureRef.current.value = "";
  };

  let createProject = () => {
    let nameF = nameRef.current.value;
    let linkF = linkRef.current.value;
    let detailF = detailRef.current.value;
    let pictureF = pictureRef.current.value;
    let bodyO = {};
    if (nameF === "" || detailF === "") {
      setShow(true);
      newMessage(
        "You have to provide atleast Name and detail for the project."
      );
      return null;
    } else {
      bodyO.user = props.userID;
      bodyO.name = nameF;
      bodyO.detail = detailF;
      if (linkF !== "") bodyO.link = linkF;
      if (pictureF !== "") bodyO.picture = pictureF;
    }

    axios
      .post(props.api + "/projects/", bodyO)
      .then((res) => {
        console.log(res.data);
        props.addNewProject(res.data);
        resetForm();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div>
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </div>

      <Accordion defaultActiveKey="0">
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="transparent" eventKey="0">
              Add details for your new Project
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <Form>
                <Form.Group controlId="formName">
                  <Form.Label>Project Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter the Name of the Project"
                    ref={nameRef}
                  />
                </Form.Group>
                <Form.Group controlId="formLink">
                  <Form.Label>External Link</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Link to your project"
                    ref={linkRef}
                  />
                </Form.Group>
                <Form.Group controlId="fromPictureLink">
                  <Form.Label>Picture</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="A link to A picture of your project"
                    ref={pictureRef}
                  />
                </Form.Group>
                <Form.Group controlId="formDetails">
                  <Form.Label>Detailed Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Maximum 200 Letters"
                    ref={detailRef}
                  />
                </Form.Group>
                <Button variant="dark" type="button" onClick={createProject}>
                  Add Project
                </Button>
              </Form>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );
}
