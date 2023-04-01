const express = require("express");

const app = express();

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.info(`
  🚀  Server is running!
  🔉  Listening on port 3001
  📭  Query at http://localhost:3001
`);
});
