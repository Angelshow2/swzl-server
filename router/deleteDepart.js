const { pool, Result, router } = require('../connect')
const itemSQL = require('../db/itemSQL')
const userSQL = require('../db/userSQL')

router.post('/item/deletedepart', (req, res) => {
  let account_id = req.body.account_id
  let oldValue = req.body.oldValue
  

  if(!account_id) {
    res.json(new Result({ code: -1, msg: '账号不能为空!', data: null }))
  }

  if(!oldValue) {
    res.json(new Result({ code: -1, msg: '所要删除院系值不能为空!', data: null }))
  }

  pool.getConnection((err, conn) => {
    conn.query(userSQL.queryByName, account_id, (e, r) => {
      // if(e) throw e
      if(e) {
        res.json(new Result({ code: -1, msg: '系统维护中,请稍后再试!', data: null }))
      }
      if(r[0].auth === 'super_admin' || r[0].auth === 'admin') {
        conn.query(itemSQL.deleteDepart, oldValue, (e, r) => {
          if(e) {
            res.json(new Result({ code: -1, msg: '请先删除该院系所属专业!', data: null }))
          }
          if(r) {
            res.json(new Result({ code: 200, msg: '删除成功!', data: null }))
          } else {
            res.json(new Result({ code: -1, msg: '删除失败!', data: null }))
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