const database = require('./database.js');

const MongoClient = database.MongoClient;
const url = database.url;
const databaseName = database.databaseName;

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  var dbo = db.db(databaseName);
  //Select: contain String
  // containString là param nhận về từ client
  var containString = 'Ac';
  var query = { Name: new RegExp(containString, 'i') };
  dbo.collection("ToyCategory").find(query, { projection: { _id: 0, Name: 1 } }).toArray(function (err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });

  //Select All
  dbo.collection("ToyCategory").find({}).toArray(function (err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});