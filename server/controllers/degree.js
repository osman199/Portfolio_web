const Degree = require("../models/Degree");

const createDegree = (req, res) => {
  const degree = new Degree(req.body);

  degree
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};

const addCourseID = (req, res) => {
  var degreeId = req.params.id;
  var courseId = req.params.courseID;

  Degree.findOneAndUpdate(
    { _id: degreeId },
    { $addToSet: { course: courseId } },
    { new: true },
    (err, foundDegree) => {
      res.status(200).json(foundDegree);
    }
  ).catch((error) => {
    if (error === 404) res.status(404).json();
    else res.status(500).json({ error: error });
  });
};

const deleteDegree = (req, res) => {
  Degree.findOneAndDelete({ _id: req.params.id })
    .exec()
    .then((result) => {
      if (!result) throw 404;

      res.status(200).json(result);
    })
    .catch((error) => {
      if (error === 404) res.status(404).json({ error: `degree not found.` });
      else res.status(500).json({ error: error });
    });
};

const getDegreebyID = (req, res, next) => {
  let id = req.params.id;

  Degree.findById({ _id: id }, (err, foundDegree) => {
    if (err) throw 404;
    if (foundDegree === null) {
      res.status(404).json({ message: "notfound" });
    } else {
      res.status(200).json(foundDegree);
    }
  });
};

const patchDegree = (req, res, next) => {
  let newbody = req.body;
  let id = req.params.id;
  Degree.updateOne({ _id: id }, { $set: newbody }, (error, updatedDegree) => {
    if (error) {
      return next(error);
    }
    if (updatedDegree === null) {
      res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(updatedDegree);
  });
};

const removeCourseID = (req, res) => {
  var degreeId = req.params.id;
  var courseId = req.params.courseID;

  Degree.findOneAndUpdate(
    { _id: degreeId },
    { $pull: { course: courseId } },
    { new: true },
    (err, foundDegree) => {
      res.status(200).json(foundDegree);
    }
  ).catch((error) => {
    if (error === 404) res.status(404).json();
    else res.status(500).json({ error: error });
  });
};

module.exports = {
  createDegree,
  addCourseID,
  deleteDegree,
  getDegreebyID,
  patchDegree,
  removeCourseID,
};
