const User = require("../models/user");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch((error) => {
      res.status(500).send({ message: "Error making request" });
    });
};

const getUser = async (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch(() => {
      res.status(500).send({ message: "User does not exist" });
    });
};

const createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(201).send({
        user,
      });
    })
    .catch(() => {
      res.status(500).send({ message: "Error creating user" });
    });
};

const updateUser = (req, res, next) => {
  const { id } = req.params;

  const { name, about, avatar } = req.body;
  User.findByIdAndUpdate(id, { $set: { name, about, avatar } })
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch((error) => {
      res.status(500).send({ message: "Error updating user", error });
    });
};
module.exports = { getUsers, getUser, createUser, updateUser };
