const mysql = require('mysql')
const express = require('express')
const app = express()
const router = express.Router()
const path = require('path')

// 解析参数
const bodyParser = require('body-parser')
// json请求
app.use(bodyParser.json())
// 表单请求
app.use(bodyParser.urlencoded({extended: false}))

app.use('/public',express.static(path.join(__dirname, 'public')))


const option = {
  host: 'localhost',
  user: 'root',
  password: '981055641',
  port: '3306',
  database: 'swzl',
  connectTimeout: 5000, // 连接超时
  mutipleStatements: false  // 是否允许一个query中包含多条sql语句
}

let pool
repool()
function Result({ code = 1, msg = '', data = {} }) {
  this.code = code
  this.msg = msg
  this.data = data
}

// 断线重连机制
function repool() {
  // 创建连接池
  pool = mysql.createPool({
    ...option,
    waitForConnections: true, // 当无连接池可用时，等待（true）还是抛错（false）
    connectionLimit: 100, // 连接数限制
    queueLimit: 0 // 最大连接等待数（0为不限制）
  })
  pool.on('error', err => {
    err.code === 'PROTOCOL_CONNECTION_LOST' && setTimeout(repool, 2000)
  })
  app.all('*', (_,__, next) => {
    pool.getConnection( err => {
        err && setTimeout(repool, 2000) || next()
    })
  })
}

module.exports = { app, pool, Result, router }