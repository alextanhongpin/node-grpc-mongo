const messages = require('./proto/transaction_pb')
const services = require('./proto/transaction_grpc_pb')

const grpc = require('grpc')

function main () {
  const client = new services.TransactionClient('localhost:50051', grpc.credentials.createInsecure())

  const request = new messages.TransactionRequest()
  request.setId(1)
  client.getTransaction(request, (error, response) => {
    if (error) {
      console.log(error)
    }
    console.log(response)
  })
}

main()
