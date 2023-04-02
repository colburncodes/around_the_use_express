const path = require("path");
const getJsonFromFile = require("../utils/files");

const dataPath = path.join(__dirname, "..", "data", "cards.json");
const getCards = async (req, res) => {
  try {
    const users = await getJsonFromFile(dataPath);
    return res.status(200).send(users);
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports = getCards;
