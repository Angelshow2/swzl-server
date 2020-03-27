const { pool, Result, router } = require('../connect')
const itemSQL = require('../db/itemSQL')
const userSQL = require('../db/userSQL')

router.post('/item/returnitem', (req, res) => {
  let userId = req.body.accountid
  let itemId = req.body.id

  if(!userId) {
    return res.json(new Result({ code: -1, msg: '用户id不能为空！', data: null }))
  }
  if(!itemId) {
    return res.json(new Result({ code: -1, msg: '物品id不能为空！', data: null }))
  }

  pool.getConnection((err, conn) => {
    conn.query(userSQL.queryByName, userId, (e, r) => {
      if(e) throw e
      if(r.length) {
        conn.query(itemSQL.searchLostItemById, itemId, (e, r) => {
          if(e) throw e
          if(r.length && r[0].status === 0 && !r[0].return_id) {
            console.log(r)
            conn.query(itemSQL.returnItem, [{ return_id: userId, status: 1 }, itemId, userId], (e, r) => {
              if(e) throw e
              if(r.length) {
                res.json(new Result({ code: 200, msg: '归还成功！', data: null }))
              } else {
                res.json(new Result({ code: -1, msg: '归还失败！不可以归还给自己哦!', data: null }))
              }
            })
          } else {
            res.json(new Result({ code: -1, msg: '该物品不存在或已被归还！', data: null }))
          }
        })
      } else {
        res.json(new Result({ code: -1, msg: '该用户不存在！', data: null }))
      }
    })
    pool.releaseConnection(conn)
  })
})

module.exports = router