import React, { Component } from "react";
import { Container, Jumbotron } from "react-bootstrap/";
import { getCookieValue } from "../Sessions/CookiesController";
import ProfileItem from "../Components/Profile/ProfileItem";
import axios from "axios";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { info: {}, edit: false };
  }

  componentDidMount() {
    let id = getCookieValue("id");
    if (id !== null) {
      axios
        .get(this.props.api + "/users/" + id)
        .then((res) => {
          this.setState({ info: res.data });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Id is missing");
    }
  }

  updateInfo = (infoObject) => {
    this.setState({ info: infoObject });
  };

  render() {
    console.log(this.props.signedIn);
    if (this.props.signedIn) {
      return (
        <Container className="main-container">
          <Jumbotron className="main-container">
            <ProfileItem info={this.state.info} updateInfo={this.updateInfo} />
          </Jumbotron>
        </Container>
      );
    } else {
      return (
        <Container>
          <Jumbotron fluid>
            <h1>
              Error 404 : This Page is not accessible if the user is not logged
              in!
            </h1>
          </Jumbotron>
        </Container>
      );
    }
  }
}
