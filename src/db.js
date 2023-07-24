import mongoose from 'mongoose';


// example from mongoose 
// export const connectDb = async (url = process.env.DATABASE_URL, opts = {}) => {
//   try {
//     await mongoose.connect(url, { ...opts, useNewUrlParser: true, useUnifiedTopology: true });
//     console.log('Connected to database');
//   } catch (error) {
//     console.log(error);
//   }
// }


// example from mongodb 

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://zeke:Ez3qu13l.-.@cluster0.iwtkthu.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
