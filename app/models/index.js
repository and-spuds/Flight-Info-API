"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var basename = path.basename(__filename);
var db = {};
var sequelize;
var flight = require("./flights");
var data = require("../dummyData.json");
sequelize = new Sequelize(null, null, null, {
  host: "localhost",
  dialect: "sqlite",
  operatorsAliases: false,
  storage: "database.sqlite"
});

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(file => {
    var model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//console.log("hi",db.sequelize.models.Flights);
db.sequelize.models.Flights.bulkCreate(data);

module.exports = db;
