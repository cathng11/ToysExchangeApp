const database = require('./database.js');
const express = require('express');
const user = express.Router();

const MongoClient = database.MongoClient;
const url = database.url;
const databaseName = database.databaseName;
const collection = 'User';

user.route('/').post((req, res) => {
    console.log('api-user called');
    var _idUser = req.body._idUser;
    MongoClient.connect(url, function (err1, db) {
        if (err1) throw err1;
        var dbo = db.db(databaseName);
        dbo.collection(collection).find({ _id: _idUser }).toArray(function (err2, result) {
            if (err2) throw err2;
            if (result != null) res.json(result);
            else res.json(null);
            db.close();
        });
    });
});

user.route('/update').post((req, res) => {
    console.log('api-user/update called');
    var _idUser = req.body._idUser;
    var Name = req.body.Name;
    var Country = req.body.Country;
    var Phone = req.body.Phone;
    var Email = req.body.Email;
    MongoClient.connect(url, function (err1, db) {
        if (err1) throw err1;
        var dbo = db.db(databaseName);
        dbo.collection(collection).updateOne({ _id: _idUser }, { $set: { Name: Name, Country: Country, Phone: Phone, Email: Email } }, function (err2, result2) {
            if (err2) throw err2;
            dbo.collection(collection).find({ _id: _idUser }).toArray(function (err3, result) {
                if (err3) throw err3;
                if (result != null) res.json(result);
                else res.json(null);
                db.close();
            });
            db.close();
        });
    });
});


module.exports = user;