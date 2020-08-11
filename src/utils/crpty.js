const bcrpty = require('bcryptjs')

const encrpty = password => {
    let salt = bcrpty.genSaltSync(5)
    let hash = bcrpty.hashSync(password, salt)
    return hash
}

const decrpty = (password, hash) => {
    return bcrpty.compareSync(password, hash)
}

module.exports = {
    encrpty,
    decrpty
}
