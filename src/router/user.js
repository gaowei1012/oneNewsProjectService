const router = require('koa-router')()
const controller = require('../controller/user')

router.get('/api/user/getUserInfo', controller.getUserInfo)
router.post('/api/user/register', controller.register)
router.post('/api/user/login', controller.login)

module.exports = router
