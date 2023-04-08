const router = require("express").Router();
const { getCards, getCard, createCard } = require("../controllers/cards");

router.get("/", getCards);
router.post("/", createCard);
router.get("/:id", getCard);

module.exports = router;
