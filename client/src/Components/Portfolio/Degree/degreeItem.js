import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { getCookieValue } from "../../../Sessions/CookiesController";
import axios from "axios";
import AddNewDegree from "./addNewDegree";
import ListDegrees from "./listDegrees";

export default class DegreeItem extends Component {
  constructor(props) {
    super(props);
    this.state = { listDegrees: [] };
  }
  componentDidMount() {
    axios
      .get(this.props.api + "/users/" + getCookieValue("id") + "/degrees")
      .then((res) => {
        this.setState({ listDegrees: res.data });
        console.log(this.state.listDegrees);
      })
      .catch((error) => {
        console.log(error.response.status);
      });
  }

  addDegreeToList = (data) => {
    let newDegreesList = this.state.listDegrees;
    newDegreesList.push(data);
    this.setState({ listDegrees: newDegreesList });
  };

  removeDegree = (_id) => {
    axios
      .delete(this.props.api + "/degrees/" + _id)
      .then((res) => {
        let newDegrees = [];
        this.state.listDegrees.forEach((element) => {
          if (element._id !== _id) newDegrees.push(element);
        });
        this.setState({ listDegrees: newDegrees });
      })
      .catch((error) => {
        console.log(error.response.status);
      });
  };
  patchUpdatedDegree = (data) => {
    let newList = [];
    this.state.listDegrees.forEach((element) => {
      if (element._id === data._id) {
        newList.push(data);
      } else {
        newList.push(element);
      }
    });
    this.setState({ listDegrees: newList });
  };

  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col>
              <AddNewDegree
                api={this.props.api}
                addDegreeToList={this.addDegreeToList}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <ListDegrees
                api={this.props.api}
                arrayDegrees={this.state.listDegrees}
                removeDegree={this.removeDegree}
                patchUpdatedDegree={this.patchUpdatedDegree}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
