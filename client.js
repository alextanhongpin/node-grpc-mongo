const grpc = require('grpc')
const path = require('path')

const transactionProto = grpc.load(path.join(__dirname, 'proto/transaction.proto')).transaction
function main () {
  const client = new transactionProto.Transaction('localhost:50051', grpc.credentials.createInsecure())

  client.getTransaction({ id: '123456690' }, (error, response) => {
    if (error) {
      console.log(error)
    }
    console.log(response)
  })
}

main()
