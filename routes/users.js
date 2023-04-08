const router = require("express").Router();
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
} = require("../controllers/users");

router.get("/", getUsers);
router.post("/", createUser);
router.get("/:id", getUser);
router.post("/:id", updateUser);


module.exports = router;
