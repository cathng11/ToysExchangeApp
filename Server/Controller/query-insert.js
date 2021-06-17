const database = require('./database.js');

const MongoClient = database.MongoClient;
const url = database.url;
const databaseName = database.databaseName;

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db(databaseName);
    //ToyCategory
    var objToyCategory = [
        { _id: 1, Name: 'Animals'},
        { _id: 2, Name: 'Outdoor Activities'},
        { _id: 3, Name: 'Vehicles' },
        { _id: 4, Name: 'Musical Instrument'},
        { _id: 5, Name: 'Learning and educational'},
        { _id: 6, Name: 'Tech Toys'},
        { _id: 7, Name: 'Character Toys'}
    ];
    dbo.collection("ToyCategory").insertMany(objToyCategory, function(err, res) {
      if (err) throw err;
      console.log(res.insertedCount);
      db.close();
    });
    //User
    var objUser = [
        { _id: 1, Name: 'Phan', Country: 'Vietnam', Phone: '', Email: 'pdk@gmail.com', Username: 'phan', Password: 'phan', Avatar: '' },
        { _id: 2, Name: 'Duy', Country: 'Vietnam', Phone: '', Email: 'pdk@gmail.com', Username: 'duy', Password: 'duy', Avatar: '' },
        { _id: 3, Name: 'Kha', Country: 'Vietnam', Phone: '', Email: 'pdk@gmail.com', Username: 'kha', Password: 'kha', Avatar: '' },
        { _id: 4, Name: 'Nguyễn', Country: 'Vietnam', Phone: '', Email: 'nthv@gmail.com', Username: 'nguyen', Password: 'nguyen', Avatar: '' },
        { _id: 5, Name: 'Thị', Country: 'Vietnam', Phone: '', Email: 'nthv@gmail.com', Username: 'thi', Password: 'thi', Avatar: '' },
        { _id: 6, Name: 'Hạ', Country: 'Vietnam', Phone: '', Email: 'nthv@gmail.com', Username: 'ha', Password: 'ha', Avatar: '' },
        { _id: 7, Name: 'Vinh', Country: 'Vietnam', Phone: '', Email: 'nthv@gmail.com', Username: 'vinh', Password: 'vinh', Avatar: '' }
    ];
    dbo.collection("User").insertMany(objUser, function (err, res) {
        if (err) throw err;
        console.log(res.insertedCount);
        db.close();
    });
});