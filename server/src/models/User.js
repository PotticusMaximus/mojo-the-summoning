const { db } = require("../db/config");
const { DataTypes } = require("sequelize");
//
const User = db.define("user", {
  username: DataTypes.STRING,
});

console.log(User);

module.exports = User;
