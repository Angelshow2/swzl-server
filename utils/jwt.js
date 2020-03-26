const jwt = require('jsonwebtoken')

class tokenObj {
  createToken(cont, time) {
    let payload = { msg: cont } // token 数据
    let secret = 'llj-jwt'   // 加密的 key
    let token = jwt.sign(payload, secret, {
      expiresIn: time  // 24小时过期，以秒为单位
    })
    return token;
  }

  checkToken(token, fn) {
    let secret = 'llj-jwt'
    jwt.verify(token, secret, (err, decode) => {
      if(err) {  // 当token过期，或这是一个伪造的token，会触发
        fn(false);
      } else {
        // console.log(decode)
        fn(true);
      }
    })
  }
}

module.exports = tokenObj