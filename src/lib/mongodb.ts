import mongoose from "mongoose";

type Cache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

const globalForMongoose = globalThis as typeof globalThis & { mongooseCache?: Cache };

const cache: Cache = globalForMongoose.mongooseCache ?? { conn: null, promise: null };
globalForMongoose.mongooseCache = cache;

export class DatabaseUnavailableError extends Error {
  constructor(message = "The catalogue database is unavailable.") {
    super(message);
    this.name = "DatabaseUnavailableError";
  }
}

function isLocalDatabase(uri: string) {
  return /^mongodb:\/\/(?:[^@/]+@)?(127\.0\.0\.1|localhost)(?::\d+)?(?:\/|$)/i.test(uri);
}

export async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new DatabaseUnavailableError("MONGODB_URI is not configured.");
  }
  if (process.env.NETLIFY && isLocalDatabase(uri)) {
    throw new DatabaseUnavailableError("Netlify cannot reach a database on this computer.");
  }
  if (cache.conn) return cache.conn;
  if (!cache.promise) {
    cache.promise = mongoose
      .connect(uri, { serverSelectionTimeoutMS: 4000, bufferCommands: false })
      .then((connection) => {
        cache.conn = connection;
        return connection;
      })
      .catch((error: unknown) => {
        cache.promise = null;
        cache.conn = null;
        const message = error instanceof Error ? error.message : "Connection failed";
        throw new DatabaseUnavailableError(message);
      });
  }
  return cache.promise;
}
