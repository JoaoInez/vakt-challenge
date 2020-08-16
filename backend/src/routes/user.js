const router = require("express").Router();
const authenticated = require("../helpers/authenticated");
const { currentUser, user } = require("../controllers/user");

router.get("/", authenticated(currentUser));
router.get("/:id", authenticated(user));

module.exports = router;
