const Sequelize = require("sequelize");
const data = require("./dummyData.json");

/* istanbul ignore next */

const sequelize = new Sequelize(null, null, null, {
  host: "localhost",
  dialect: "sqlite",
  operatorsAliases: false,
  storage: "database.sqlite"
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.log("Unable to connect to the database", err);
  });

const Flight = sequelize.define(
  "flight",
  {
    flightID: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    departureTime: {
      type: Sequelize.DATE
    }
  },
  {
    timestamps: false
  }
);

Flight.sync({ force: true }).then(() => {
  return Flight.bulkCreate(data);
});
