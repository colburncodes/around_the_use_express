const express = require("express");
const path = require("path");
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use("/", usersRouter);
app.use("/", cardsRouter);

module.exports = app;