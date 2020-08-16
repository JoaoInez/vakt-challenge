const { Sequelize } = require("sequelize");
const assoc = require("./assoc");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db/database.sqlite",
});

const modelDefiners = [
  require("../models/user.model"),
  require("../models/listing.model"),
];

for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

assoc(sequelize.models);

module.exports = sequelize;
