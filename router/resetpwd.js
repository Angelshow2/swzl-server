const { pool, router, Result } = require('../connect')
const userSQL = require('../db/userSQL')

router.post('/item/resetpwd', (req, res) => {
  let user = {
    account_id: req.body.account_id,
    oldPassword: req.body.oldPassword,
    newPassword: req.body.newPassword,
    againPassword: req.body.againPassword
  }

  if(!user.account_id) {
    return res.json(new Result({ code: -1, msg: '用户名不能为空！', data: null }))
  }
  if(!user.oldPassword) {
    return res.json(new Result({ code: -1, msg: '旧密码不能为空！', data: null }))
  }
  if(!user.newPassword) {
    return res.json(new Result({ code: -1, msg: '新密码不能为空！', data: null }))
  }
  if(!user.againPassword || user.newPassword !== user.againPassword) {
    return res.json(new Result({ code: -1, msg: '两次密码输入不一致！', data: null }))
  }

  pool.getConnection((err, conn) => {
    conn.query(userSQL.queryByNamePassword, [user.account_id, user.oldPassword], (e, r) => {
      // if(e) throw e
      if(e) {
        res.json(new Result({ code: -1, msg: '系统维护中,请稍后再试!', data: null }))
      }
      if(r) {
        // 若不为空，则说明用户名密码正确
        if(r.length) {
          conn.query(userSQL.updateUser, [{ password: user.newPassword }, user.account_id], (e, r) => {
            if(r) {
              res.json(new Result({ code: 200, msg: '修改成功！', data: null }))
            } else {
              res.json(new Result({ code: -1, msg: '修改失败！', data: null }))
            }
          })
        } else {
          res.json(new Result({ code: -1, msg: '该用户不存在或旧密码输入错误！', data: null }))
        }
      }
    })
    pool.releaseConnection(conn)
  })

})

module.exports = router