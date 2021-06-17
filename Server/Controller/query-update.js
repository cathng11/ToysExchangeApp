const database = require('./database.js');

const MongoClient = database.MongoClient;
const url = database.url;
const databaseName = database.databaseName;

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db(databaseName);
    // containString là param nhận về từ client
    var containString = 'Ac';
    var myquery = { Name:  new RegExp(containString, 'i')};
    var newvalues = { $set: {Name: "Mickey"} };
    dbo.collection("ToyCategory").updateOne(myquery, newvalues, function(err, res) {
        if (err) throw err;
        console.log("1 document updated");
        db.close();
    });
});