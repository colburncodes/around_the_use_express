const path = require("path");
const getJsonFromFile = require("../utils/files");

const dataPath = path.join(__dirname, "..", "data", "users.json");
const getUsers = async (req, res) => {
  try {
    const users = await getJsonFromFile(dataPath);
    return res.status(200).send(users);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const getUser = async (req, res) => {
  return getJsonFromFile(dataPath)
    .then((users) => users.find((user) => user.id === req.params._id))
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .send({ message: `User with id ${req.params._id} doesn't exist` });
      }
      return res.status(200).send(user);
    })
    .catch((err) => res.status(500).send(err));
};
module.exports = { getUsers, getUser };
