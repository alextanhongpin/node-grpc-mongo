const grpc = require('grpc')
const path = require('path')
const port = process.env.PORT || 8080

const transactionProto = grpc.load(path.join(__dirname, '../proto/transaction.proto')).transaction

const url = 'http://localhost:4100/proto.GetTransaction/8080'
// const url = `127.0.0.1:${port}`
function main () {
  const client = new transactionProto.Transaction(url, grpc.credentials.createInsecure())

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
