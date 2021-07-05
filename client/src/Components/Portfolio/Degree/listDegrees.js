import React, { useState } from "react";
import { Container, Card, Modal, Button, ListGroup } from "react-bootstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ScrollArea from "react-scrollbar";
import "./listDegrees.css";
import axios from "axios";
import UpdateDegrees from "./updateDegree";

export default function ListDegrees(props) {
  const [show, setShow] = useState(false);
  const [currentDegree, updateDegree] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let loadDegreeByID = (id) => {
    axios
      .get(props.api + "/degrees/" + id)
      .then((res) => {
        updateDegree(res.data);
        handleShow();
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  return (
    <Container>
      <br />
      <UpdateDegrees
        show={show}
        handleClose={handleClose}
        api={props.api}
        data={currentDegree}
        patchUpdatedDegree={props.patchUpdatedDegree}
      />
      <Card>
        <Modal.Header>Your Degrees</Modal.Header>
        <ScrollArea className="react-scrollbar-default">
          <ListGroup style={{ marginBottom: "1rem" }}>
            <TransitionGroup className="todo-list">
              {props.arrayDegrees.map(({ _id, name }) => (
                <CSSTransition key={_id} timeout={800} classNames="item">
                  <ListGroup.Item>
                    {name}
                    <Button
                      className="remove-btn"
                      variant="light"
                      size="sm"
                      onClick={() => {
                        loadDegreeByID(_id);
                      }}
                    >
                      &hellip;
                    </Button>
                    <Button
                      className="remove-btn"
                      variant="danger"
                      size="sm"
                      onClick={() => {
                        props.removeDegree(_id);
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
