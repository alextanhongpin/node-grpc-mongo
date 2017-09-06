const Koa = require('koa')
const Router = require('koa-router')
const grpc = require('grpc')
const path = require('path')
const port = process.env.PORT || 8080
const grpcHost = process.env.GRPC_HOST

console.log('grpcHost', grpcHost)

const router = new Router()

const app = new Koa()

const transactionProto = grpc.load(path.join(__dirname, '../proto/transaction.proto')).transaction

const client = new transactionProto.Transaction(grpcHost, grpc.credentials.createInsecure())
// const url = 'http://localhost:4100/proto.GetTransaction/8080'
// const url = `127.0.0.1:${port}`

router.get('/health', (ctx, next) => {
  ctx.body = {
    message: 'hello world'
  }
})

router.get('/', async (ctx, next) => {
  // const call = client.getTransaction({ id: '123456690' })
  client.getTransaction({ id: '123456690' }, (error, data) => {
    if (error) {
      console.log(error)
      ctx.body = {
        error: error.message
      }
      return
    }
    console.log('data', data)
    ctx.body = {
      data
    }
  })
  ctx.body = {
    message: 'hello world'
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
