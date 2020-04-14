const { pool, router, Result } = require('../connect')
const userSQL = require('../db/userSQL')

router.post('/item/authlist', (req, res) => {
  pool.getConnection((err, conn) => {
    conn.query(userSQL.getAuthList, (e, r) => {
      if(e) throw e
      if(r) {
        res.json(new Result({ code: 200, msg: '获取成功!', data: r }))
      } else {
        res.json(new Result({ code: -1, msg: '获取失败!', data: null }))
      }
    })
    pool.releaseConnection(conn)
  })
})

module.exports = router