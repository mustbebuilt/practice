const express = require("express");
const path = require("path");
const port = 7001;

const app = express();

// add for RESTful
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const routes = require("./routes/routes");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("./public"));

app.use("/", routes);

app.use((req, res, next) => {
  console.dir(req.url);
  next();
});

// remove for sample files
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
  next();
});

// Database
// get driver connection
const dbo = require("./mongodb/data");

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});

console.log("Express on 7000");

module.exports = app;
