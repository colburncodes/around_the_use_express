const User = require("../models/user");
const Status = require("../utils/error");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
  const { name, avatar, email, password } = req.body;

  bcrypt.hash(password, 10).then((hash) =>
    User.create({ name, avatar, email, password: hash })
      .then((user) => {
        res.status(Status.STATUS_CODES.Created).send({
          _id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
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
      })
  );
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
module.exports = {
  getUsers,
  getUser,
  createUser,
  updateProfile,
  updateAvatar,
  login,
};
