const express = require("express");
const cors = require("cors");
const routes = require("./routes/index");
const app = express();

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  req.user = {
    _id: "643615b7006439f52d934202",
  };

  next();
});

app.use("/", routes);




module.exports = app;
