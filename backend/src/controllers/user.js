const { models } = require("../sequelize");

exports.currentUser = (req, res, next) => {
  res.send({ user: req.user });
};

exports.user = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await models.user.findByPk(id, {
      include: {
        model: models.listing,
        attributes: ["id", "name", "description", "price", "currency"],
      },
      attributes: ["username"],
    });

    res.send({ user });
  } catch (error) {
    next(500);
  }
};
