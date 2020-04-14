const { pool, Result, router } = require('../connect')
const itemSQL = require('../db/itemSQL')
const userSQL = require('../db/userSQL')

router.post('/item/newmajor', (req, res) => {
  let account_id = req.body.account_id
  let major = {
    label: req.body.label,
    value: req.body.value,
    parent_depart: req.body.depart
  }

  if(!account_id) {
    res.json(new Result({ code: -1, msg: '账号不能为空!', data: null }))
  }
  if(!major.label) {
    res.json(new Result({ code: -1, msg: '专业名不能为空!', data: null }))
  }
  if(!major.value) {
    res.json(new Result({ code: -1, msg: '值不能为空!', data: null }))
  }
  if(!major.parent_depart) {
    res.json(new Result({ code: -1, msg: '所属院系不能为空!', data: null }))
  }

  pool.getConnection((err, conn) => {
    conn.query(userSQL.queryByName, account_id, (e, r) => {
      if(e) throw e
      if(r[0].auth === 'super_admin' || r[0].auth === 'admin') {
        conn.query(userSQL.getMajorListByLabel, major.label, (e, r) => {
          if(e) throw e
          if(!r[0]) {
            conn.query(userSQL.getMajorListByValue, major.value, (e, r) => {
              if(e) throw e
              if(!r[0]) {
                conn.query(itemSQL.newMajor, major, (e, r) => {
                  if(e) throw e
                  if(r) {
                    res.json(new Result({ code: 200, msg: '新增成功!', data: null }))
                  } else {
                    res.json(new Result({ code: -1, msg: '新增失败!', data: null }))
                  }
                })
              } else {
                res.json(new Result({ code: -1, msg: '该专业值已存在!', data: null }))
              }
            })
          } else {
            res.json(new Result({ code: -1, msg: '该专业名已存在!', data: null }))
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