
const UserModql = require('../db/mysql')
const {decrpty, encrpty} = require('../utils/crpty')

/* 获取用户信息 */
exports.getUserInfo = async (ctx, next) => {
    const data = []
    ctx.body = {
        code: 0,
        data: data
    }

    await next()
}

/* 用户注册 */
exports.register = async (ctx, next) => {
    let create_at = new Date()
    let {username, password} = ctx.request.body
    if ((username && password) !== null) {
        newPassword = encrpty(password)
        await UserModql.insterUser([username, newPassword, create_at])
            .then(res => {
                ctx.body = {
                    code: 1,
                    data: '注册成功'
                }
            })
            .catch(err => {
                ctx.body = {
                    code: 0,
                    data: `注册失败${err}`
                }
            })
    } else {
        ctx.body = {
            code: 1,
            data: '用户名密码不能为空'
        }
    }
    
    await next()
}

/* 用户登录 */
exports.login = async (ctx, next) => {
    let {username, password} = ctx.request.body
    if ((username && password) !== null) {
        newPassword = encrpty(password)
        await UserModal.getUserLogin(username, newPassword)
            .then(res => {
                // 用户登录成功，返回token
                const token = ''
                ctx.body = {
                    code: 1,
                    data: token
                }
            })
            .catch(err => {
                ctx.body = {
                    code: -1,
                    data: err
                }
            })
    } else {
        ctx.body = {
            code: -1,
            data: '用户名密码不能为空'
        }
    }

    await next()
}
