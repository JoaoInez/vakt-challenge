const { models } = require("../sequelize");

exports.getAllListings = async (req, res, next) => {
  try {
    const listings = await models.listing.findAll({
      include: {
        model: models.user,
        attributes: ["id", "username"],
      },
      attributes: ["id", "name", "description", "price", "currency"],
    });

    res.send({ listings });
  } catch (error) {
    next(500);
  }
};

exports.getListing = async (req, res, next) => {
  try {
    const { id } = req.params;
    const listing = await models.listing.findByPk(id, {
      include: {
        model: models.user,
        attributes: ["id", "username"],
      },
      attributes: ["id", "name", "description", "price", "currency"],
    });

    if (!listing) return next(404);

    res.send({ listing });
  } catch (error) {
    next(500);
  }
};

exports.createListing = async (req, res, next) => {
  try {
    const {
      name,
      description = undefined,
      price,
      currency = undefined,
    } = req.body;

    if (!name || !price || isNaN(+price)) return next(400);

    const listing = await req.user.createListing({
      name,
      description,
      price: +price,
      currency,
    });

    await req.user.save();

    res.send({
      listing: {
        id: listing.id,
        name: listing.name,
        description: listing.description,
        price: listing.price,
        currency: listing.currency,
        user: {
          id: req.user.id,
          username: req.user.username,
        },
      },
    });
  } catch (error) {
    next(500);
  }
};

exports.updateListing = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      name = undefined,
      description = undefined,
      price = undefined,
      currency = undefined,
    } = req.body;

    if (
      (!name && !description && !price && !currency) ||
      (price && isNaN(+price))
    )
      return next(400);

    const listing = await models.listing.findByPk(id, {
      include: { model: models.user, attributes: ["id"] },
    });

    if (!listing) return next(404);
    if (req.user.id !== listing.user.id) return next(403);
    if (name) listing.name = name;
    if (description) listing.description = description;
    if (price) listing.price = +price;
    if (currency) listing.currency = currency;

    await listing.save();

    res.send({
      listing: {
        id: listing.id,
        name: listing.name,
        description: listing.description,
        price: listing.price,
        currency: listing.currency,
        user: {
          id: req.user.id,
          username: req.user.username,
        },
      },
    });
  } catch (error) {
    next(500);
  }
};

exports.deleteListing = async (req, res, next) => {
  try {
    const { id } = req.params;
    const listing = await models.listing.findByPk(id, {
      include: {
        model: models.user,
        attributes: ["id"],
      },
    });

    if (!listing) return next(404);
    if (req.user.id !== listing.user.id) return next(403);

    await listing.destroy();

    res.sendStatus(200);
  } catch (error) {
    next(500);
  }
};
