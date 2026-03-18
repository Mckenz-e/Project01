const QUERIES = {

  LOGIN: 'SELECT * FROM users WHERE user = ? AND password = ?',

  CREATE_USER: 'INSERT INTO users SET ?',

  GET_ALL_ASSETS: 'SELECT * FROM assets',
  GET_ASSET_BY_ID: 'SELECT * FROM assets WHERE asset_id = ?',
  GET_ASSETS_WITH_CATEGORY:
    'SELECT assets.*, categories.category_name FROM assets LEFT JOIN categories ON assets.category_id = categories.category_id',
  GET_AVAILABLE_ASSETS: 'SELECT * FROM assets WHERE status_id = 1',
  GET_BORROWED_ASSETS_BY_USER: 'SELECT * FROM assets WHERE status_id = 0 AND user_id = ?',
  CREATE_ASSET: 'INSERT INTO assets SET ?',
  UPDATE_ASSET: 'UPDATE assets SET ? WHERE asset_id = ?',
  DELETE_ASSET: 'DELETE FROM assets WHERE asset_id = ?',

  BORROW_ASSET: 'UPDATE assets SET status_id = 0, user_id = ? WHERE asset_id = ?',
  RETURN_ASSET: 'UPDATE assets SET status_id = 1, user_id = NULL WHERE asset_id = ?',

  GET_INFORMATION:
    'SELECT assets.*, IFNULL(users.user, "") AS user, IFNULL(status.status_name, "") AS status FROM assets LEFT JOIN users ON assets.user_id = users.user_id LEFT JOIN status ON assets.status_id = status.status_id',
};

module.exports = QUERIES;
