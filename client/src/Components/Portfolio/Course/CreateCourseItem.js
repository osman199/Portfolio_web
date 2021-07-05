import React, { useState } from "react";
import { Card, Modal, Badge, Button, Form, Toast } from "react-bootstrap";
import axios from "axios";

export default function CreateCourseItem(props) {
  const [show, setShow] = useState(false);
  const [message, newMessage] = useState("");

  const saveCourse = () => {
    let course = document.getElementById("nameCourse").value;
    let grades = document.getElementById("courseGrade").value;
    let degreeDom = document.getElementById("nameDegree").value;
    let userC = props.userID;
    let body = {};

    if (degreeDom === "Not selected") {
      body = { name: course, grade: grades, user: userC };
    } else {
      let degreeId = "";
      props.listDegree.forEach((degree) => {
        if (degree.name === degreeDom) degreeId = degree._id;
      });
      // Another way for taking out one element from array and keep the remaining in the list
      // setItems((items) => items.filter((item) => item.id !== id))
      body = { name: course, grade: grades, degree: degreeId, user: userC };
    }
    axios
      .post(props.api + "/courses", body)
      .then((res) => {
        newMessage(res.data.name + " was Added!");
        setShow(true);
        props.addNewCourse(res.data);
      })
      .catch((error) => {
        var res = error.response.data;
        var code = error.response.status;
        newMessage("status code :" + code + " " + res);
        setShow(true);
      });
  };

  return (
    <div>
      <Card>
        <Modal.Header>
          <h1>
            <Badge variant="secondary">Add Course</Badge>
          </h1>
        </Modal.Header>
        <Card.Body>
          <Form>
            <Form.Group controlId="nameCourse">
              <Form.Label>Course Name</Form.Label>
              <Form.Control type="text" placeholder="Course name" />
            </Form.Group>
            <Form.Group controlId="courseGrade">
              <Form.Label>Grades</Form.Label>
              <Form.Control type="text" placeholder="Grades" />
            </Form.Group>

            <Form.Group controlId="nameDegree">
              <Form.Label>Degree</Form.Label>
              <Form.Control as="select">
                <option>Not selected</option>
                {/* {props.listCourse.map((course) => (
                  <option key={course.id}>{course.name}</option>
                ))} */}
                {props.listDegree.map((degree) => (
                  <option key={degree._id}>{degree.name}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Modal.Footer>
              <Button variant="primary" type="button" onClick={saveCourse}>
                Add Course
              </Button>
            </Modal.Footer>
          </Form>
        </Card.Body>
      </Card>
      <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </div>
  );
}
