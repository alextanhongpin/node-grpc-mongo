const messages = require('..//proto/transaction_pb')
const services = require('../proto/transaction_grpc_pb')

const grpc = require('grpc')

function getTransaction (call, callback) {
  const reply = new messages.TransactionResponse()
  reply.setId(1)
  reply.setCreatedAt(Date.now())
  reply.setUpdatedAt(Date.now())
  reply.setName('john')
  reply.setAmount(123.45)
  reply.setType(0)
  callback(null, reply)
}

function main () {
  const server = new grpc.Server()
  server.addService(services.TransactionService, {
    getTransaction
  })
  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure())
  server.start()
}

main()
