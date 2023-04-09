const User = require("../models/user");
const Status = require("../utils/error");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(Status.STATUS_CODES.Ok).send({ users });
    })
    .catch(() => {
      res
        .status(Status.STATUS_CODES.ServerError)
        .send({ message: "Error making request" });
    });
};

const getUser = async (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      res.status(Status.STATUS_CODES.Ok).send({ user });
    })
    .catch((error) => {
      if (error.name === "NotFound") {
        res
          .status(Status.STATUS_CODES.BadRequest)
          .send({ message: "Invalid User ID" });
      }
      if (error.name === "DocumentNotFoundError") {
        res
          .status(Status.STATUS_CODES.NotFound)
          .send({ message: "User Not Found" });
      }
      res
        .status(Status.STATUS_CODES.ServerError)
        .send({ message: "User does not exist" });
    });
};

const createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(Status.STATUS_CODES.Created).send({
        user,
      });
    })
    .catch((error) => {
      if (error.name === "ValidationError") {
        res
          .status(Status.STATUS_CODES.BadRequest)
          .send({ message: error.message });
      } else {
        res
          .status(Status.STATUS_CODES.ServerError)
          .send({ message: "Error creating user" });
      }
    });
};

const updateProfile = (req, res, next) => {
  const { id } = req.params;
  const { name, about } = req.body;

  User.findByIdAndUpdate(id, { $set: { name, about } })
    .then((user) => {
      res.status(Status.STATUS_CODES.Ok).send({ user });
    })
    .catch((error) => {
      if (error.name === "ValidationError") {
        res
          .status(Status.STATUS_CODES.BadRequest)
          .send({ message: error.message });
      } else {
        res
          .status(Status.STATUS_CODES.ServerError)
          .send({ message: "Error updating user", error });
      }
    });
};

const updateAvatar = (req, res, next) => {
  const { id } = req.params;
  const { avatar } = req.body;

  User.findByIdAndUpdate(id, { $set: { avatar } })
    .then((user) => {
      res.status(Status.STATUS_CODES.Ok).send({ user });
    })
    .catch((error) => {
      if (error.name === "ValidationError") {
        res
          .status(Status.STATUS_CODES.BadRequest)
          .send({ message: error.message });
      } else {
        res
          .status(Status.STATUS_CODES.ServerError)
          .send({ message: "Error updating user", error });
      }
    });
};
module.exports = { getUsers, getUser, createUser, updateProfile, updateAvatar };
