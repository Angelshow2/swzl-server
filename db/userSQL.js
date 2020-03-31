const userSql = {
  queryByName: 'SELECT * FROM swzl_user WHERE account_id=?',
  queryByNamePassword: 'SELECT * FROM swzl_user WHERE account_id=? AND password=?',
  insert: 'INSERT INTO swzl_user SET ?',
  updateUser: 'UPDATE swzl_user SET ? WHERE account_id=?',
  getDepartList: 'SELECT * FROM swzl_depart',  // 获取学院列表
  getMajorList: 'SELECT * FROM swzl_major WHERE parent_depart=?',
  getDepartName: 'SELECT * FROM swzl_depart WHERE value=?',
  getMajorName: 'SELECT * FROM swzl_major WHERE value=?',
}

module.exports = userSql