const { db } = require("../db/config");
const { DataTypes } = require("sequelize");
//
const User = db.define("User", {
  username: DataTypes.STRING,
});

//console.log(User);

module.exports = { User };
