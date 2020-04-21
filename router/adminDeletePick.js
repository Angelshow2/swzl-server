const { pool, Result, router } = require('../connect')
const userSQL = require('../db/userSQL')
const itemSQL = require('../db/itemSQL')

router.post('/item/admindeletepick', (req, res) => {
  let account_id = req.body.account_id
  let id = req.body.id

  pool.getConnection((err, conn) => {
    conn.query(userSQL.queryByName, account_id, (e, r) => {
      // if(e) throw e
      if(e) {
        res.json(new Result({ code: -1, msg: '系统维护中,请稍后再试!', data: null }))
      }
      if(r[0].auth === 'super_admin' || r[0].auth === 'admin') {
        conn.query(itemSQL.adminDeletePick, id, (e, r) => {
          // if(e) throw e
          if(e) {
            res.json(new Result({ code: -1, msg: '系统维护中,请稍后再试!', data: null }))
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