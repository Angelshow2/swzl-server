const itemSql = {
  getItemList: 'SELECT * FROM swzl_itemclass',
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
  cancelReturn: 'UPDATE swzl_lost SET ? WHERE account_id=? AND id=?',
  cancelClaim: 'UPDATE swzl_pick SET ? WHERE account_id=? AND id=?',
}

module.exports = itemSql