const { db } = require("../db/config");
const { DataTypes } = require("sequelize");
//
const Deck = db.define("Deck", {
  name: DataTypes.STRING,
  xp: DataTypes.INTEGER,
});

module.exports = { Deck };
