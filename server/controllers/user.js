const User = require("../models/User");
const Course = require("../models/Course");
const Degree = require("../models/Degree");
const Project = require("../models/Project");
const Skill = require("../models/Skill");

const createUser = (req, res) => {
  var emailU = req.body.email;

  User.findOne({ email: emailU }, (err, foundUser) => {
    if (foundUser === null) {
      var user = null;
      user = new User(req.body);

      user.save(function (err) {
        if (err) {
          return next(err);
        }
        res.status(201).json(user);
      });
    } else {
      res.status(201).json({ emailAready: true });
    }
  }).catch((error) => {
    if (error === 401) res.status(404).json();
    else res.status(500).json({ error: error });
  });
};

const deleteUserWithId = (req, res, next) => {
  User.findOneAndDelete({ _id: req.params.id })
    .exec()
    .then((result) => {
      if (!result) throw 404;

      res.status(200).json(result);
    })
    .catch((error) => {
      if (error === 404) res.status(404).json({ error: `user not found.` });
      else res.status(500).json({ error: error });
    });
};

const updateWithId = (req, res, next) => {
  let newbody = req.body;
  let id = req.params.id;
  User.updateOne({ _id: id }, { $set: newbody }, (error, updatedUser) => {
    if (error) {
      return next(error);
    }
    if (updatedUser === null) {
      res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(updatedUser);
  });
};

const checkAuthentication = (req, res, next) => {
  let emaiL = req.body.email;
  let passW = req.body.password;

  User.findOne({ email: emaiL, password: passW }, (err, foundUser) => {
    if (err) throw 404;
    if (foundUser === null) {
      res.status(404).json({ authenticated: false });
    } else {
      res.status(200).json({
        id: foundUser._id,
        authenticated: true,
      });
    }
  });
};

const findUserbyID = (req, res, next) => {
  let id = req.params.id;

  User.findById({ _id: id }, (err, foundUser) => {
    if (err) throw 404;
    if (foundUser === null) {
      res.status(404).json({ message: "notfound" });
    } else {
      res.status(200).json(foundUser);
    }
  });
};

const findCourseByUserId = (req, res) => {
  const userId = req.params.id;

  Course.find({ user: { $eq: userId } })
    .exec()
    .then((result) => {
      if (result.length === 0) throw 404;

      reversedRes = result.reverse();
      res.status(200).json(reversedRes);
    })
    .catch((error) => {
      if (error === 404)
        res.status(404).json({
          error: `No courses found for user with id : ${userId}`,
        });
      else res.status(500).json({ error: error });
    });
};

const findDegreeByUserId = (req, res) => {
  const userId = req.params.id;

  Degree.find({ user: userId })
    .populate("course")
    .exec()
    .then((result) => {
      if (result.length === 0) throw 404;

      res.status(200).json(result);
    })
    .catch((error) => {
      if (error === 404) {
        res.status(404).json({
          error: `No degrees registered for the user with id :  ${userId}`,
        });
      }
    });
};

const findProjectsByUserId = (req, res) => {
  const userId = req.params.id;

  Project.find({ user: userId })
    .exec()
    .then((result) => {
      if (result.length === 0) throw 404;

      res.status(200).json(result);
    })
    .catch((error) => {
      if (error === 404) {
        res.status(404).json({
          error: `No Projects registered for the user with id :  ${userId}`,
        });
      }
    });
};

const findSkillsByUserId = (req, res) => {
  const userId = req.params.id;

  Skill.find({ user: userId })
    .populate("course")
    .exec()
    .then((result) => {
      if (result.length === 0) throw 404;

      res.status(200).json(result);
    })
    .catch((error) => {
      if (error === 404)
        res
          .status(404)
          .json({ message: "No Skill has been yet added for this user" });
      else res.status(500).json({ error: error });
    });
};

module.exports = {
  createUser,
  deleteUserWithId,
  updateWithId,
  checkAuthentication,
  findCourseByUserId,
  findDegreeByUserId,
  findProjectsByUserId,
  findSkillsByUserId,
  findUserbyID,
};
