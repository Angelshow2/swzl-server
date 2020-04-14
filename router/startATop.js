const { pool, router, Result } = require('../connect')
const userSQL = require('../db/userSQL')

router.post('/item/startatop', (req, res) => {
  let userId = req.body.userId
  let account_id = req.body.account_id
  let status = req.body.status

  if(status==='') {
    return res.json(new Result({ code: -1, msg: '状态不能为空!', data: null }))
  }

  let updateData

  if(status == 1) {
    updateData = {
      status: 0,
      status_name: '停用'
    }
  } else if(status == 0) {
    updateData = {
      status: 1,
      status_name: '正常'
    }
  }
  
  pool.getConnection((err, conn) => {
    conn.query(userSQL.queryByName, userId, (e, r) => {
      if(e) throw e
      if(r[0].auth === 'super_admin' || r[0].auth === 'admin') {
        conn.query(userSQL.updateUser, [updateData, account_id] ,(e, r) => {
          if(e) throw e
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