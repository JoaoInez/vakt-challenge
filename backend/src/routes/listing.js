const router = require("express").Router();
const {
  getAllListings,
  getListing,
  createListing,
  updateListing,
  deleteListing,
} = require("../controllers/listing");
const authenticated = require("../helpers/authenticated");

router.get("/", authenticated(getAllListings));
router.get("/:id", authenticated(getListing));
router.post("/", authenticated(createListing));
router.put("/:id", authenticated(updateListing));
router.delete("/:id", authenticated(deleteListing));

module.exports = router;
