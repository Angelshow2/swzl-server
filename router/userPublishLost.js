const { pool, router, Result } = require('../connect')
const itemSQL = require('../db/itemSQL')

router.get('/item/userlost', (req, res) => {
  let account_id = req.query.account_id

  let pageNum = req.query.pageNum
  let pageSize = req.query.pageSize || 10

  if(!pageNum) {
    return res.json(new Result({ code: -1, msg: '页码不能为空!', data: null }))
  }

  let start = ( pageNum - 1 ) * pageSize
  let totalNum
  let totalPage 


  pool.getConnection((err, conn) => {
    conn.query(itemSQL.userPublishLost, [account_id, 0, 1000], (e, r) => {
      if(e) throw e
      if(r) {
        totalNum = r.length
        totalPage = Math.ceil(totalNum / pageSize)
        conn.query(itemSQL.userPublishLost, [account_id, start, parseInt(pageSize)], (e, r) => {
          if(e) throw e
          if(r) {
            res.json(new Result({ code: 200, msg: '获取成功！', data: { totalPage: totalPage, totalNum: totalNum, list: r  } }))
          } else {
            res.json(new Result({ code: -1, msg: '获取失败！', data: null }))
          }
        })
        pool.releaseConnection(conn)
      } else {
        res.json(new Result({ code: -1, msg: '获取失败！', data: null }))
      }
    })
  })
})

module.exports = router