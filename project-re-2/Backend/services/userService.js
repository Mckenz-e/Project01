const { initMySQL } = require('../config/database');
const QUERIES = require('../database/queries');

const createUser = async (userData) => {
  const db = await initMySQL();
  const [result] = await db.query(QUERIES.CREATE_USER, userData);
  return result;
};

module.exports = { createUser };
