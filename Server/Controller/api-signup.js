const database = require('./database.js');
const express = require('express');
const signup = express.Router();

const MongoClient = database.MongoClient;
const url = database.url;
const databaseName = database.databaseName;
const collection = "User";

signup.route('').post((req, res) => {
    console.log('api-signup called');
    var Name = req.body.Name;
    var Country = req.body.Country;
    var Phone = req.body.Phone;
    var Email = req.body.Email;
    var Username = req.body.Username;
    var Password = req.body.Password;
    var Avatar = req.body.Avatar;
    var Avatar = req.body.Avatar;
    MongoClient.connect(url, function (err1, db) {
        if (err1) throw err1;
        var dbo = db.db(databaseName);
        dbo.collection(collection).countDocuments({}).then(function (res1) {
            //Lấy id là số row + 1
            var id = res1 + 1;
            var object = {
                _id: id, Name: Name, Country: Country, Phone: Phone,
                Email: Email, Username: Username, Password: Password, Avatar: Avatar
            }
            //Insert
            dbo.collection(collection).insertOne(object, function (err2, res2) {
                if (err2) throw err2;
                db.close();
                if (res2.insertedCount)
                    res.send({ result: "Register successfully" });
                else
                    res.send({ result: "Cannot register new account!" })
            });
        });
    });
});

module.exports = signup;