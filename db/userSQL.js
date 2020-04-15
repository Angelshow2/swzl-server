const userSql = {
  queryByName: 'SELECT * FROM swzl_user WHERE account_id=?',
  queryByNamePassword: 'SELECT * FROM swzl_user WHERE account_id=? AND password=?',
  insert: 'INSERT INTO swzl_user SET ?',
  updateUser: 'UPDATE swzl_user SET ? WHERE account_id=?',
  getDepartList: 'SELECT * FROM swzl_depart',  // 获取学院列表
  getDepartListByLabel: 'SELECT * FROM swzl_depart WHERE label=?',
  getDepartListByValue: 'SELECT * FROM swzl_depart WHERE value=?',
  getMajorList: 'SELECT * FROM swzl_major WHERE parent_depart=?',
  getAllMajor: 'SELECT * FROM swzl_major',
  getMajorListByLabel: 'SELECT * FROM swzl_major WHERE label=?',
  getMajorListByValue: 'SELECT * FROM swzl_major WHERE value=?',
  getDepartName: 'SELECT * FROM swzl_depart WHERE value=?',
  getMajorName: 'SELECT * FROM swzl_major WHERE value=?',
  getAllList: 'SELECT * FROM swzl_user',
  getUserList: 'SELECT * FROM swzl_user WHERE auth=? AND account_id LIKE ? LIMIT ?,?',
  getUserListT: 'SELECT * FROM swzl_user WHERE account_id LIKE ? LIMIT ?,?',
  getAuthList: 'SELECT * FROM swzl_auth',
  deleteUser: 'DELETE FROM swzl_user WHERE account_id=?'
}

module.exports = userSql