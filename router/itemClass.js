const { pool, router, Result } = require('../connect')
const itemSQL = require('../db/itemSQL')

router.post('/item/itemclass', (req, res) => {
  pool.getConnection((err, conn) => {
    conn.query(itemSQL.getItemList, (e, r) => {
      if(e) throw e
      if(r) {
        res.json(new Result({ code: 200, msg: '获取成功！', data: r }))
      } else {
        res.json(new Result({ code: -1, msg: '获取失败！', data: null }))
      }
    })
    pool.releaseConnection(conn)
  })
})

module.exports = router