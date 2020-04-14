const {pool, router, Result} = require ('../connect');
const itemSQL = require ('../db/itemSQL');

router.post ('/item/alllostlist', (req, res) => {
  let pageNum = req.body.pageNum;
  let pageSize = req.body.pageSize || 10;
  let searchText = req.body.searchText || '';
  let itemClass = req.body.itemClass || 0;

  if (!pageNum) {
    return res.json (new Result ({code: -1, msg: '页码不能为空!', data: null}));
  }

  let start = (pageNum - 1) * pageSize;
  let totalNum;
  let totalPage;

  pool.getConnection ((err, conn) => {
    if (!itemClass) {
      conn.query (
        itemSQL.allLostListT,
        [`%${searchText}%`, 0, 10000],
        (e, r) => {
          if (e) throw e;
          if (r) {
            totalNum = r.length;
            totalPage = Math.ceil (totalNum / pageSize);
            pool.getConnection ((err, conn) => {
              conn.query (
                itemSQL.allLostListT,
                [`%${searchText}%`, start, pageSize],
                (e, r) => {
                  if (e) throw e;
                  if (r) {
                    res.json (
                      new Result ({
                        code: 200,
                        msg: '获取成功！',
                        data: {
                          totalPage: totalPage,
                          totalNum: totalNum,
                          list: r,
                        },
                      })
                    );
                  } else {
                    res.json (
                      new Result ({code: -1, msg: '获取失败！', data: null})
                    );
                  }
                }
              );
              
            });
          } else {
            res.json (new Result ({code: -1, msg: '获取失败！', data: null}));
          }
        }
      );
    } else {
      conn.query (
        itemSQL.allLostList,
        [itemClass, `%${searchText}%`, 0, 10000],
        (e, r) => {
          if (e) throw e;
          if (r) {
            totalNum = r.length;
            totalPage = Math.ceil (totalNum / pageSize);
            pool.getConnection ((err, conn) => {
              conn.query (
                itemSQL.allLostList,
                [itemClass, `%${searchText}%`, start, pageSize],
                (e, r) => {
                  if (e) throw e;
                  if (r) {
                    res.json (
                      new Result ({
                        code: 200,
                        msg: '获取成功！',
                        data: {
                          totalPage: totalPage,
                          totalNum: totalNum,
                          list: r,
                        },
                      })
                    );
                  } else {
                    res.json (
                      new Result ({code: -1, msg: '获取失败！', data: null})
                    );
                  }
                }
              );
            });
          } else {
            res.json (new Result ({code: -1, msg: '获取失败！', data: null}));
          }
        }
      );
    }
    pool.releaseConnection (conn);
  });
});

module.exports = router;
