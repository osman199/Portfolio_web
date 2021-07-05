import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

export default class updateDegrgee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    };

    this.listType = ["Under Graduate", "Bachelors", "Masters", "Doctorate"];
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.data !== prevProps.data) {
      this.prevProps = this.props;
      this.renderCurrentValues();
    }
  }
  renderCurrentValues = () => {
    if (this.props.data.completed === false) {
      this.setState({ checked: false });
    } else {
      this.setState({ checked: true });
    }
  };

  patchNewValuesInDegree = () => {
    let body = this.props.data;
    body.name = document.getElementById("patchName").value;
    body.school = document.getElementById("patchSchool").value;
    body.type = document.getElementById("patchType").value;
    body.completed = document.getElementById("patchCompleted").value;

    axios
      .patch(this.props.api + "/degrees/" + this.props.data._id, body)
      .then((res) => {
        let respo = res.data;
        console.log(respo);
        this.props.patchUpdatedDegree(body);
        this.props.handleClose();
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  render() {
    return (
      <div>
        <Modal show={this.props.show} onHide={this.props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update your Degree</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="patchName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" defaultValue={this.props.data.name} />
              </Form.Group>
              <Form.Group controlId="patchSchool">
                <Form.Label>Institute Name</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={this.props.data.school}
                />
              </Form.Group>

              <Form.Group controlId="patchCompleted">
                <Form.Check
                  type="checkbox"
                  label="Completed"
                  defaultChecked={this.props.data.completed}
                  value={this.state.checked}
                  onChange={() =>
                    this.setState({ checked: !this.state.checked })
                  }
                />
              </Form.Group>

              <Form.Group controlId="patchType">
                <Form.Label>Type</Form.Label>
                <Form.Control as="select" defaultValue={this.props.data.type}>
                  <option>Not Selected</option>
                  {this.listType.map((element, i) => (
                    <option key={i} value={element}>
                      {element}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.patchNewValuesInDegree}>
              Update Degree
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
