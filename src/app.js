const Koa = require('koa')
const Router = require('koa-router')
const config = require('./config/default')
const app = new Koa()
const router = new Router()



app.use(router.routes())
app.use(router.allowedMethods())

router.get('/', ctx => {
    ctx.body = {
        code: 1,
        data: 'success'
    }
})

app.listen(config.port, () => {
    console.log(`http://${config.host}:${config.port}`)
})
