const {MongoClient} = require('mongodb');

const uri = "mongodb+srv://sridevelops:Mahadev%4004@cluster0.qrn2vq7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

async function connectToMongo(){
  try{
    await client.connect();
    console.log("✅ Connected to MongoDB Atlas");
    const db = client.db("rootsDB");
    return db;
  }catch (err){
    console.error("Connection Error:", err);
  }
}

module.exports = connectToMongo;