const express = require("express");
const path = require("path");
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

const app = express();

const { PORT = 3000 } = process.env;

app.use(express.static(path.join(__dirname, "public")));

app.use("/", usersRouter);
app.use("/", cardsRouter);

app.listen(PORT, () => {
  console.info(`
  🚀  Server is running!
  🔉  Listening on port 3001
  📭  Query at http://localhost:3001
`);
});
