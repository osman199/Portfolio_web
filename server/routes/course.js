const express = require("express");
const router = express.Router();

const courseController = require("../controllers/course");

router.get("/:id", courseController.getCourseByID);

router.post("/", courseController.createCourse);

router.patch("/:id", courseController.updateCourse);

router.delete("/:id", courseController.deleteCourse);

module.exports = router;
