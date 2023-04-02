const fsPromises = require("fs").promises;

const getJsonFromFile = (pathToFile) =>
  fsPromises
    .readFile(pathToFile, { encoding: "utf8" })
    .then((data) => JSON.parse(data))
    .catch((err) => console.error(err));

module.exports = getJsonFromFile;
