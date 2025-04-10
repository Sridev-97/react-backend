require('dotenv').config(); // load env variables
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function connectToMongo() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB Atlas");

    const db = client.db("rootsDB");
    return db;
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    return null;
  }
}

module.exports = connectToMongo;
