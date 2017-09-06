const path = require('path')
const grpc = require('grpc')
const port = process.env.PORT || 50051

// console.log(path.join(__dirname, 'proto/transaction.proto'))
const transaction = grpc.load(path.join(__dirname, './proto/transaction.proto')).transaction
function getTransaction (call, callback) {
  callback(null, {
    id: '1',
    created_at: Date.now(),
    updated_at: Date.now(),
    name: 'somethin',
    amount: 4.50,
    type: 'EXPENSE'
  })
}

function main () {
  const server = new grpc.Server()
  server.addService(transaction.Transaction.service, {
    getTransaction
  })
  server.bind(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure())
  server.start()
  console.log(`listening to port *:${port}`)
}

main()
