const Card = require("../models/card");

const getCards = async (req, res) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send({ cards });
    })
    .catch((error) => {
      res.status(500).send({ message: "Error retrieving cards", error });
    });
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(201).send({ card });
    })
    .catch((error) => {
      res.status(500).send({ message: "Error creating card", error });
    });
};

const getCard = (req, res, next) => {
  const { id } = req.params;
  Card.findById(id)
    .then((card) => {
      res.status(200).send({ message: card });
    })
    .catch((error) => {
      res.status(500).send({ message: "Error retrieving card", error });
    });
};

module.exports = { getCards, createCard, getCard };
