const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;

const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  retryWrites: true // Add this option
});

let _db;

module.exports = {
  connectToServer: async function () {
    try {
      await client.connect();
      _db = client.db("test");
      console.log("Successfully connected to MongoDB.");
    } catch (err) {
      console.error("Error connecting to MongoDB:", err);
      throw err;
    }
  },

  getDb: function () {
    if (!_db) {
      throw new Error("Database not connected!");
    }
    return _db;
  },
};