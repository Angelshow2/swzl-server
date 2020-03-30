const { pool, router, Result } = require('../connect')
const itemSQL = require('../db/itemSQL')

router.post('/item/claimlist', (req, res) => {
  let pageNum = req.body.pageNum
  let pageSize = req.body.pageSize || 10
  let searchText = req.body.searchText || ''
  let itemClass = req.body.itemClass || 0

  let start = ( pageNum - 1 ) * pageSize
  let totalNum
  let totalPage

  itemClass === 0 ? currentSql = `SELECT * FROM swzl_pick WHERE status=2 AND` : currentSql = `SELECT * FROM swzl_pick WHERE status=2 AND itemclass='${itemClass}' AND`

  pool.getConnection((err, conn) => {
    conn.query(`${currentSql} title LIKE '%${searchText}%'`, (e, r) => {
      if(e) throw e
      if(r) {
        totalNum = r.length
        totalPage = Math.ceil(totalNum / pageSize)
        pool.getConnection((err, conn) => {
          conn.query(`${currentSql} title LIKE '%${searchText}%' ORDER BY publish_time DESC LIMIT ${start},${pageSize}`, (e, r) => {
            if(e) throw e
            if(r) {
              res.json(new Result({ code: 200, msg: '获取成功！', data: { totalPage: totalPage, totalNum: totalNum, list: r  } }))
            } else {
              res.json(new Result({ code: -1, msg: '获取失败！', data: null }))
            }
          })
          pool.releaseConnection(conn)
        })
      } else {
        res.json(new Result({ code: -1, msg: '获取失败！', data: null }))
      }
    })
  })
})

module.exports = router