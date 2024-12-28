const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

projectData = {};
const port = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "website")));

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

// get all
app.get("/all", (req, res) => {
  console.log("get all request");
  res.send(projectData);
});

// post data
app.post("/postData", (req, res) => {
  console.log("post data request");
  console.log(req.body);
  const { temp, date, feel } = req.body;
  projectData = {
    temp,
    date,
    feel,
  };
  res.send(projectData);
});
