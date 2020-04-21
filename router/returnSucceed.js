const { pool, Result, router } = require('../connect')
const itemSQL = require('../db/itemSQL') 

router.post('/item/returnsucceed', (req, res) => {
  let return_id = req.body.account_id
  let id = req.body.id

  if(!id) {
    return res.json(new Result({ code: -1, msg: '物品id不能为空!', data: null }))
  }

  if(!return_id) {
    return res.json(new Result({ code: -1, msg: '账号不能为空!', data: null }))
  }

  pool.getConnection((err, conn) => {
    conn.query(itemSQL.returnSucceed, [{ status: 2 }, return_id, id], (e, r) => {
      // if(e) throw e
      if(e) {
        res.json(new Result({ code: -1, msg: '系统维护中,请稍后再试!', data: null }))
      }
      if(r.changedRows) {
        res.json(new Result({ code: 200, msg: '物品完成归还成功!', data: null }))
      } else {
        res.json(new Result({ code: -1, msg: '物品完成归还失败!', data: null }))
      }
    })
    pool.releaseConnection(conn)
  })
})

module.exports = router