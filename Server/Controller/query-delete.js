const database = require('./database.js');

const MongoClient = database.MongoClient;
const url = database.url;
const databaseName = database.databaseName;

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db(databaseName);
    // containString là param nhận về từ client
    var containString = 'Ac';
    var query = { Name: new RegExp(containString, 'i') };
    dbo.collection("ToyCategory").deleteMany(query, function(err, res) {
      if (err) throw err;
      console.log(res.result);
      db.close();
    });
});