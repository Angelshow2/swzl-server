const userSql = {
  queryByName: 'SELECT * FROM swzl_user WHERE account_id=?',
  queryByNamePassword: 'SELECT * FROM swzl_user WHERE account_id=? AND password=?',
  insert: 'INSERT INTO swzl_user SET ?',
  updateUser: 'UPDATE swzl_user SET ? WHERE account_id=?',
  getDepartList: 'SELECT * FROM swzl_depart',  // 获取学院列表
  getMajorList: 'SELECT * FROM swzl_major WHERE parent_depart=?'
}

module.exports = userSql