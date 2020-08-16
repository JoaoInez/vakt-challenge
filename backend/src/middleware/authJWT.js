require("dotenv").config();
const jwt = require("jsonwebtoken");
const { models } = require("../sequelize");

module.exports = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (token) {
      const { id } = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await models.user.findByPk(id, {
        attributes: ["id", "username"],
      });
    }
    next();
  } catch (error) {
    next(500);
  }
};
