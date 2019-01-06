const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_PARAMS, { underscored: true });
const path = require('path');