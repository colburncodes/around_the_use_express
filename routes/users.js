const router = require("express").Router();
const {
  getUsers,
  getUser,
  createUser,
  updateProfile,
  updateAvatar,
} = require("../controllers/users");

router.get("/", getUsers);
router.post("/", createUser);
router.get("/:id", getUser);
router.patch("/me", updateProfile);
router.patch("/me", updateAvatar);


module.exports = router;
