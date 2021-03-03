"use strict";
//This file is used to import all the models we place in the models folder, and export them.
var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
const VAR_ENV = require('dotenv').config();

var DB_CONFIG = require("../lib/DB_CONFIG")


var env = process.env.NODE_ENV;

var config = DB_CONFIG.Config()[env];
//console.log('=======CONFOOO===', config)

//var sequelize = new Sequelize(config.database, config.username, config.password, config);
var sequelize = new Sequelize(config.database, config.username, config.password, config);

var db = {};


fs
    .readdirSync(__dirname)
    .filter(function (file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function (file) {
        var model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function (modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;