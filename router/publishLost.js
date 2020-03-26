const { pool, router, Result } = require('../connect')
const itemSQL = require('../db/itemSQL')

router.post('/item/publishlost', (req, res) => {
  let item = {
    title: req.body.title,
    desc: req.body.desc,
    itemclass: req.body.itemclass,
    img_url: req.body.img_url,
    lost_time: req.body.lost_time,
    site: req.body.site,
    contcat: req.body.contcat,
    account_id: req.body.account_id,
  }
  item.publish_time = new Date()

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
  if(!item.lost_time) {
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
  if(!item.account_id) {
    res.json(new Result({ code: -1, msg: '用户账号不能为空！', data: null }))
    return 
  }

  pool.getConnection((err, conn) => {
    conn.query(itemSQL.publishLost, item, (e, r) => {
      if(e) throw e
      if(r) {
        res.json(new Result({ code: 200, msg: '发布成功！', data: null }))
      } else {
        res.json(new Result({ code: -1, msg: '发布失败！', data: null })) 
      }
    })
    pool.releaseConnection(conn)
  })
})

module.exports = router