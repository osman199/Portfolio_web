import React, { useState } from "react";
import { ListGroup, Card, Modal, Badge, Button } from "react-bootstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./listSkills.css";
import ScrollArea from "react-scrollbar";
import UpdatetSkill from "./updateSkill";
import axios from "axios";

export default function ListSkills(props) {
  const [show, setShow] = useState(false);
  const [currentSkill, updateSkill] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const loadSkillByID = _id => {
    axios
      .get(props.api + "/skills/" + _id)
      .then(res => {
        const newRes = res.data;
        updateSkill(newRes);
        handleShow();
      })
      .catch(error => {
        console.log(error);
      });
  };

  const updateSkillAfterPatch = data => {
    updateSkill(data);
  };

  return (
    <section>
      <br />
      <UpdatetSkill
        show={show}
        handleClose={handleClose}
        api={props.api}
        data={currentSkill}
        listSkills={props.listSkills}
        listCourses={props.listCourses}
        listProjects={props.listProjects}
        patchSkillItem={props.patchSkillItem}
        updateSkillAfterPatch={updateSkillAfterPatch}
      />

      <Card>
        <Modal.Header>
          <h1>
            <Badge variant="secondary">Your Skills</Badge>
          </h1>
        </Modal.Header>
        <ScrollArea className="react-scrollbar-default">
          <ListGroup style={{ marginBottom: "1rem" }}>
            <TransitionGroup className="todo-list">
              {props.listSkills.map(({ _id, name }) => (
                <CSSTransition key={_id} timeout={800} classNames="item">
                  <ListGroup.Item>
                    {name}
                    <Button
                      className="remove-btn"
                      variant="light"
                      size="sm"
                      onClick={() => {
                        loadSkillByID(_id);
                      }}
                    >
                      &hellip;
                    </Button>
                    <Button
                      className="remove-btn"
                      variant="danger"
                      size="sm"
                      onClick={() => {
                        props.removeSkill(_id);
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
    </section>
  );
}
