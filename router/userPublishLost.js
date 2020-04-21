const { pool, router, Result } = require('../connect')
const itemSQL = require('../db/itemSQL')

router.post('/item/userlost', (req, res) => {
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
    conn.query(itemSQL.userPublishLost, [account_id, 0, 1000], (e, r) => {
      // if(e) throw e
      if(e) {
        res.json(new Result({ code: -1, msg: '系统维护中,请稍后再试!', data: null }))
      }
      if(r) {
        totalNum = r.length
        totalPage = Math.ceil(totalNum / pageSize)
        conn.query(itemSQL.userPublishLost, [account_id, start, parseInt(pageSize)], (e, r) => {
          // if(e) throw e
          if(e) {
            res.json(new Result({ code: -1, msg: '系统维护中,请稍后再试!', data: null }))
          }
          if(r) {
            res.json(new Result({ code: 200, msg: '获取成功！', data: { totalPage: totalPage, totalNum: totalNum, list: r  } }))
          } else {
            res.json(new Result({ code: -1, msg: '获取失败！', data: null }))
          }
        })
        
      } else {
        res.json(new Result({ code: -1, msg: '获取失败！', data: null }))
      }
    })
    pool.releaseConnection(conn)
  })
})

module.exports = router