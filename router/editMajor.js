const { pool, Result, router } = require('../connect')
const itemSQL = require('../db/itemSQL')
const userSQL = require('../db/userSQL')

router.post('/item/editmajor', (req, res) => {
  let account_id = req.body.account_id
  let oldValue = req.body.oldValue
  let newMajor = {
    label: req.body.label,
    // value: req.body.value
  }

  if(!account_id) {
    res.json(new Result({ code: -1, msg: '账号不能为空!', data: null }))
  }

  if(!oldValue) {
    res.json(new Result({ code: -1, msg: '所要修改专业值不能为空!', data: null }))
  }

  if(!newMajor.label) {
    res.json(new Result({ code: -1, msg: '院系名称不能为空!', data: null }))
  }

  // if(!newMajor.value) {
  //   res.json(new Result({ code: -1, msg: '院系值不能为空!', data: null }))
  // }

  pool.getConnection((err, conn) => {
    conn.query(userSQL.queryByName, account_id, (e, r) => {
      // if(e) throw e
      if(e) {
        res.json(new Result({ code: -1, msg: '系统维护中,请稍后再试!', data: null }))
      }
      if(r[0].auth === 'super_admin' || r[0].auth === 'admin') {
        conn.query(userSQL.getMajorListByValue, oldValue, (e, r) => {
          // if(e) throw e
          if(e) {
            res.json(new Result({ code: -1, msg: '系统维护中,请稍后再试!', data: null }))
          }
          if(r[0]) {
            // conn.query(userSQL.getDepartListByValue, newMajor.value, (e, r) => {
            //   if(e) throw e
            //   if(!r[0]) {
                conn.query(userSQL.getMajorListByLabel, newMajor.label, (e, r) => {
                  // if(e) throw e
                  if(e) {
                    res.json(new Result({ code: -1, msg: '系统维护中,请稍后再试!', data: null }))
                  }
                  if(!r[0]) {
                    conn.query(itemSQL.editMajor, [newMajor, oldValue], (e, r) => {
                      // if(e) throw e
                      if(e) {
                        res.json(new Result({ code: -1, msg: '系统维护中,请稍后再试!', data: null }))
                      }
                      if(r) {
                        res.json(new Result({ code: 200, msg: '修改成功!', data: null }))
                      } else {
                        res.json(new Result({ code: -1, msg: '修改失败!', data: null }))
                      }  
                    })
                  } else {
                    res.json(new Result({ code: -1, msg: '该专业名已存在!', data: null }))
                  }  
                })
            //   } else {
            //     res.json(new Result({ code: -1, msg: '该专业值已存在!', data: null }))
            //   }  
            // })

          } else {
            res.json(new Result({ code: -1, msg: '该专业不存在!', data: null }))
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