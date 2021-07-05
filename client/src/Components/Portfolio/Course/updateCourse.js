import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

export default class updateCourse extends Component {
  constructor(props) {
    super(props);
    this.state = { currentDegree: "Not Selected" };
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.data._id !== prevProps.data._id) {
      this.prevProps = this.props;
      this.updateDegreeNameAfterPropsChange();
    }
  }

  updateDegreeNameAfterPropsChange = () => {
    this.setState({ currentDegree: "Not Selected" });
    let degreeID = this.props.data.degree;
    this.props.listDegree.forEach((element) => {
      if (element._id === degreeID) {
        this.setState({ currentDegree: element.name });
      }
    });
  };

  patchNewValuesInCourse = () => {
    var patchObj = {};
    patchObj.name = document.getElementById("nameCourseModal").value;
    patchObj.grade = document.getElementById("gradeCourseModal").value;

    var newDegree = document.getElementById("patchDegree").value;
    this.props.listDegree.forEach((element) => {
      if (element.name === newDegree) {
        patchObj.degree = element._id;
      }
    });

    //request to remove the course from the previous degree item
    axios
      .patch(
        this.props.api +
          "/degrees/" +
          this.props.data.degree +
          "/courses/" +
          this.props.data._id +
          "/course"
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // request to patch the course which will automatically add the item to the updated Degree
    axios
      .patch(this.props.api + "/courses/" + this.props.data._id, patchObj)
      .then((res) => {
        console.log(res.data);
        let updatedObject = this.props.data;
        updatedObject.name = patchObj.name;
        updatedObject.grade = patchObj.grade;
        if (patchObj.degree !== undefined) {
          updatedObject.degree = patchObj.degree;
        }
        this.props.patchOneCourse(updatedObject);
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
            <Modal.Title>Course Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="nameCourseModal">
                <Form.Label>Course Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Course name"
                  defaultValue={this.props.data.name}
                />
              </Form.Group>
              <Form.Group controlId="gradeCourseModal">
                <Form.Label>Grades</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Grades"
                  defaultValue={this.props.data.grade}
                />
              </Form.Group>
              <Form.Group controlId="patchDegree">
                <Form.Label>Degree</Form.Label>
                <Form.Control
                  as="select"
                  defaultValue={this.state.currentDegree}
                >
                  <option>Not selected</option>

                  {this.props.listDegree.map((degree) => (
                    <option key={degree._id} value={degree.name}>
                      {degree.name}
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
            <Button variant="primary" onClick={this.patchNewValuesInCourse}>
              Update Course
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
