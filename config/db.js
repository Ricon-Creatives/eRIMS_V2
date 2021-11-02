const Sequelize = require('sequelize');
const config = require('config');

module.exports = new Sequelize( 'heroku_6606bba61418fe7', 'b9e263f531e879', 'c600b171', config.get('sqlConnect'));