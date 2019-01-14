const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_URI, require('./config.json'));
const path = require('path');

sequelize.import(path.join(__dirname, 'users.js'));

const db = sequelize;
db.Sequelize = Sequelize;

module.exports = db;