const Card = require("../models/card");
const Status = require("../utils/error");

const getCards = async (req, res) => {
  Card.find({})
    .then((cards) => {
      res.status(Status.STATUS_CODES.Ok).send({ cards });
    })
    .catch(() => {
      res
        .status(Status.STATUS_CODES.ServerError)
        .send({ message: "Error retrieving cards" });
    });
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(Status.STATUS_CODES.Created).send({ card });
    })
    .catch((error) => {
      res
        .status(Status.STATUS_CODES.ServerError)
        .send({ message: "Error creating card", error });
    });
};

const getCard = (req, res, next) => {
  const { id } = req.params;
  Card.findById(id)
    .then((card) => {
      res.status(Status.STATUS_CODES.Ok).send({ message: card });
    })
    .catch((error) => {
      res
        .status(Status.STATUS_CODES.ServerError)
        .send({ message: "Error retrieving card", error });
    });
};

const likeCard = (req, res, next) => {
  const { id } = req.params;

  Card.findByIdAndUpdate(
    id,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        res
          .status(Status.STATUS_CODES.NotFound)
          .send({ message: "Card Not Found" });
      } else {
        res.send(card);
      }
    })
    .catch((error) => {
      if (error.name === "CastError") {
        res
          .status(Status.STATUS_CODES.BadRequest)
          .send({ message: "Invalid ID" });
      } else {
        res
          .status(Status.STATUS_CODES.ServerError)
          .send({ message: "An error has occurred on the server" });
      }
    });
};

const dislikeCard = (req, res, next) => {
  const { id } = req.params;

  Card.findByIdAndUpdate(id, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        res
          .status(Status.STATUS_CODES.NotFound)
          .send({ message: "Card Not Found" });
      } else {
        res.send(card);
      }
    })
    .catch((error) => {
      if (error.name === "CastError") {
        res
          .status(Status.STATUS_CODES.BadRequest)
          .send({ message: "Invalid ID" });
      } else {
        res
          .status(Status.STATUS_CODES.ServerError)
          .send({ message: "An error has occurred on the server" });
      }
    });
};

const deleteCard = (req, res, next) => {
  const { id } = req.params;

  Card.findById(id)
    .then((card) => {
      if (card.owner.equals(req.user._id)) {
        return card.deleteOne(() => res.send({ data: card }));
      }
    })
    .catch((error) => {
      if (error.name === "CastError") {
        res
          .status(Status.STATUS_CODES.BadRequest)
          .send({ message: "Invalid ID" });
      } else if (error.statusCode === 404) {
        res.status(Status.STATUS_CODES.NotFound);
      } else {
        res
          .status(Status.STATUS_CODES.ServerError)
          .send({ message: "Server Error" });
      }
    });
};

module.exports = {
  getCards,
  createCard,
  getCard,
  likeCard,
  dislikeCard,
  deleteCard,
};
