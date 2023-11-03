const { Sequelize } = require("sequelize");
const path = require("path");
//
const db = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "sq.lite"),
  logging: false,
});

module.exports = db;
