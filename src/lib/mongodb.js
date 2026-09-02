import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
const options = { family: 4 }

let client
let clientPromise

if (!process.env.MONGODB_URI) {
  throw new Error('Add Mongo URI to .env.local')
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise || global._mongoClientUri !== uri) {
    if (global._mongoClientPromise) {
      global._mongoClientPromise.then(c => c.close()).catch(() => {})
    }
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
    global._mongoClientUri = uri
  }
  clientPromise = global._mongoClientPromise
} else {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise