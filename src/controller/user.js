
const UserModal = require('../db/mysql')
const {decrpty, encrpty} = require('../utils/crpty')
const {jwtSecret, tokenExpiresTime} = require('../config')
const jwt = require('jsonwebtoken')

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
        // newPassword = encrpty(password)
        await UserModal.insterUser([username, password, create_at])
            .then(ret => {
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
    let payload = {
        exp:Date.now() + tokenExpiresTime,
        name: username
    }
    if ((username && password) !== null) {
        await UserModal.findUserLogin(username, password)
            .then(ret => {
                // 用户登录成功，返回token
                let token = jwt.sign(payload, jwtSecret)
                ctx.body = {
                    code: 1,
                    message: 'OK',
                    token: token
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
