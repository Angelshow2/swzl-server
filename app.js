const { app, pool, Result } = require('./connect')

const login = require('./router/login')
const register = require('./router/register')
const resetPwd = require('./router/resetpwd')
const departList = require('./router/departList')
const majorList = require('./router/majorList')
const itemClass = require('./router/itemClass')
const uploadLostImg = require('./router/uploadLostImg')
const uploadPickImg = require('./router/uploadPickImg')
const publishLost = require('./router/publishLost')
const publishPick = require('./router/publishPick')
const lostList = require('./router/lostList')
const pickList = require('./router/pickList')
const userPublishLost = require('./router/userPublishLost')
const userPublishPick = require('./router/userPublishPick')
const returnItem = require('./router/returnItem')
const claimItem = require('./router/claimItem')
const returnList = require('./router/returnList')
const claimList = require('./router/claimList')
const updateUserLost = require('./router/updateUserLost')
const updateUserPick = require('./router/updateUserPick')
const deleteUserLost = require('./router/deleteUserLost')
const deleteUserPick = require('./router/deleteUserPick')
const userReturn = require('./router/userReturn')
const userClaim = require('./router/userClaim')
const cancelReturn = require('./router/cancelReturn')
const cancelClaim = require('./router/cancelClaim')
const returnSucceed = require('./router/returnSucceed')
const claimSucceed = require('./router/claimSucceed')
const getUserInfo = require('./router/getUserInfo')

const tokenObj = require('./utils/jwt')
app.all('*', (req, res, next) => {
  // 域名
  console.log(req.headers.origin)
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin","*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers","content-type");
  //跨域允许的请求方式 
  res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");

  // 这里处理全局拦截，一定要写在最上面
  if(req.url.indexOf('/user/') == -1) {
    let myToken = new tokenObj()
    myToken.checkToken(req.headers['llj-jwt'], flag => {
      if(flag) {
        next()
      } else {
        res.json(new Result({ code: -2, msg: 'token验证失败！',data: null }))
      }
    })
  } else {
    next()
  }
})

app.all('/user/login', login)
app.all('/user/register', register)
app.all('/user/resetpwd', resetPwd)
app.all('/user/departlist', departList)
app.all('/user/majorlist', majorList)
app.all('/item/itemclass', itemClass)
app.all('/user/lostitemimg', uploadLostImg)
app.all('/user/pickitemimg', uploadPickImg)
app.all('/item/publishlost', publishLost)
app.all('/item/publishpick', publishPick)
app.all('/item/lostlist', lostList)
app.all('/item/picklist', pickList)
app.all('/item/userlost', userPublishLost)
app.all('/item/userpick', userPublishPick)
app.all('/item/returnitem', returnItem)
app.all('/item/claimitem', claimItem)
app.all('/item/returnlist', returnList)
app.all('/item/claimlist', claimList)
app.all('/item/updateuserlost', updateUserLost)
app.all('/item/updateuserpick', updateUserPick)
app.all('/item/deleteuserlost', deleteUserLost)
app.all('/item/deleteuserpick', deleteUserPick)
app.all('/item/userreturn', userReturn)
app.all('/item/userclaim', userClaim)
app.all('/item/cancelreturn', cancelReturn)
app.all('/item/cancelclaim', cancelClaim)
app.all('/item/returnsucceed', returnSucceed)
app.all('/item/claimsucceed', claimSucceed)
app.all('/item/userinfo', getUserInfo)


app.listen(8080, () => {
  console.log('服务启动！')
})