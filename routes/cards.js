const router = require("express").Router();
const {
  getCards,
  getCard,
  createCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

router.get("/", getCards);
router.post("/", createCard);
router.get("/:id", getCard);
router.put("/:id/likes", likeCard);
router.delete("/:id/likes", dislikeCard);

module.exports = router;
