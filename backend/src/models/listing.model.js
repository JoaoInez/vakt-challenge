const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("listing", {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    description: {
      defaultValue: "",
      type: DataTypes.TEXT,
    },
    price: {
      allowNull: false,
      type: DataTypes.FLOAT,
    },
    currency: {
      defaultValue: "GBP",
      type: DataTypes.STRING,
    },
  });
};
