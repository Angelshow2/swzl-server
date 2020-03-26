const { pool, router, Result } = require('../connect')
const itemSQL = require('../db/itemSQL')

router.get('/item/userlost', (req, res) => {
  let account_id = req.query.account_id

  pool.getConnection((err, conn) => {
    conn.query(itemSQL.userPublishLost, account_id, (e, r) => {
      if(e) throw e
      if(r.length) {
        res.json(new Result({ code: 200, msg: '获取成功！', data: r }))
      } else {
        res.json(new Result({ code: -1, msg: '获取失败！', data: null }))
      }
    })
    pool.releaseConnection(conn)
  })
})

module.exports = router