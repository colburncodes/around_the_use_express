const router = require("express").Router();
const auth = require("../middlewares/auth");

const { login, createUser } = require("../controllers/users");

const usersRouter = require("./users");
const cardsRouter = require("./cards");

router.post("/signin", login);
router.post("/signup", createUser);

router.use("/users", usersRouter);
router.use("/cards", cardsRouter);

router.use(auth, (req, res) => {
  res.status(400).send({
    message: "No page found for route",
  });
});

module.exports = router;
