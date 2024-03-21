const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://Sam2899:Sam$2899@csci5709-t6.0lyekxc.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri);
let collection;

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    const db = client.db("T7");
    collection = db.collection("users");
    console.log("Connected to MongoDB Database");
  } catch (e) {
    console.log(e);
  }
}

async function end() {
  await client.close();
}

// Add data
const addUser = async function (document) {
  await run();
  await collection.insertOne(document);
  await end();
};

// Find user by ID
const getUserById = async function (query) {
  await run();
  const documents = await collection.findOne(query);
  await end();
  return documents;
};

// Find all users
const getAllUsers = async function (query) {
  await run();
  const documents = await collection.find(query).toArray();
  await end();
  return documents;
};

// Update data
const updateUser = async function (query, update) {
  await run();
  const result = await collection.updateOne(query, { $set: update });
  await end();
  return result;
};

// Delete data
const deleteUser = async function (query) {
  await run();
  const result = await collection.deleteOne(query);
  await end();
  return result;
};

module.exports = {
  addUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
