const app = require("./app.js");
const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.info(`
  🚀  Server is running!
  🔉  Listening on port 3000
  📭  Query at http://localhost:3000
`);
});
