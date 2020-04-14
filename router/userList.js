const { pool, router, Result } = require('../connect')
const userSQL = require('../db/userSQL')

router.post('/item/userlist', (req, res) => {
  let account_id = req.body.account_id
  let searchText = req.body.searchText
  let pageNum = req.body.pageNum
  let pageSize = req.body.pageSize || 10
  let type = req.body.type
 
  if(!pageNum) {
    return res.json(new Result({ code: -1, msg: '页码不能为空!', data: null }))
  }

  if(!account_id) {
    return res.json(new Result({ code: -1, msg: '账号不能为空!', data: null }))
  }

  let start = ( pageNum - 1 ) * pageSize
  let totalNum
  let totalPage

  pool.getConnection((err, conn) => {
    conn.query(userSQL.queryByName, account_id, (e, r) => {
      if(e) throw e
      if(r[0].auth === 'super_admin' || r[0].auth === 'admin') {
        if(!type) {
          conn.query(userSQL.getUserListT,[ `%${searchText}%`, 0, 10000 ], (e, r) => {
            if(e) throw e
            if(r) {
              totalNum = r.length
              totalPage = Math.ceil(totalNum / pageSize)
              conn.query(userSQL.getUserListT, [ `%${searchText}%`, start, pageSize ],(e, r) => {
                if(e) throw e
                if(r) {
                  res.json(new Result({ code: 200, msg: '获取成功!', data: { totalPage: totalPage, totalNum: totalNum, list: r  } }))
                } else {
                  res.json(new Result({ code: -1, msg: '获取失败!', data: null }))
                }
              })
             
            } else {
              res.json(new Result({ code: -1, msg: '获取失败!', data: null }))
            }
          })
        } else {
          conn.query(userSQL.getUserList,[ type, `%${searchText}%`, 0, 10000 ], (e, r) => {
            if(e) throw e
            if(r) {
              totalNum = r.length
              totalPage = Math.ceil(totalNum / pageSize)
              conn.query(userSQL.getUserList, [ type, `%${searchText}%`, start, pageSize ],(e, r) => {
                if(e) throw e
                if(r) {
                  res.json(new Result({ code: 200, msg: '获取成功!', data: { totalPage: totalPage, totalNum: totalNum, list: r  } }))
                } else {
                  res.json(new Result({ code: -1, msg: '获取失败!', data: null }))
                }
              })
            
            } else {
              res.json(new Result({ code: -1, msg: '获取失败!', data: null }))
            }
          })
        }
      } else {
        res.json(new Result({ code: -1, msg: '用户权限不足!', data: null }))
      }
    })
    pool.releaseConnection(conn)
  })
})

module.exports = router