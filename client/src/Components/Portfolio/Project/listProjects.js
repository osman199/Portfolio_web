import React, { useState } from "react";
import "./listProjects.css";
import {
  ListGroup,
  Card,
  Modal,
  Badge,
  Button,
  Container,
} from "react-bootstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ScrollArea from "react-scrollbar";
import axios from "axios";
import UpdateProject from "./updateProject";

const ListProjects = (props) => {
  const [show, setShow] = useState(false);
  const [currentProject, newProject] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const loadProjectByID = (_id) => {
    axios
      .get(props.api + "/projects/" + _id)
      .then((res) => {
        const newRes = res.data;
        newProject(newRes);
        handleShow();
        console.log(currentProject);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Container>
        <UpdateProject
          api={props.api}
          show={show}
          handleClose={handleClose}
          data={currentProject}
          listDegree={props.listDegree}
          patchOneProject={props.patchOneProject}
          userID={props.userID}
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
                {props.listProjects.map(({ _id, name }) => (
                  <CSSTransition key={_id} timeout={800} classNames="item">
                    <ListGroup.Item>
                      {name}
                      <Button
                        className="remove-btn"
                        variant="light"
                        size="sm"
                        onClick={() => {
                          loadProjectByID(_id);
                        }}
                      >
                        &hellip;
                      </Button>
                      <Button
                        className="remove-btn"
                        variant="danger"
                        size="sm"
                        onClick={() => {
                          props.removeProject(_id);
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
    </div>
  );
};

export default ListProjects;
