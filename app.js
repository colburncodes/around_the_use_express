const express = require("express");
const routes = require("./routes/index");
const app = express();

app.use(express.json());
app.use("/", routes);

app.use((req, res, next) => {
  req.user = {
    _id: "5d8b8592978f8bd833ca8133",
  };

  next();
});

module.exports = app;
