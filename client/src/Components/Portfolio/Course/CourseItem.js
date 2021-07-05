import React, { Component } from "react";
import { Container, Jumbotron, Row, Col, Alert } from "react-bootstrap";
import CreateCourseItem from "./CreateCourseItem";
import ListCourses from "./listCourses";
import { getCookieValue } from "../../../Sessions/CookiesController";
import axios from "axios";

export default class AddCourseItem extends Component {
  constructor(props) {
    super(props);
    this.state = { listDegree: [], listCourse: [] };
    this.userID = getCookieValue("id");
  }

  updateInfo = (degreeOrCourse, data) => {
    if (degreeOrCourse === "degree") this.setState({ listDegree: data });
    if (degreeOrCourse === "course") this.setState({ listCourse: data });
  };

  componentDidMount() {
    axios
      .get(this.props.api + "/users/" + this.userID + "/degrees")
      .then((res) => {
        this.updateInfo("degree", res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(this.props.api + "/users/" + this.userID + "/courses")
      .then((res) => {
        this.updateInfo("course", res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  addNewCourse = (data) => {
    let newCourses = this.state.listCourse;
    newCourses.unshift(data);
    this.setState({ listCourse: newCourses });
  };

  patchOneCourse = (data) => {
    let newListCourseArray = [];
    this.state.listCourse.forEach((element) => {
      if (data._id === element._id) newListCourseArray.push(data);
      else newListCourseArray.push(element);
    });
    this.setState({ listCourse: newListCourseArray });
  };

  removeCourse = (idCourse) => {
    axios
      .delete(this.props.api + "/courses/" + idCourse)
      .then((resp) => {
        console.log(resp);
        let newCourses = [];
        this.state.listCourse.forEach((element) => {
          if (element._id !== idCourse) newCourses.push(element);
        });
        this.setState({ listCourse: newCourses });
      })
      .catch((error) => {
        Alert(error);
      });
  };

  render() {
    return (
      <div>
        <Container>
          <br />
          <Row>
            <Col>
              <CreateCourseItem
                userID={this.userID}
                listDegree={this.state.listDegree}
                api={this.props.api}
                addNewCourse={this.addNewCourse}
              />
            </Col>
            <Col>
              <ListCourses
                userID={this.userID}
                arrayCourse={this.state.listCourse}
                api={this.props.api}
                removeCourse={this.removeCourse}
                patchOneCourse={this.patchOneCourse}
                listDegree={this.state.listDegree}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
