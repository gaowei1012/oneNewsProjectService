const Koa = require('koa')
const { port, host, database } = require('./config')
const logger = require('koa-logger')
const koaBody = require('koa-body')
const session = require('koa-session-minimal')
const MysqlStore = require('koa-mysql-session')

const app = new Koa()

const sessionMysqlConfig = {
    user: database.USERNAME,
    password: database.PASSWORD,
    database: database.DATABASE,
    host: database.HOST
}

app
    .use(session({ key: 'USER_SID', store: new MysqlStore(sessionMysqlConfig) }))
    .use(koaBody())
    .use(logger())

app
    .use(require('./router/user').routes())



app.listen(port, () => {
    console.log(`http://${host}:${port}`)
})
