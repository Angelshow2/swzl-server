const { pool, Result, router } = require('../connect')
const userSQL = require('../db/userSQL')

router.post('/item/userinfo', (req, res) => {
  let account_id = req.body.account_id

  if(!account_id) {
    return res.json(new Result({ code: -1, msg: '账号不能为空!', data: null }))
  }

  pool.getConnection((err, conn) => {
    conn.query(userSQL.queryByName, account_id, (e, r) => {
      if(e) throw e
      if(r.length) {
        res.json(new Result({ code: 200, msg: '获取成功!', data: r[0] }))
      } else {
        res.json(new Result({ code: -1, msg: '获取失败!', data: null }))
      }
    })
    pool.releaseConnection(conn)
  })

})

module.exports = router