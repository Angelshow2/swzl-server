 const { pool, router, Result } = require('../connect')
 const userSQL = require('../db/userSQL')
 const tokenObj = require('../utils/jwt')

 router.post('/user/login', (req, res) => {
   let obj = req.body
   if(obj.account_id === '' || obj.password === '') {
      res.json(new Result({ code: -1, msg: '用户名或密码不能为空', data: null }))
      return
   }
   pool.getConnection((err, conn) => {
     conn.query(userSQL.queryByNamePassword, [obj.account_id, obj.password], (e, r) => {
       if(e) throw e
       if(r[0] != undefined) {
        if(r[0].status === 0) {
          res.json(new Result({ code: -1, msg: '账号已停用！请联系管理员处理!', data: null }))
        } else {
          let myToken = new tokenObj()
          let tokenv = myToken.createToken('login', 60*300  )
          // console.log(r)
          res.json(new Result({ code: 200, msg: '登录成功', data: { name: r[0].user_name, accountid: r[0].account_id, token: tokenv } }))
        }
        
       } else {
        res.json(new Result({ code: -1, msg: '用户名或密码错误！', data: null }))
       }
     })
     pool.releaseConnection(conn) // 释放连接池，等待别的连接使用
   })
 })

 module.exports = router