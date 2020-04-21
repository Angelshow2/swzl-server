const { pool, Result, router } = require('../connect')
const itemSQL = require('../db/itemSQL')

router.post('/item/deleteuserpick', (req, res) => {

  let id = req.body.id
  let account_id = req.body.account_id

  if(!id) {
    return res.json(new Result({ code: -1, msg: '物品id不能为空!', data: null }))
  }

  if(!account_id) {
    return res.json(new Result({ code: -1, msg: '账号不能为空!', data: null }))
  }

  pool.getConnection((err, conn) => {
    conn.query(itemSQL.deleteUserPick, [id, account_id], (e, r) => {
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
    pool.releaseConnection(conn)
  })
})

module.exports = router