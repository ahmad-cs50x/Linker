import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI

if (!uri) {
  throw new Error('Please add MONGODB_URI to .env.local')
}

const options = {
  serverSelectionTimeoutMS: 30000,
  connectTimeoutMS: 30000,
  socketTimeoutMS: 60000,
  maxPoolSize: 10,
  retryWrites: true,
  w: "majority",
}

let cachedClient = null
let cachedPromise = null

export async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  console.log("🔄 Connecting to MongoDB Atlas...");

  try {
    const client = new MongoClient(uri, options);
    cachedPromise = client.connect();
    cachedClient = await cachedPromise;
    console.log("✅ MongoDB connected successfully!");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    cachedClient = null;
    cachedPromise = null;
    throw err;
  }

  return cachedClient;
}

// Export for compatibility
export default connectToDatabase;