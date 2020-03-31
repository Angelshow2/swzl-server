const { pool, router, Result } = require('../connect')
const multer = require('multer')

// 对上传的文件进行配置
const storage = multer.diskStorage({
  // 指定文件上传到服务器的路径
  destination: (req, file, cb) => {
    cb(null, 'public/item_img/pick')
  },
  // 指定上传到服务器文件的名称
  filename: (res, file, cb) => {
    let suffix = file.mimetype.substr(6)
    cb(null, file.fieldname + '-' + Date.now() + '.' + suffix)
  }

})

const upload = multer({ storage: storage })

// 在使用路由的时候调用upload方法  设置key值
const cpUpload = upload.single('llj-swzl')
// const cpUpload = upload.array('key值', maxCount)   传递一组文件时，maxcout是最多能传递多少个文件
// const cpUpload = upload.fields([{ name: 'key值', maxCount: num }, { name: 'key值', maxCount: num }])：当传递多个文件域的时候,对文件的解析

router.post('/user/pickitemimg', cpUpload, (req, res) => {
  // console.log(req.file.path)
  let url = '/' +  req.file.path
  res.json(new Result({ code: 200, msg: '上传成功！', data: url }))
})

module.exports = router