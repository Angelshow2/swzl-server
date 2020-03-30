const { pool, Result, router } = require('../connect')
const itemSQL = require('../db/itemSQL')

router.post('/item/userclaim', (req, res) => {
  let account_id = req.body.account_id

  let pageNum = req.body.pageNum
  let pageSize = req.body.pageSize || 10

  if(!pageNum) {
    return res.json(new Result({ code: -1, msg: '页码不能为空!', data: null }))
  }

  if(!account_id) {
    return res.json(new Result({ code: -1, msg: '账号不能为空!' }))
  }

  let start = ( pageNum - 1 ) * pageSize
  let totalNum
  let totalPage 


  pool.getConnection((err, conn) => {
    conn.query(itemSQL.userClaim, [account_id, 0, 1000], (e, r) => {
      if(e) throw e
      if(r) {
        totalNum = r.length
        totalPage = Math.ceil(totalNum / pageSize)
        conn.query(itemSQL.userClaim, [account_id, start, parseInt(pageSize)], (e, r) => {
          if(e) throw e
          if(r) {
            res.json(new Result({ code: 200, msg: '获取成功！', data: { totalPage: totalPage, totalNum: totalNum, list: r  } }))
          } else {
            res.json(new Result({ code: -1, msg: '获取失败！', data: null }))
          }
        })
        pool.releaseConnection(conn)
      } else {
        res.json(new Result({ code: -1, msg: '获取失败!' }))
      }
    })
  })
})
module.exports = router