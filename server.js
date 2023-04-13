const app = require("./app.js");
const mongoose = require("mongoose");
const { PORT = 3000 } = process.env;

mongoose.connect("mongodb://localhost:27017/aroundDB");


app.listen(PORT, () => {
  console.info(`
  🚀  Server is running!
  🔉  Listening on port 3000
  📭  Query at http://localhost:3000
`);
});
