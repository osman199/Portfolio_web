import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import RangeSlider from "react-bootstrap-range-slider";
import axios from "axios";

export default class updateSkill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLevel: 0,
      currentCourseName: "Not Selected",
      currentProjectName: "Not Selected"
    };
    this.listType = ["Language", "Programming", "Managegment"];
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.data !== prevProps.data) {
      this.prevProps = this.props;
      this.renderCurrentCourseProjectLevel();
    }
  }
  renderCurrentCourseProjectLevel = () => {
    if (this.props.data.course !== undefined) {
      this.props.listCourses.forEach(element => {
        if (element._id === this.props.data.course)
          this.setState({ currentCourseName: element.name });
      });
    } else {
      this.setState({ currentCourseName: "Not Selected" });
    }
    if (this.props.data.project !== undefined) {
      this.props.listProjects.forEach(element => {
        if (element._id === this.props.data.project)
          this.setState({ currentProjectName: element.name });
      });
    } else {
      this.setState({ currentProjectName: "Not Selected" });
    }
    this.setState({ currentLevel: this.props.data.level });
  };

  patchNewValuesInSkill = () => {
    var patchObj = {};
    patchObj.name = document.getElementById("patchSkillName").value;
    patchObj.type = document.getElementById("patchType").value;
    patchObj.level = this.state.currentLevel;
    let course = document.getElementById("patchCourse").value;
    let project = document.getElementById("patchProject").value;
    if (course !== "Not Selected") {
      this.props.listCourses.forEach(element => {
        if (element.name.trim() === course.trim())
          patchObj.course = element._id;
      });
    }
    if (project !== "Not Selected") {
      this.props.listProjects.forEach(element => {
        let tempName = element.name.trim();
        if (tempName.trim() === project.trim()) patchObj.project = element._id;
      });
    }
    console.log(patchObj);
    axios
      .patch(this.props.api + "/skills/" + this.props.data._id, patchObj)
      .then(res => {
        console.log(res.data);
        let updatedObject = patchObj;
        updatedObject._id = this.props.data._id;
        this.props.patchSkillItem(updatedObject);
        this.props.updateSkillAfterPatch(updatedObject);
        this.props.handleClose();
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <Modal show={this.props.show} onHide={this.props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update the Skill Data</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="patchSkillName">
                <Form.Label>Skill Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter the Name of the Skill"
                  defaultValue={this.props.data.name}
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
              <Form.Group controlId="patchCourse">
                <Form.Label>Course</Form.Label>
                <Form.Control
                  as="select"
                  defaultValue={this.state.currentCourseName}
                >
                  <option>Not Selected</option>
                  {this.props.listCourses.map(course => (
                    <option key={course._id} value={course.name}>
                      {course.name}
                    </option>
                  ))}
                </Form.Control>
                <Form.Text className="text-muted">
                  Choose One of your courses if the Skill is related to it
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="patchProject">
                <Form.Label>Projects</Form.Label>
                <Form.Control
                  as="select"
                  defaultValue={this.state.currentProjectName}
                >
                  <option>Not selected</option>
                  {this.props.listProjects.map(project => (
                    <option key={project._id} value={project.name}>
                      {project.name}
                    </option>
                  ))}
                </Form.Control>
                <Form.Text className="text-muted">
                  Choose One of your projects if the Skill is related to it
                </Form.Text>
              </Form.Group>
              <Form.Group>
                <Form.Label>Level of the Skill</Form.Label>
                <RangeSlider
                  value={this.state.currentLevel}
                  onChange={e =>
                    this.setState({ currentLevel: e.target.value })
                  }
                  step={1}
                  min={1}
                  max={5}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.patchNewValuesInSkill}>
              Update Skill
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
