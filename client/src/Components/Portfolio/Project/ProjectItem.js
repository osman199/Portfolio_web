import React, { Component } from "react";
import { Container, Jumbotron, Row, Col } from "react-bootstrap";
import { getCookieValue } from "../../../Sessions/CookiesController";
import axios from "axios";
import AddNewProject from "./addNewProject";
import PojectList from "./listProjects";

export default class ProjectItem extends Component {
  constructor(props) {
    super(props);
    this.state = { listProjects: [] };
    this.userID = getCookieValue("id");
  }

  componentDidMount() {
    axios
      .get(this.props.api + "/users/" + this.userID + "/projects")
      .then((res) => {
        this.setState({ listProjects: res.data });
        console.log(this.state.listProjects);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  addNewProject = (data) => {
    let newProjects = this.state.listProjects;
    newProjects.unshift(data);
    this.setState({ listProjects: newProjects });
  };

  patchOneProject = (data) => {
    let newListProjectArray = [];
    this.state.listProjects.forEach((element) => {
      if (data._id === element._id) newListProjectArray.push(data);
      else newListProjectArray.push(element);
    });
    this.setState({ listProjects: newListProjectArray });
  };

  removeProject = (idProject) => {
    axios
      .delete(this.props.api + "/projects/" + idProject)
      .then((resp) => {
        let newProjects = [];
        this.state.listProjects.forEach((element) => {
          if (element._id !== idProject) newProjects.push(element);
        });
        this.setState({ listProjects: newProjects });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <Container>
          <br />
          <Row>
            <Col>
              <AddNewProject
                api={this.props.api}
                userID={this.userID}
                addNewProject={this.addNewProject}
                /*Recieves an object which will be added to the List */
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <PojectList
                api={this.props.api}
                userID={this.userID}
                listProjects={this.state.listProjects}
                /*Recieves the Projects ID to remove it from
                  the database and reupdate the state*/
                removeProject={this.removeProject}
                /* Receives the patched object to be replaced in
                  the main list*/
                patchOneProject={this.patchOneProject}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
