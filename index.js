const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8080;
const uri = process.env.CONNECTION;

const client = new MongoClient(uri);
const DB = "memebership_managment";
const membershipCollection = "memberships";

app.get("/memberships", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db(DB)
      .collection(membershipCollection)
      .find()
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.post("/memberships", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db(DB)
      .collection(membershipCollection)
      .insertOne(req.body);
    await con.close();
    res.send(data);
    DB(DB).collection();
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.delete("/memberships/:id", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db(DB)
      .collection(membershipCollection)
      .deleteOne({ _id: ObjectId(req.params.id) });
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
