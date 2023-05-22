const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Status = require("../utils/error");
const { JWT_SECRET } = require("../utils/config");

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      if (user) {
        const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: "7d",
        });
        res.send({ email, token });
      }
    })
    .catch(() => {
      res
        .status(Status.Unauthorized)
        .send({ message: "Incorrect email or password" });
    });
};

const getUser = async (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      res.status(Status.Ok).send({ user });
    })
    .catch((error) => {
      if (error.name === "NotFound") {
        res.status(Status.BadRequest).send({ message: "Invalid User ID" });
      }
      if (error.name === "DocumentNotFoundError") {
        res.status(Status.NotFound).send({ message: "User Not Found" });
      }
      res.status(Status.ServerError).send({ message: "User does not exist" });
    });
};

const createUser = (req, res, next) => {
  const { name, email, password, avatar } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({ name, email, password: hash, avatar }).then((user) => {
        res.status(Status.Created).send({
          _id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
        });
      })
    )
    .catch((error) => {
      if (error.name === "ValidationError") {
        res.status(Status.BadRequest).send({ message: error.message });
      } else {
        res.status(Status.ServerError).send({ message: "Error creating user" });
      }
    });
};

const updateProfile = (req, res, next) => {
  const { id } = req.params;
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    id,
    { $set: { name, about } },
    { new: true, runValidators: true }
  )
    .then((user) => {
      res.status(Status.Ok).send({ user });
    })
    .catch((error) => {
      if (error.name === "ValidationError") {
        res.status(Status.BadRequest).send({ message: error.message });
      } else {
        res
          .status(Status.ServerError)
          .send({ message: "Error updating user", error });
      }
    });
};

const updateAvatar = (req, res, next) => {
  const { id } = req.params;
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    id,
    { $set: { avatar } },
    { new: true, runValidators: true }
  )
    .then((user) => {
      res.status(Status.Ok).send({ user });
    })
    .catch((error) => {
      if (error.name === "ValidationError") {
        res.status(Status.BadRequest).send({ message: error.message });
      } else {
        res
          .status(Status.ServerError)
          .send({ message: "Error updating user", error });
      }
    });
};
module.exports = {
  getUser,
  createUser,
  updateProfile,
  updateAvatar,
  login,
};
