import React, { Component } from "react";
import { Modal, Button, Form, Card } from "react-bootstrap";
import axios from "axios";

export default class UpdateProject extends Component {
  constructor(props) {
    super(props);
    this.nameRef = React.createRef();
    this.linkRef = React.createRef();
    this.detailRef = React.createRef();
    this.pictureRef = React.createRef();
  }
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.data._id !== prevProps.data._id) {
      this.prevProps = this.props;
    }
  }

  patchNewValuesInProject = () => {
    let nameF = this.nameRef.current.value;
    let linkF = this.linkRef.current.value;
    let detailF = this.detailRef.current.value;
    let pictureF = this.pictureRef.current.value;
    let bodyO = {};
    if (nameF === "" || detailF === "") {
      alert("You have to provide atleast Name and detail for the project.");
      return null;
    } else {
      bodyO.user = this.props.userID.trim();
      bodyO.name = nameF.trim();
      bodyO.detail = detailF.trim();
      if (linkF !== "") bodyO.link = linkF.trim();
      if (pictureF !== "") bodyO.picture = pictureF.trim();
    }

    axios
      .patch(this.props.api + "/projects/" + this.props.data._id, bodyO)
      .then((res) => {
        this.props.patchOneProject(res.data);
        this.props.handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    return (
      <div>
        <Modal animation show={this.props.show} onHide={this.props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Project Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card.Body>
              <Form>
                <Form.Group>
                  <Form.Label>Project Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter the Name of the Project"
                    ref={this.nameRef}
                    defaultValue={this.props.data.name}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>External Link</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Link to your project"
                    ref={this.linkRef}
                    defaultValue={this.props.data.link}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Picture</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="A link to A picture of your project"
                    ref={this.pictureRef}
                    defaultValue={this.props.data.picture}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Detailed Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Maximum 200 Letters"
                    ref={this.detailRef}
                    defaultValue={this.props.data.detail}
                  />
                </Form.Group>
              </Form>
            </Card.Body>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.patchNewValuesInProject}>
              Update Project
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
