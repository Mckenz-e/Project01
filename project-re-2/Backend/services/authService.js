const { initMySQL } = require('../config/database');
const QUERIES = require('../database/queries');

const login = async (user, password) => {
  const db = await initMySQL();
  const [rows] = await db.query(QUERIES.LOGIN, [user, password]);

  if (rows.length === 0) {
    return { status: 'error', message: 'user or password incorrect' };
  }

  const userRow = rows[0];
  return {
    status: 'ok',
    isAdmin: userRow.role === 1,
    user_id: userRow.user_id,
  };
};

module.exports = { login };
