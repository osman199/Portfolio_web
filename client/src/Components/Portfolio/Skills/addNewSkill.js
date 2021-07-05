import React, { useState } from "react";
import { Accordion, Card, Form, Button, Badge } from "react-bootstrap";
import RangeSlider from "react-bootstrap-range-slider";
import { getCookieValue } from "../../../Sessions/CookiesController";
import axios from "axios";

export default function AddNewSkill(props) {
  const [currentLevel, setLevel] = useState(0);
  let listType = ["Language", "Programming", "Managegment"];

  let createBody = () => {
    let skillNameF = document.getElementById("formSkill").value;
    let typeF = document.getElementById("formType").value;
    let courseF = document.getElementById("formCourse").value;
    let projectF = document.getElementById("formProject").value;

    let body = {
      name: skillNameF,
      level: currentLevel,
      user: getCookieValue("id"),
    };
    if (courseF !== "Not selected") {
      props.listCourses.forEach((course) => {
        if (course.name.trim() === courseF) body.course = course._id;
      });
    }

    if (projectF !== "Not selected") {
      props.listProjects.forEach((project) => {
        if (project.name.trim() === projectF) body.project = project._id;
      });
    }
    if (typeF !== "Not selected") {
      body.type = typeF;
    }
    return body;
  };

  let resetForm = () => {
    document.getElementById("formSkill").value = "";
    document.getElementById("formType").value = "Not Selected";
    document.getElementById("formCourse").value = "Not Selected";
    document.getElementById("formProject").value = "Not Selected";
    setLevel(2);
  };

  let createSkill = () => {
    let body = createBody();
    axios
      .post(props.api + "/skills", body)
      .then((res) => {
        resetForm();
        props.updateSkills(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <br />
      <Accordion defaultActiveKey="0">
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="transparent" eventKey="0">
              <h1>
                <Badge variant="secondary">Add a New Skill</Badge>
              </h1>
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <Form>
                <Form.Group controlId="formSkill">
                  <Form.Label>Skill Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter the Name of the Skill"
                  />
                </Form.Group>
                <Form.Group controlId="formType">
                  <Form.Label>Type</Form.Label>
                  <Form.Control as="select">
                    <option>Not selected</option>
                    {listType.map((element, i) => (
                      <option key={i}>{element}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="formCourse">
                  <Form.Label>Course</Form.Label>
                  <Form.Control as="select">
                    <option>Not selected</option>
                    {props.listCourses.map((course) => (
                      <option key={course._id}>{course.name}</option>
                    ))}
                  </Form.Control>
                  <Form.Text className="text-muted">
                    Choose One of your courses if the Skill is related to it
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formProject">
                  <Form.Label>Projects</Form.Label>
                  <Form.Control as="select">
                    <option>Not selected</option>
                    {props.listProjects.map((project) => (
                      <option key={project._id}>{project.name}</option>
                    ))}
                  </Form.Control>
                  <Form.Text className="text-muted">
                    Choose One of your projects if the Skill is related to it
                  </Form.Text>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Level of the Skill</Form.Label>
                  <RangeSlider
                    value={currentLevel}
                    onChange={(e) => setLevel(e.target.value)}
                    step={1}
                    min={1}
                    max={5}
                  />
                </Form.Group>
                <Button variant="dark" type="button" onClick={createSkill}>
                  Add Skill
                </Button>
              </Form>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );
}
