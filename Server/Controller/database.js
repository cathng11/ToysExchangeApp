const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://duykha:duykha2000@toysexchange.ld4n0.mongodb.net/admin?authSource=admin&replicaSet=atlas-rvw1n8-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true"
// var url = "mongodb://localhost:27017/";
const databaseName = 'toys-exchange';
module.exports = {MongoClient, url, databaseName};