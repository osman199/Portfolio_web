import React, { useState } from "react";
import { Accordion, Card, Form, Button } from "react-bootstrap";
import { getCookieValue } from "../../../Sessions/CookiesController";
import axios from "axios";

export default function AddNewDegree(props) {
  let listType = ["Under Graduate", "Bachelors", "Masters", "Doctorate"];
  let [checked, newChecked] = useState(false);

  let createDegree = () => {
    let body = {};
    body.name = document.getElementById("formName").value;
    body.school = document.getElementById("formSchool").value;
    body.type = document.getElementById("formType").value;
    body.user = getCookieValue("id");
    body.completed = document.getElementById("formCompleted").value;
    axios
      .post(props.api + "/degrees/", body)
      .then((res) => {
        let respo = res.data;
        props.addDegreeToList(respo);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  return (
    <div>
      <br />
      <Accordion defaultActiveKey="0">
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="secondry" eventKey="0">
              Add a new Degree
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <Form>
                <Form.Group controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter the name of the degree"
                  />
                </Form.Group>
                <Form.Group controlId="formSchool">
                  <Form.Label>Institute Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter the name of the Institute"
                  />
                </Form.Group>

                <Form.Group controlId="formCompleted">
                  <Form.Check
                    type="checkbox"
                    label="Completed"
                    value={checked}
                    onChange={() => newChecked(!checked)}
                  />
                </Form.Group>

                <Form.Group controlId="formType">
                  <Form.Label>Type</Form.Label>
                  <Form.Control as="select" defaultValue="Not Selected">
                    <option>Not Selected</option>
                    {listType.map((element, i) => (
                      <option key={i} value={element}>
                        {element}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Button variant="primary" type="button" onClick={createDegree}>
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );
}
