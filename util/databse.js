const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    'mongodb+srv://workerbee:9510@cluster0.aiy6ccp.mongodb.net/shop?retryWrites=true&w=majority'
  )
    .then((client) => {
      console.log('Connected!');
      db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => db ?? new Error('No databse Found!');

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
