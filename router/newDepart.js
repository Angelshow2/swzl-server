const { pool, Result, router } = require('../connect')
const itemSQL = require('../db/itemSQL')
const userSQL = require('../db/userSQL')

router.post('/item/newdepart', (req, res) => {
  let account_id = req.body.account_id
  let depart = {
    label: req.body.label,
    value: req.body.value
  }

  if(!account_id) {
    res.json(new Result({ code: -1, msg: '账号不能为空!', data: null }))
  }
  if(!depart.label) {
    res.json(new Result({ code: -1, msg: '院系名不能为空!', data: null }))
  }
  if(!depart.value) {
    res.json(new Result({ code: -1, msg: '值不能为空!', data: null }))
  }

  pool.getConnection((err, conn) => {
    conn.query(userSQL.queryByName, account_id, (e, r) => {
      // if(e) throw e
      if(e) {
        res.json(new Result({ code: -1, msg: '系统维护中,请稍后再试!', data: null }))
      }
      if(r[0].auth === 'super_admin' || r[0].auth === 'admin') {
        conn.query(userSQL.getDepartListByLabel, depart.label, (e, r) => {
          // if(e) throw e
          if(e) {
            res.json(new Result({ code: -1, msg: '系统维护中,请稍后再试!', data: null }))
          }
          if(!r[0]) {
            conn.query(userSQL.getDepartListByValue, depart.value, (e, r) => {
              // if(e) throw e
              if(e) {
                res.json(new Result({ code: -1, msg: '系统维护中,请稍后再试!', data: null }))
              }
              if(!r[0]) {
                conn.query(itemSQL.newDepart, depart, (e, r) => {
                  // if(e) throw e
                  if(e) {
                    res.json(new Result({ code: -1, msg: '系统维护中,请稍后再试!', data: null }))
                  }
                  if(r) {
                    res.json(new Result({ code: 200, msg: '新增成功!', data: null }))
                  } else {
                    res.json(new Result({ code: -1, msg: '新增失败!', data: null }))
                  }
                })
              } else {
                res.json(new Result({ code: -1, msg: '该院系值已存在!', data: null }))
              }
            })
          } else {
            res.json(new Result({ code: -1, msg: '该院系名已存在!', data: null }))
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