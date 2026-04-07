import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is missing");
}

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

const globalWithMongoose = global as typeof globalThis & {
  mongoose: MongooseCache;
};

if (!globalWithMongoose.mongoose) {
  globalWithMongoose.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (globalWithMongoose.mongoose.conn) {
    return globalWithMongoose.mongoose.conn;
  }

  if (!globalWithMongoose.mongoose.promise) {
    globalWithMongoose.mongoose.promise = mongoose.connect(MONGODB_URI);
  }

  globalWithMongoose.mongoose.conn =
    await globalWithMongoose.mongoose.promise;

  return globalWithMongoose.mongoose.conn;
}
