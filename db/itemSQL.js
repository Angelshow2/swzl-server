const itemSql = {
  getItemList: 'SELECT * FROM swzl_itemclass',
  publishLost: 'INSERT INTO swzl_lost SET ?',
  publishPick: 'INSERT INTO swzl_pick SET ?',
  userPublishLost: 'SELECT * FROM swzl_lost WHERE account_id=?',
  userPublishPick: 'SELECT * FROM swzl_pick WHERE account_id=?',
  returnItem: 'UPDATE swzl_lost SET ? WHERE id=?'
}

module.exports = itemSql