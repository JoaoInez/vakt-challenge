require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { models } = require("../sequelize");
const cookieOptions = { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 365 };

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    console.log(username, password);

    if (!username || !password) return next(400);

    const user = await models.user.findOne({ where: { username } });

    if (!user) return next(400);

    const compare = await bcrypt.compare(password, user.password);

    if (!compare) return next(400);

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    res
      .cookie("token", token, cookieOptions)
      .send({ user: { id: user.id, username: user.username } });
  } catch (error) {
    next(500);
  }
};

exports.signup = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) return next(400);

    const existingUser = await models.user.findOne({ where: { username } });

    if (existingUser) return next(400);

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = models.user.build({ username, password: hashedPassword });

    await user.save();

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    res
      .cookie("token", token, cookieOptions)
      .send({ user: { id: user.id, username: user.username } });
  } catch (error) {
    next(500);
  }
};

exports.logout = (req, res, next) => {
  res.clearCookie("token").sendStatus(204);
};
