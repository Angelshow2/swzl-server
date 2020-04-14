const { pool, Result, router } = require('../connect')
const itemSQL = require('../db/itemSQL')
const userSQL = require('../db/userSQL')

router.post('/item/editclass', (req, res) => {
  let account_id = req.body.account_id
  let itemclass = {
    label: req.body.label,
    oldValue: req.body.oldValue
  }

  if(!account_id) {
    res.json(new Result({ code: -1, msg: '账号不能为空!', data: null }))
  }
  if(!itemclass.label) {
    res.json(new Result({ code: -1, msg: '分类名不能为空!', data: null }))
  }
  if(!itemclass.oldValue) {
    res.json(new Result({ code: -1, msg: '所要修改分类不能为空!', data: null }))
  }

  pool.getConnection((err, conn) => {
    conn.query(userSQL.queryByName, account_id, (e, r) => {
      if(e) throw e
      if(r[0].auth === 'super_admin' || r[0].auth === 'admin') {
  
        conn.query(itemSQL.getItemListByValue, itemclass.oldValue, (e, r) => {
          if(e) throw e
          if(r[0]) {
            conn.query(itemSQL.editClass, [{ label: itemclass.label }, itemclass.oldValue ] , (e, r) => {
              if(e) throw e
              if(r) {
                res.json(new Result({ code: 200, msg: '修改成功!', data: null }))
              } else {
                res.json(new Result({ code: -1, msg: '修改失败!', data: null }))
              }
            })
          } else {
            res.json(new Result({ code: -1, msg: '该分类值不存在!', data: null }))
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