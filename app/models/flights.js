"use strict";

module.exports = (sequelize, DataTypes) => {
  var Flights = sequelize.define(
    "Flights",
    {
      flightID: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      departureTime: {
        type: DataTypes.DATE
      }
    },
    {
      timestamps: false
    }
  );
  return Flights;
};
