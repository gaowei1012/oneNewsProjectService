
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
    const data = []
    ctx.body = {
        code: 1,
        data: data
    }
}

/* 用户登录 */
exports.login = async (ctx, next) => {
    const data = []
    ctx.body = {
        code: 1,
        data: data
    }
}
