const database = require('./database.js');
const express = require('express');
const signin = express.Router();

const MongoClient = database.MongoClient;
const url = database.url;
const databaseName = database.databaseName;

signin.route('').post((req, res) => {
    console.log('api-signin called');
    var Username = req.body.Username;
    var Password = req.body.Password;
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(databaseName);
        var query = { Username: Username, Password: Password };
        dbo.collection("User").find(query).toArray(function(err, results) {
            if (err) throw err;
            console.log(results[0]);
            db.close();
            if (results[0]) res.json(results[0]);
            else res.json(null);
        });
    });
});

module.exports = signin;