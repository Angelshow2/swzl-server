const itemSql = {
  getItemList: 'SELECT * FROM swzl_itemclass',
  getItemListByLabel: 'SELECT * FROM swzl_itemclass WHERE label=?',
  getItemListByValue: 'SELECT * FROM swzl_itemclass WHERE value=?',
  publishLost: 'INSERT INTO swzl_lost SET ?',
  publishPick: 'INSERT INTO swzl_pick SET ?',
  userPublishLost: 'SELECT * FROM swzl_lost WHERE account_id=? ORDER BY publish_time DESC LIMIT ?,?',
  userPublishPick: 'SELECT * FROM swzl_pick WHERE account_id=? ORDER BY publish_time DESC LIMIT ?,?',
  returnItem: 'UPDATE swzl_lost SET ? WHERE id=? AND account_id!= ?',
  searchLostItemById: 'SELECT * FROM swzl_lost WHERE id=?',
  claimItem: 'UPDATE swzl_pick SET ? WHERE id=? AND account_id!=?',
  searchPickItemById: 'SELECT * FROM swzl_pick WHERE id=?',
  searchClassLabelByValue: 'SELECT * FROM swzl_itemclass WHERE value=?',
  updateUserLost: 'UPDATE swzl_lost SET ? WHERE id=? AND account_id=?',
  updateUserPick: 'UPDATE swzl_pick SET ? WHERE id=? AND account_id=?',
  deleteUserLost: 'DELETE FROM swzl_lost WHERE id=? AND account_id=?',
  deleteUserPick: 'DELETE FROM swzl_pick WHERE id=? AND account_id=?',
  userReturn: 'SELECT * FROM swzl_lost WHERE return_id=? AND status!=0 ORDER BY publish_time DESC LIMIT ?,?',
  userClaim: 'SELECT * FROM swzl_pick WHERE claim_id=? AND status!=0 ORDER BY publish_time DESC LIMIT ?,?',
  cancelReturn: 'UPDATE swzl_lost SET ? WHERE return_id=? AND id=?',
  cancelClaim: 'UPDATE swzl_pick SET ? WHERE claim_id=? AND id=?',
  returnSucceed: 'UPDATE swzl_lost SET ? WHERE return_id=? AND id=?',
  claimSucceed: 'UPDATE swzl_pick SET ? WHERE claim_id=? AND id=?',
  allLostList: 'SELECT * FROM swzl_lost WHERE itemclass=? AND itemdesc LIKE ? ORDER BY publish_time DESC LIMIT ?,?',
  allLostListT: 'SELECT * FROM swzl_lost WHERE itemdesc LIKE ? ORDER BY publish_time DESC LIMIT ?,?',
  allPickList: 'SELECT * FROM swzl_pick WHERE itemclass=? AND itemdesc LIKE ? ORDER BY publish_time DESC LIMIT ?,?',
  allPickListT: 'SELECT * FROM swzl_pick WHERE itemdesc LIKE ? ORDER BY publish_time DESC LIMIT ?,?',
  adminDeleteLost: 'DELETE FROM swzl_lost WHERE id=?',
  adminDeletePick: 'DELETE FROM swzl_pick WHERE id=?',
  // 新增院系
  newDepart: 'INSERT INTO swzl_depart SET ?',
  // 新增专业
  newMajor: 'INSERT INTO swzl_major SET ?',
  // 编辑院系
  editDepart: 'UPDATE swzl_depart SET ? WHERE value=?',
  // 编辑专业
  editMajor: 'UPDATE swzl_major SET ? WHERE value=?',
  // 删除学院
  deleteDepart: 'DELETE FROM swzl_depart WHERE value=?',
  // 删除专业
  deleteMajor: 'DELETE FROM swzl_major WHERE value=?',
  // 新增分类
  addClass: 'INSERT INTO swzl_itemclass SET ?',
  // 编辑分类
  editClass: 'UPDATE swzl_itemclass SET ? WHERE value=?',
  // 删除分类
  deleteClass: 'DELETE FROM swzl_itemclass WHERE value=?',
}

module.exports = itemSql