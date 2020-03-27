const { pool, Result, router } = require('../connect')
const itemSQL = require('../db/itemSQL')

router.post('/item/updateuserlost', (req, res) => {
  let item = {
    title: req.body.title,
    desc: req.body.desc,
    itemclass: req.body.itemclass,
    img_url: req.body.img_url,
    occur_time: req.body.occur_time,
    site: req.body.site,
    contcat: req.body.contcat
  }
  let account_id = req.body.account_id
  let id = req.body.id

  if(!item.title) {
    res.json(new Result({ code: -1, msg: '标题不能为空！', data: null }))
    return 
  }
  if(!item.desc) {
    res.json(new Result({ code: -1, msg: '描述不能为空！', data: null }))
    return 
  }
  if(!item.itemclass) {
    res.json(new Result({ code: -1, msg: '物品分类不能为空！', data: null }))
    return 
  }
  if(!item.img_url) {
    res.json(new Result({ code: -1, msg: '请上传物品图片！', data: null }))
    return 
  }
  if(!item.occur_time) {
    res.json(new Result({ code: -1, msg: '丢失时间不能为空！', data: null }))
    return 
  }
  if(!item.site) {
    res.json(new Result({ code: -1, msg: '丢失地点不能为空！', data: null }))
    return 
  }
  if(!item.contcat) {
    res.json(new Result({ code: -1, msg: '联系方式不能为空！', data: null }))
    return 
  }
  if(!account_id) {
    return res.json(new Result({ code: -1, msg: '账号不能为空!' }))
  }

  if(!id) {
    return res.json(new Result({ code: -1, msg: '物品id不能为空!' }))
  }

  pool.getConnection((err, conn) => {
    conn.query(itemSQL.updateUserLost, [item, id, account_id], (e, r) => {
      if(e) throw e
      if(r) {
        res.json(new Result({ code: 200, msg: '修改成功!', data: null }))
      } else {
        res.json(new Result({ code: -1, msg: '修改失败!', data: null }))
      }
    })
    pool.releaseConnection(conn)
  })
})

module.exports = router