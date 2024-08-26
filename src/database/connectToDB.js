import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;
const cached = {};
async function connectToDB() {
  if (!MONGO_URI) {
    throw new Error(
      "Please define the MONGO_URI environment variable inside .env"
    );
  }
  if (cached.connection) {
    console.log("cached connect");
    return cached.connection;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      dbName: process.env.DB_NAME,
    };
    cached.promise = mongoose.connect(MONGO_URI, opts);
  }
  try {
    cached.connection = await cached.promise;
  } catch (e) {
    cached.promise = undefined;
    throw e;
  }
  console.log("new connection");
  return cached.connection;
}
export default connectToDB;
