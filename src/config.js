const { Sequelize } = require('sequelize');
const process = require("process");
const env = process.env.NODE_ENV || "development";
const config = require("./config/config.json")[env];
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: 'localhost',
  dialect: 'mysql',
});

// Testing our the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Hello Database !! Happy to Connect');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
