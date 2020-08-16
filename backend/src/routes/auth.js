const router = require("express").Router();
const { login, signup, logout } = require("../controllers/auth.js");
const authenticated = require("../helpers/authenticated");

router.post("/login", login);
router.post("/signup", signup);
router.get("/logout", authenticated(logout));

module.exports = router;
