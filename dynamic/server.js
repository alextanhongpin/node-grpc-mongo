const path = require('path')
const grpc = require('grpc')

const MongoClient = require('mongodb').MongoClient

const port = process.env.PORT
const mongoUri = process.env.MONGO_URI

// We store our database as a global variable
let db = null

const transaction = grpc.load(path.join(__dirname, '../proto/transaction.proto')).transaction

// TODO: Change this to streaming approach
async function getTransaction (call, callback) {
  // call.write({
  //   _id: '123456789',
  //   name: 'john.doe',
  //   price: 1234.50
  // })
  // call.end()
  const data = {
    _id: '123456789',
    name: 'john.doe',
    price: 1234.50
  }
  callback(null, data)
  // const cursor = await db.collection('transactions').find()

  // cursor.on('data', (doc) => {
  //   doc._id = doc._id.toString()
  //   call.write(doc)
  // }).on('end', () => {
  //   call.end()
  // })
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
