import React, { useState } from "react";
import {
  ListGroup,
  Card,
  Modal,
  Badge,
  Button,
  Container,
} from "react-bootstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./listCourses.css";
import ScrollArea from "react-scrollbar";
import UpdateCourse from "./updateCourse";
import axios from "axios";

export default function ListCourses(props) {
  const [show, setShow] = useState(false);
  const [currentCourse, updateCourse] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const loadCourseByID = (_id) => {
    axios
      .get(props.api + "/courses/" + _id)
      .then((res) => {
        const newRes = res.data;
        updateCourse(newRes);
        handleShow();
        console.log(currentCourse);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container>
      <UpdateCourse
        api={props.api}
        show={show}
        handleClose={handleClose}
        data={currentCourse}
        listDegree={props.listDegree}
        patchOneCourse={props.patchOneCourse}
      />
      <Card>
        <Modal.Header>
          <h1>
            <Badge variant="secondary">Your Courses</Badge>
          </h1>
        </Modal.Header>
        <ScrollArea className="react-scrollbar-default">
          <ListGroup style={{ marginBottom: "1rem" }}>
            <TransitionGroup className="todo-list">
              {props.arrayCourse.map(({ _id, name }) => (
                <CSSTransition key={_id} timeout={800} classNames="item">
                  <ListGroup.Item>
                    {name}
                    <Button
                      className="remove-btn"
                      variant="light"
                      size="sm"
                      onClick={() => {
                        loadCourseByID(_id);
                      }}
                    >
                      &hellip;
                    </Button>
                    <Button
                      className="remove-btn"
                      variant="danger"
                      size="sm"
                      onClick={() => {
                        props.removeCourse(_id);
                      }}
                    >
                      &times;
                    </Button>
                  </ListGroup.Item>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </ListGroup>
        </ScrollArea>
      </Card>
    </Container>
  );
}
