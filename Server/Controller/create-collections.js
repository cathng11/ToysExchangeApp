const database = require('./database.js');

const MongoClient = database.MongoClient;
const url = database.url;
const databaseName = database.databaseName;

//User:  _idUser, Name, Country, Phone, Email, Username, Password, Avatar
//ToyCategory: _idToyCategory, Name
//Post: _idPost, Title, Image, _idToyCategory, Address, _idUser, Description
//Request: _idRequest, _idPost, _idSender
MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(databaseName);
    var collections = ['User', 'ToyCategory', 'Post', 'Request'];
    collections.forEach(value => {
        dbo.createCollection(value, function(err, res) {
            if (err) throw err;
            console.log(`Collection ${value} created!`);
            db.close();
        });
    })
})
module.exports = {MongoClient, url};