const { pool, router, Result } = require('../connect')
const userSQL = require('../db/userSQL')
 
router.post('/user/register', (req, res) => {
  let user = {
    account_id: req.body.account_id,
    password: req.body.password,
    user_depart: req.body.user_depart,
    user_major: req.body.user_major,
    user_class: req.body.user_class,
    user_name: req.body.user_name,
    user_id: req.body.user_id,
    auth_name: '普通用户',
    auth: 'consumer',
    status: 1
  }

  user.register_time = new Date()

  let pattern = /^[a-zA-Z0-9]{6,18}$/;

  if(!pattern.test(user.account_id)) {
    res.json(new Result({ code: -1, msg: '账号格式不正确!', data: null }))
    return 
  }

  if(!pattern.test(user.password)) {
    res.json(new Result({ code: -1, msg: '密码格式不正确!', data: null }))
    return 
  }

  if(!user.account_id) {
    res.json(new Result({ code: -1, msg: '账号不能为空！', data: null }))
    return 
  }
  if(!user.password) {
    res.json(new Result({ code: -1, msg: '密码不能为空！', data: null }))
    return 
  }
  if(!user.user_depart) {
    res.json(new Result({ code: -1, msg: '院系不能为空！', data: null }))
    return 
  }
  if(!user.user_major) {
    res.json(new Result({ code: -1, msg: '专业不能为空！', data: null }))
    return 
  }
  if(!user.user_class) {
    res.json(new Result({ code: -1, msg: '班级不能为空！', data: null }))
    return 
  }
  if(!user.user_name) {
    res.json(new Result({ code: -1, msg: '姓名不能为空！', data: null }))
    return 
  }
  if(!user.user_id) {
    res.json(new Result({ code: -1, msg: '学号不能为空！', data: null }))
    return 
  }

  pool.getConnection((err, conn) => {
    conn.query(userSQL.queryByName, user.account_id, (e, r) => {
      // if(e) throw e
      if(e) {
        res.json(new Result({ code: -1, msg: '系统维护中,请稍后再试!', data: null }))
      }
      if(r) {
        if(r.length) {
          // 若不为空，则该用户已存在
          res.json(new Result({ code: -1, msg: '该用户名已存在！', data: null }))
        } else {
          conn.query(userSQL.getDepartName, user.user_depart, (e, r) => {
            // if(e) throw e
            if(e) {
              res.json(new Result({ code: -1, msg: '系统维护中,请稍后再试!', data: null }))
            }
            if(r.length) {
              user.user_departname = r[0].label
              conn.query(userSQL.getMajorName, user.user_major, (e, r) => {
                // if(e) throw e
                if(e) {
                  res.json(new Result({ code: -1, msg: '系统维护中,请稍后再试!', data: null }))
                }
                if(r.length) {
                  user.user_majorname = r[0].label
                  // 新建用户
                  conn.query(userSQL.insert, user, (e, r) => {
                    // if(e) throw e
                    if(e) {
                      res.json(new Result({ code: -1, msg: '系统维护中,请稍后再试!', data: null }))
                    }
                    if(r) {
                      res.json(new Result({ code: 200, msg: '注册成功！', data: null }))
                    } else {
                      res.json(new Result({ code: -1, msg: '注册失败！', data: null }))
                    }
                  })
                  
                } else {
                  res.json(new Result({ code: -1, msg: '注册失败！', data: null }))
                }
              })
            } else {
              res.json(new Result({ code: -1, msg: '注册失败！', data: null }))
            }
          })
          
        }
      }
    })
    pool.releaseConnection(conn) // 释放连接池，等待别的连接使用
  })
})

module.exports = router