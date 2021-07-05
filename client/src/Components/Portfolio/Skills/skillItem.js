import React, { Component } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import AddNewSkill from "./addNewSkill";
import ShowListSkills from "./listSkills";
import { getCookieValue } from "../../../Sessions/CookiesController";
import axios from "axios";

export default class skillItem extends Component {
  constructor(props) {
    super(props);
    this.state = { listCourses: [], listProjects: [], listSkills: [] };
  }

  componentDidMount() {
    axios
      .get(this.props.api + "/users/" + getCookieValue("id") + "/courses")
      .then(res => {
        this.setState({ listCourses: res.data });
      })
      .catch(error => {
        console.log(error.response.status);
      });
    axios
      .get(this.props.api + "/users/" + getCookieValue("id") + "/projects")
      .then(res => {
        this.setState({ listProjects: res.data });
      })
      .catch(error => {
        console.log(error.response.status);
      });
    axios
      .get(this.props.api + "/users/" + getCookieValue("id") + "/skills")
      .then(res => {
        this.setState({ listSkills: res.data.reverse() });
      })
      .catch(error => {
        console.log(error.response.status);
        this.setState({ listSkills: [] });
      });
  }

  updateSkills = data => {
    let temp = this.state.listSkills;
    temp.unshift(data);
    this.setState({ listSkills: temp });
  };

  removeSkill = idS => {
    axios
      .delete(this.props.api + "/skills/" + idS)
      .then(res => {
        let newSkills = [];
        this.state.listSkills.forEach(element => {
          if (element._id !== idS) newSkills.push(element);
        });
        this.setState({ listSkills: newSkills });
      })
      .catch(error => {
        console.log(error.response.status);
      });
  };

  patchSkillItem = data => {
    let newListSkillArray = [];
    this.state.listSkills.forEach(element => {
      if (data._id === element._id) newListSkillArray.push(data);
      else newListSkillArray.push(element);
    });
    this.setState({ listSkills: newListSkillArray });
  };

  showSkills = () => {
    if (this.state.listSkills.length !== 0) {
      return (
        <ShowListSkills
          api={this.props.api}
          listSkills={this.state.listSkills}
          listCourses={this.state.listCourses}
          listProjects={this.state.listProjects}
          removeSkill={this.removeSkill}
          patchSkillItem={this.patchSkillItem}
        />
      );
    } else
      return (
        <div>
          <br />
          <br />
          <Alert variant={"danger"}>
            There are no Skills registered for this User yet
          </Alert>
        </div>
      );
  };

  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col>
              <AddNewSkill
                api={this.props.api}
                listCourses={this.state.listCourses}
                listProjects={this.state.listProjects}
                updateSkills={this.updateSkills}
              />
            </Col>
            <Col>
              <Container>{this.showSkills()}</Container>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
