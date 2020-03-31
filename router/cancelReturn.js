const { pool, Result, router } = require('../connect')
const itemSQL = require('../db/itemSQL') 

router.post('/item/cancelreturn', (req, res) => {
  let return_id = req.body.account_id
  let id = req.body.id

  if(!id) {
    return res.json(new Result({ code: -1, msg: '物品id不能为空!', data: null }))
  }

  if(!return_id) {
    return res.json(new Result({ code: -1, msg: '账号不能为空!', data: null }))
  }

  pool.getConnection((err, conn) => {
    conn.query(itemSQL.cancelReturn, [{ return_id: '', status: 0 }, return_id, id], (e, r) => {
      if(e) throw e
      // console.log(r)
      if(r.changedRows) {
        res.json(new Result({ code: 200, msg: '取消归还成功!', data: null }))
      } else {
        res.json(new Result({ code: -1, msg: '取消归还失败!', data: null }))
      }
    })
    pool.releaseConnection(conn)
  })

})

module.exports = router