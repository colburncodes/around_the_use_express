const router = require("express").Router();
const {
  getUser,
  updateProfile,
  updateAvatar,
} = require("../controllers/users");

const auth = require("../middlewares/auth");

router.get("/:id", auth, getUser);
router.patch("/me", auth, updateProfile);
router.patch("/me", auth, updateAvatar);


module.exports = router;
