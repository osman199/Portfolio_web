const Course = require("../models/Course");
const Degree = require("../models/Degree");

const createCourse = (req, res) => {
  const course = new Course(req.body);
  Course.find(
    { name: req.body.name, grade: req.body.grade, user: req.body.user },
    (err, foundUser) => {
      console.log(foundUser.length);
      if (foundUser.length == 0) {
        course
          .save()
          .then(result => {
            // Adding the course to the Degrees if degree exists
            if (result.degree !== undefined) {
              var degreeId = result.degree;
              var courseId = result._id;

              Degree.findOneAndUpdate(
                { _id: degreeId },
                { $addToSet: { course: courseId } },
                { new: true },
                (err, foundDegree) => {
                  if (err) next();
                  //res.status(200).json(foundDegree);
                }
              ).catch(error => {
                if (error === 404) res.status(404).json();
                else res.status(500).json({ error: error });
              });
            }

            res.status(201).json(result);
          })
          .catch(error => {
            res.status(500).json({ error: error });
          });
      } else {
        res.status(404).json({ message: "already exists" });
      }
    }
  ).catch(error => {
    console.log("catch error");

    if (error === 404) res.status(404).json({ message: "already exists" });
    else res.status(500).json({ error: error });
  });
};

const updateCourse = (req, res) => {
  Course.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .exec()
    .then(result => {
      if (!result) throw 404;

      // RELATIONSHIP
      // Adding the course to the Degrees if degree exists
      if (result.degree !== undefined) {
        var degreeId = result.degree;
        var courseId = result._id;

        Degree.findOneAndUpdate(
          { _id: degreeId },
          { $addToSet: { course: courseId } },
          { new: true },
          (err, foundDegree) => {
            if (err) next();
            //res.status(200).json(foundDegree);
          }
        ).catch(error => {
          if (error === 404) res.status(404).json();
          else res.status(500).json({ error: error });
        });
      }
      res.status(200).json({ message: "Course Update" });
    })
    .catch(error => {
      if (error === 404) res.status(404).json({ message: "course not found" });
      else res.status(500).json({ message: error });
    });
};

const deleteCourse = (req, res) => {
  Course.findOneAndDelete({ _id: req.params.id })
    .exec()
    .then(result => {
      if (!result) throw 404;

      if (result.degree !== undefined) {
        var degreeId = result.degree;
        var courseId = result._id;

        Degree.findOneAndUpdate(
          { _id: degreeId },
          { $pull: { course: courseId } },
          { new: true },
          (err, foundDegree) => {
            if (err) next();
            //res.status(200).json(foundDegree);
          }
        ).catch(error => {
          if (error === 404) res.status(404).json();
          else res.status(500).json({ error: error });
        });
      }
      res.status(200).json(result);
    })
    .catch(error => {
      if (error === 404) res.status(404).json({ error: `user not found.` });
      else res.status(500).json({ error: error });
    });
};

const getCourseByID = (req, res, next) => {
  let id = req.params.id;

  Course.findById({ _id: id }, (err, foundCourse) => {
    if (err) throw 404;
    if (foundCourse === null) {
      res.status(404).json({ message: "notfound" });
    } else {
      res.status(200).json(foundCourse);
    }
  });
};

module.exports = {
  createCourse,
  updateCourse,
  deleteCourse,
  getCourseByID
};
