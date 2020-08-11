const mysql = require('mysql')
const { database } = require('../config')
const { users } = require('./init')

const pool = mysql.createPool({
    host: database.HOST,
    user: database.USERNAME,
    password: database.PASSWORD,
    database: database.DATABASE,
    port: database.PORT
})

const query = (sql, values) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err)
            } else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    connection.release()
                })
            }
        })
    })
}

const createTable = (sql) => {
    return query(sql, [])
}

createTable(users)

// 用户注册
exports.insterUser = (val) => {
    const _sql = "insert into users set username=?,password=?,create_at=?;";
    return query(_sql, val)
}

// 用户登录
exports.getUserLogin = (username, password) => {
    const _sql = `select * from users where username=${username},password=${password};`;
    return query(_sql)
}
