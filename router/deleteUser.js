const { pool, router, Result } = require('../connect')
const userSQL = require('../db/userSQL')

router.post('/item/deleteuser', (req, res) => {
  let userId = req.body.userId
  let account_id = req.body.account_id
  
  pool.getConnection((err, conn) => {
    conn.query(userSQL.queryByName, userId, (e, r) => {
      // if(e) throw e
      if(e) {
        res.json(new Result({ code: -1, msg: '系统维护中,请稍后再试!', data: null }))
      }
      if(r[0].auth === 'super_admin') {
        conn.query(userSQL.deleteUser, account_id ,(e, r) => {
          // if(e) throw e
          if(e) {
            res.json(new Result({ code: -1, msg: '系统维护中,请稍后再试!', data: null }))
          }
          if(r) {
            res.json(new Result({ code: 200, msg: '成功!!', data: null }))
          } else {
            res.json(new Result({ code: -1, msg: '失败!', data: null }))
          }
        })
       
      } else {
        res.json(new Result({ code: -1, msg: '用户权限不足!', data: null }))
      }
    })
    pool.releaseConnection(conn)
  })
})

module.exports = router