//*** Server End ***

const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const connectToMongo = require('./db');
const {ObjectId} = require('mongodb');

const app = express();
app.use(cors());

app.use(bodyParser.json());

connectToMongo().then(db => {
  if (!db) {
    console.error("Failed to connect to DB.");
    return;
  }
  const bathroomCollection = db.collection('bathroom');
  const kidsCollection = db.collection('kids');
  const beautyCollection = db.collection('beauty');
  const orderCollection = db.collection('orders');

  app.get('/bathroom', async (req, res) => {
    try {
      const data = await bathroomCollection.find().toArray();
      res.json(data);
      console.log('data is:', data);
    } catch (err) {
      res.status(500).send("Error fetching bathroom data");
    }
  });

  app.get('/beauty', async (req, res) => {
    try {
      const data = await beautyCollection.find().toArray();
      res.json(data);
      console.log('data is:', data);
    } catch (err) {
      res.status(500).send("Error fetching bathroom data");
    }
  });

  app.get('/kids', async (req, res) => {
    try {
      const data = await kidsCollection.find().toArray();
      res.json(data);
      console.log('data is:', data);
    } catch (err) {
      res.status(500).send("Error fetching bathroom data");
    }
  });

  app.get('/orders', async (req, res) => {
    try {
      const data = await orderCollection.find().toArray();
      res.json(data);
      console.log('data is:', data);
    } catch (err) {
      res.status(500).send("Error fetching bathroom data");
    }
  });

  app.delete('/orders/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      const result = await orderCollection.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
  
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      res.json({ message: "🗑️ Order deleted successfully!" });
    } catch (err) {
      console.error("Error deleting order:", err);
      res.status(500).json({ message: "❌ Failed to delete order" });
    }
  });

  app.post('/checkout', async (req, res) => {
    try {
      const cartData = req.body.items;

      if (!Array.isArray(cartData) || cartData.length === 0) {
        return res.status(400).json({ message: "Cart is empty or invalid" });
      }

      const orderDoc = {
        items: cartData,
        createdOn: new Date()
      };

      await orderCollection.insertOne(orderDoc);

      res.json({ message: "🛒 Order placed successfully!" })
    } catch (err) {
      console.error("Error saving order:", err);
      res.status(500).json({ message: "❌ Failed to place order" });
    }
  })

  app.listen(5000, () => {
    console.log("Server running on port 5000");
  });
});