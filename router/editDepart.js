const { pool, Result, router } = require('../connect')
const itemSQL = require('../db/itemSQL')
const userSQL = require('../db/userSQL')

router.post('/item/editdepart', (req, res) => {
  let account_id = req.body.account_id
  let oldValue = req.body.oldValue
  let newDepart = {
    label: req.body.label,
    // value: req.body.value
  }

  if(!account_id) {
    res.json(new Result({ code: -1, msg: '账号不能为空!', data: null }))
  }

  if(!oldValue) {
    res.json(new Result({ code: -1, msg: '所要修改院系值不能为空!', data: null }))
  }

  if(!newDepart.label) {
    res.json(new Result({ code: -1, msg: '院系名称不能为空!', data: null }))
  }

  // if(!newDepart.value) {
  //   res.json(new Result({ code: -1, msg: '院系值不能为空!', data: null }))
  // }

  pool.getConnection((err, conn) => {
    conn.query(userSQL.queryByName, account_id, (e, r) => {
      if(e) throw e
      if(r[0].auth === 'super_admin' || r[0].auth === 'admin') {
        conn.query(userSQL.getDepartListByValue, oldValue, (e, r) => {
          if(e) throw e
          if(r[0]) {
            // conn.query(userSQL.getDepartListByValue, newDepart.value, (e, r) => {
            //   if(e) throw e
            //   if(!r[0]) {
                conn.query(userSQL.getDepartListByLabel, newDepart.label, (e, r) => {
                  if(e) throw e
                  if(!r[0]) {
                    conn.query(itemSQL.editDepart, [newDepart, oldValue], (e, r) => {
                      if(e) throw e
                      if(r) {
                        res.json(new Result({ code: 200, msg: '修改成功!', data: null }))
                      } else {
                        res.json(new Result({ code: -1, msg: '修改失败!', data: null }))
                      }  
                    })
                  } else {
                    res.json(new Result({ code: -1, msg: '该院系名已存在!', data: null }))
                  }  
                })
            //   } else {
            //     res.json(new Result({ code: -1, msg: '该院系值已存在!', data: null }))
            //   }  
            // })

          } else {
            res.json(new Result({ code: -1, msg: '该院系不存在!', data: null }))
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