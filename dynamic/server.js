const path = require('path')
const grpc = require('grpc')
const port = process.env.PORT || 50051

const MongoClient = require('mongodb').MongoClient
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/demo'

// We store our database as a global variable
let db = null

const transaction = grpc.load(path.join(__dirname, '../proto/transaction.proto')).transaction

async function getTransaction (call, callback) {
  const data = await db.collection('transactions').find().toArray()
  console.log(data)
  callback(null, {
    id: '1',
    created_at: Date.now(),
    updated_at: Date.now(),
    name: 'somethin',
    amount: 4.50,
    type: 'EXPENSE'
  })
}

async function main () {
  // Make a connection to the database before starting our server
  db = await MongoClient.connect(mongoUri)

  const server = new grpc.Server()
  server.addService(transaction.Transaction.service, {
    getTransaction
  })
  server.bind(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure())
  server.start()
  console.log(`listening to port *:${port}`)
}

main().catch(console.error)
