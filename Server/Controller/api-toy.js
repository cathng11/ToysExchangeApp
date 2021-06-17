const database = require('./database.js');
const express = require('express');
const toy = express.Router();

const MongoClient = database.MongoClient;
const url = database.url;
const databaseName = database.databaseName;
const collection = 'Toy';

toy.route('').post((req, res) => {
    console.log('api-toy called');
    MongoClient.connect(url, function (err1, db) {
        if (err1) throw err1;
        var dbo = db.db(databaseName);
        //Status: 0 - Toy trong trạng thái chưa được exchange
        dbo.collection(collection).aggregate([
            {
                $lookup:
                {
                    from: 'User',
                    localField: '_idUser',
                    foreignField: '_id',
                    as: 'User'
                }
            },
            {
                $match: {
                    "Status": 0
                }
            },
            {
                $lookup:
                {
                    from: 'Category',
                    localField: '_idCategory',
                    foreignField: '_id',
                    as: 'Category'
                }
            }
        ]).toArray(function (err2, result) {
            if (err2) throw err2;
            if (result != null) res.json(result);
            else res.json(null);
            db.close();
        });
    });
});

toy.route('/add').post((req, res) => {
    console.log('api-toy/add called');
    var Image = req.body.Image;
    var Name = req.body.Name;
    var _idCategory = req.body._idCategory;
    var _idUser = req.body._idUser;
    var Rating = 0;
    var Datetime = req.body.Datetime;
    var Description = req.body.Description;
    var Address = req.body.Address;
    MongoClient.connect(url, function (err1, db) {
        if (err1) throw err1;
        var dbo = db.db(databaseName);
        dbo.collection(collection).countDocuments({}).then(function (res1) {
            //Lấy id là số row + 1
            var id = res1 + 1;
            var object = {
                _id: id, Image: Image, Name: Name, _idCategory: _idCategory, _idUser: _idUser, Rating: Rating,
                Datetime: Datetime, Description: Description, Address: Address, Status: 0
            }
            //Insert
            dbo.collection(collection).insertOne(object, function (err2, res2) {
                if (err2) throw err2;
                db.close();
                if (res2.insertedCount)
                    res.send({ result: "Toy added successfully" });
                else
                    res.send({ result: "Cannot add new toy!" })
            });
        });
    });
});

toy.route('/get').post((req, res) => {
    console.log('api-toy/get called');
    var _idToy = req.body._idToy;
    MongoClient.connect(url, function (err1, db) {
        if (err1) throw err1;
        var dbo = db.db(databaseName);
        dbo.collection(collection).aggregate([
            {
                $lookup:
                {
                    from: 'User',
                    localField: '_idUser',
                    foreignField: '_id',
                    as: 'User'
                }
            },
            {
                $match: {
                    "_id": _idToy
                }
            },
            {
                $lookup:
                {
                    from: 'Category',
                    localField: '_idCategory',
                    foreignField: '_id',
                    as: 'Category'
                }
            }
        ]).toArray(function (err2, result) {
            if (err2) throw err2;
            if (result != null) res.json(result);
            else res.json(null);
            db.close();
        });
    });
});

toy.route('/getbyuser').post((req, res) => {
    console.log('api-toy/getbyuser called');
    var _idUser = req.body._idUser;
    MongoClient.connect(url, function (err1, db) {
        if (err1) throw err1;
        var dbo = db.db(databaseName);
        dbo.collection(collection).aggregate([
            {
                $lookup:
                {
                    from: 'User',
                    localField: '_idUser',
                    foreignField: '_id',
                    as: 'User'
                }
            },
            {
                $match: {
                    "_idUser": _idUser
                }
            },
            {
                $lookup:
                {
                    from: 'Category',
                    localField: '_idCategory',
                    foreignField: '_id',
                    as: 'Category'
                }
            }
        ]).toArray(function (err2, result) {
            if (err2) throw err2;
            if (result != null) res.json(result);
            else res.json(null);
            db.close();
        });
    });
});

module.exports = toy;