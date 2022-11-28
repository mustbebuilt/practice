const { MongoClient } = require("mongodb");
const dbo = "mongodb://localhost:27017/";
const client = new MongoClient(dbo, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var dbConnection;
// alternative export option - methods as objects
module.exports = {
  connectToServer: async function () {
    await client.connect();
    dbConnection = client.db("pubsDB");
  },

  getDb: function () {
    return dbConnection;
  },
  getObjectId: function () {
    var ObjectId = require("mongodb").ObjectId;
    return ObjectId;
  },
};
