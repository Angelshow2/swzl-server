const { pool, Result, router } = require('../connect')
const itemSQL = require('../db/itemSQL')
const userSQL = require('../db/userSQL')

router.post('/item/deleteclass', (req, res) => {
  let account_id = req.body.account_id
  let itemclass = {
    value: req.body.value
  }

  if(!account_id) {
    res.json(new Result({ code: -1, msg: '账号不能为空!', data: null }))
  }
  if(!itemclass.value) {
    res.json(new Result({ code: -1, msg: '所要删除分类不能为空!', data: null }))
  }

  pool.getConnection((err, conn) => {
    conn.query(userSQL.queryByName, account_id, (e, r) => {
      if(e) throw e
      if(r[0].auth === 'super_admin' || r[0].auth === 'admin') {
  
        conn.query(itemSQL.getItemListByValue, itemclass.value, (e, r) => {
          if(e) throw e
          if(r[0]) {
            conn.query(itemSQL.deleteClass, itemclass.value , (e, r) => {
              if(e) throw e
              if(r) {
                res.json(new Result({ code: 200, msg: '删除成功!', data: null }))
              } else {
                res.json(new Result({ code: -1, msg: '删除失败!', data: null }))
              }
            })
          } else {
            res.json(new Result({ code: -1, msg: '该分类不存在!', data: null }))
          }
        })
         
        
      } else {
        res.json(new Result({ code: -1, msg: '用户权限不足!', data: null }))
      }
    })
    pool.releaseConnection(conn)
  })

})

module.exports = router