require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dbConfig = require("./config/db.config.js");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8080;

const ProjectRoutes = require("./routes/projects.routes");
const JobRoutes = require("./routes/jobs.routes");

const acceptedOrigins = [
  "http://localhost:3000",
  "http://stage.eggers.dev",
  "http://eggers.dev",
  "https://eggers.dev",
];

// App Utils
app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);
      if (acceptedOrigins.indexOf(origin) === -1) {
      }
      return cb(null, true);
    },
    optionsSuccessStatus: 200,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Database connection
mongoose.Promise = global.Promise;
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successful connection to db");
  })
  .catch((err) => {
    console.log("Could not connect to db...", err);
    process.exit();
  });

const checkingSomeShitOut = (num) => (num / 1000) % 1 === 0;
for (var i = 0; i < 20000; i++) {
  if (checkingSomeShitOut(i)) console.log(i, "cool cool cool");
}

app.listen(PORT, () => {
  console.log(`Spinning on ${PORT}`);
  ProjectRoutes(app);
  JobRoutes(app);
});
