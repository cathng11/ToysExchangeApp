const database = require('./database.js');
const express = require('express');
const request = express.Router();

const MongoClient = database.MongoClient;
const url = database.url;
const databaseName = database.databaseName;
const collection = 'Request';

//Lấy request mà mình gửi hoặc mình nhận
request.route('').post((req, res) => {
    console.log('api-request called');
    var _idUser = req.body._idUser;
    MongoClient.connect(url, function (err1, db) {
        if (err1) throw err1;
        var dbo = db.db(databaseName);
        // dbo.collection(collection).find({ Status: 0, $or: [{ _idSender: _idUser }, { _idReceiver: _idUser }] }).toArray(function (err2, result) {
        //     if (err2) throw err2;
        //     if (result != null) res.json(result);
        //     else res.json(null);
        //     db.close();
        // });
        dbo.collection(collection).aggregate([
            {
                $lookup:
                {
                    from: 'Toy',
                    localField: '_idToy',
                    foreignField: '_id',
                    as: 'Toy'
                }
            },
            {
                $match:
                {
                    "Status": 0,
                    "_idReceiver": _idUser,
                }
            },
            {
                $lookup:
                {
                    from: 'User',
                    localField: '_idSender',
                    foreignField: '_id',
                    as: 'Sender'
                }
            }
        ]).toArray(function (err2, result2) {
            if (err2) throw err2;
            dbo.collection("Request").aggregate([
                {
                    $lookup:
                    {
                        from: 'Toy',
                        localField: '_idToy',
                        foreignField: '_id',
                        as: 'Toy'
                    }
                },
                {
                    $match:
                    {
                        "Status": 0,
                        "_idSender": _idUser,
                    }
                },
                {
                    $lookup:
                    {
                        from: 'User',
                        localField: '_idReceiver',
                        foreignField: '_id',
                        as: 'Receiver'
                    }
                }
            ]).toArray(function (err3, result3) {
                if (err3) throw err3;
                result = result2.concat(result3);
                if (result != null) res.json(result);
                else res.json(null);
                db.close();
            });
            db.close();
        });
    });
});

//Insert new Request
request.route('/add').post((req, res) => {
    console.log('api-request/add called');
    var _idToy = req.body._idToy;
    var _idSender = req.body._idSender;
    var _idReceiver = req.body._idReceiver;
    MongoClient.connect(url, function (err1, db) {
        if (err1) throw err1;
        var dbo = db.db(databaseName);
        dbo.collection(collection).countDocuments({}).then(function (res1) {
            //Update Status of Toy: 1
            dbo.collection("Toy").updateOne({ _id: _idToy }, { $set: { Status: 1 } });
            //Lấy id là số row + 1
            var id = res1 + 1;
            var object = {
                _id: id, _idToy: _idToy, _idSender: _idSender, _idReceiver: _idReceiver, Status: 0
            }
            //Insert
            dbo.collection(collection).insertOne(object, function (err2, res2) {
                if (err2) throw err2;
                db.close();
                if (res2.insertedCount)
                    res.send({ result: "Request added successfully" });
                else
                    res.send({ result: "Cannot add new request!" })
            });
        });
    });
});

//Cancel Request
request.route('/cancel').post((req, res) => {
    console.log('api-request/cancel called');
    var _idToy = req.body._idToy;
    MongoClient.connect(url, function (err1, db) {
        if (err1) throw err1;
        var dbo = db.db(databaseName);
        dbo.collection(collection).updateOne({ _idToy: _idToy }, { $set: { Status: -1 } }, function (err2, result) {
            if (err2) throw err2;
            dbo.collection("Toy").updateOne({ _id: _idToy }, { $set: { Status: 0 } });
            res.send({ result: "Cancel successfully" });
            db.close();
        });
    });
});

//Accept|Deny Request
request.route('/accept').post((req, res) => {
    console.log('api-request/accept called');
    var _idRequest = req.body._idRequest;
    var _idToy = req.body._idToy;
    //accept: 1 - 2: deny
    var accept = req.body.accept;
    MongoClient.connect(url, function (err1, db) {
        if (err1) throw err1;
        var dbo = db.db(databaseName);
        dbo.collection(collection).updateOne({ _id: _idRequest }, { $set: { Status: accept } }, function (err2, result) {
            if (err2) throw err2;
            if (accept == 1) res.send({ result: "Request accepted" });
            else {
                dbo.collection("Toy").updateOne({ _id: _idToy }, { $set: { Status: 0 } });
                res.send({ result: "Request denied" });
            }
            db.close();
        });
    });
});

module.exports = request;