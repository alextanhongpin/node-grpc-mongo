const Koa = require('koa')
const Router = require('koa-router')
const grpc = require('grpc')
const path = require('path')
const port = process.env.PORT || 8080
const grpcHost = process.env.GRPC_HOST

console.log('grpcHost', grpcHost)

const router = new Router()

const app = new Koa()

const transaction = grpc.load(path.join(__dirname, '../proto/transaction.proto')).transaction

const client = new transaction.Transaction(grpcHost, grpc.credentials.createInsecure())
// const url = 'http://localhost:4100/proto.GetTransaction/8080'
// const url = `127.0.0.1:${port}`

router.get('/health', (ctx, next) => {
  ctx.body = {
    message: 'hello world'
  }
})
function getTransaction (params) {
  return new Promise((resolve, reject) => {
    client.getTransaction(params, (error, data) => {
      error ? reject(error) : resolve(data)
    })
  })
}

router.get('/', async (ctx, next) => {
  console.log('calling endpoint')
  // const call = client.getTransaction({ id: '123456690' })
  const data = await getTransaction({ id: '1234567' })
  ctx.body = {
    data
  }

  // call.on('data', (item) => {
  //   console.log('item', item)
  //   data.push(item)
  // })

  // call.on('end', (error, done) => {
  //   if (error) {
  //     console.log('error', error)
  //     ctx.body = {
  //       error: error.message
  //     }
  //     return
  //   }
  //   console.log('done', done, data)
  // })
  // ctx.body = {
  //   message: 'done',
  //   data
  // }
})

app
.use(router.routes())
.use(router.allowedMethods())

app.listen(port)
console.log(`listening to port *:${port}. press ctrl + c to cancel.`)
