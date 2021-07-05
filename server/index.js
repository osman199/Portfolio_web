const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const history = require("connect-history-api-fallback");
// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;

const userApi = require("./routes/user");
const courseApi = require("./routes/course");
const degreeApi = require("./routes/degree");
const projectApi = require("./routes/project");
const skillApi = require("./routes/skill");

const app = express();
app.use(bodyParser.json());
app.use(morgan("dev"));
app.options("*", cors());
app.use(cors());
// passport.use(new GoogleStrategy());

const mongoURI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/portfolio";
const port = process.env.PORT || 3001;

// Connect to MongoDB
mongoose.connect(
  mongoURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.error(`Failed to connect to MongoDB with URI: ${mongoURI}`);
      console.error(err.stack);
      process.exit(1);
    }
    console.log(`Connected to MongoDB with URI: ${mongoURI}`);
  }
);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);


app.get("/api", (req, res) => {
  res.json({ message: "Welcome to your DIT341 backend ExpressJS project!" });
});

app.use("/api/users", userApi);
app.use("/api/courses", courseApi);
app.use("/api/degrees", degreeApi);
app.use("/api/projects", projectApi);
app.use("/api/skills", skillApi);

app.use("/api/*", function (req, res) {
  res.status(404).json({ message: "Not Found!!!" });
});

// Configuration for serving frontend in production mode
// Support Vuejs HTML 5 history mode
app.use(history());
const root = path.normalize(__dirname + "/..");
const client = path.join(root, "client", "dist");
app.use(express.static(client));

// Error handler (i.e., when exception is thrown) must be registered last
const env = app.get("env");
app.use((err, req, res) => {
  console.error(err.stack);
  const err_res = {
    message: err.message,
    error: {},
  };

  if (env === "development") {
    err_res["error"] = err;
  }
  res.status(err.status || 500);
  res.json(err_res);
});

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Express server listening on port ${port}, in ${env} mode`);
  console.log(`Backend: http://localhost:${port}/api/`);
  console.log(`Frontend (production): http://localhost:${port}/`);
});
