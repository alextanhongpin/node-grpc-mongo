const grpc = require('grpc')
const path = require('path')
const port = process.env.PORT || 5000

const transactionProto = grpc.load(path.join(__dirname, '../proto/transaction.proto')).transaction
function main () {
  const client = new transactionProto.Transaction(`localhost:${port}`, grpc.credentials.createInsecure())

  const call = client.getTransaction({ id: '123456690' })
  call.on('data', (item) => {
    console.log(item)
  })

  call.on('end', (error, done) => {
    if (error) {
      console.log(error)
    }
    console.log(done)
  })
}

main()
