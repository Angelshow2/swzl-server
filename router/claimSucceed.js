const { pool, Result, router } = require('../connect')
const itemSQL = require('../db/itemSQL') 

router.post('/item/claimsucceed', (req, res) => {
  let claim_id = req.body.account_id
  let id = req.body.id

  if(!id) {
    return res.json(new Result({ code: -1, msg: '物品id不能为空!', data: null }))
  }

  if(!claim_id) {
    return res.json(new Result({ code: -1, msg: '账号不能为空!', data: null }))
  }

  pool.getConnection((err, conn) => {
    conn.query(itemSQL.claimSucceed, [{ status: 2 }, claim_id, id], (e, r) => {
      if(e) throw e
      if(r.changedRows) {
        res.json(new Result({ code: 200, msg: '物品完成认领成功!', data: null }))
      } else {
        res.json(new Result({ code: -1, msg: '物品完成认领失败!', data: null }))
      }
    })
    pool.releaseConnection(conn)
  })
  
})

module.exports = router