const express = require("express");
const routes = require("./routes/index");
const app = express();

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: "643155e2fa60a0727aa0e603",
  };

  next();
});

app.use("/", routes);



module.exports = app;
