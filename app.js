const express = require("express");
const path = require("path");
const routes = require("./routes");
const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  req.user = {
    _id: "5d8b8592978f8bd833ca8133",
  };

  next();
});

app.use(routes);

module.exports = app;