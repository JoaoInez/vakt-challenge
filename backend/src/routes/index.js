const router = require("express").Router();
const auth = require("./auth");
const user = require("./user");
const listing = require("./listing");

router.use("/", auth);
router.use("/user", user);
router.use("/listing", listing);

module.exports = router;
