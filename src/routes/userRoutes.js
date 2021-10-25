const { Router } = require("express");
const router = Router();

const { signUp,login } = require("../controllers/authController");

router.route("/signUp").post(signUp);
router.route("/signIn").post(login);

module.exports = router;
