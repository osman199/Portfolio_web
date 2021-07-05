const express = require("express");
const router = express.Router();

const degreeController = require("../controllers/degree");

router.get("/:id", degreeController.getDegreebyID);
router.post("/", degreeController.createDegree);
router.patch("/:id", degreeController.patchDegree);
router.patch("/:id/courses/:courseID", degreeController.addCourseID);
router.patch("/:id/courses/:courseID/course", degreeController.removeCourseID);
router.delete("/:id", degreeController.deleteDegree);

module.exports = router;
