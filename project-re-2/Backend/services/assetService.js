const { initMySQL } = require('../config/database');
const QUERIES = require('../database/queries');

const getAllAssets = async () => {
  const db = await initMySQL();
  const [rows] = await db.query(QUERIES.GET_ALL_ASSETS);
  return rows;
};

const getAssetById = async (id) => {
  const db = await initMySQL();
  const [rows] = await db.query(QUERIES.GET_ASSET_BY_ID, [id]);
  return rows[0];
};

const getAssetsWithCategory = async () => {
  const db = await initMySQL();
  const [rows] = await db.query(QUERIES.GET_ASSETS_WITH_CATEGORY);
  return rows;
};

const getAvailableAssets = async () => {
  const db = await initMySQL();
  const [rows] = await db.query(QUERIES.GET_AVAILABLE_ASSETS);
  return rows;
};

const getBorrowedAssetsByUser = async (user_id) => {
  const db = await initMySQL();
  const [rows] = await db.query(QUERIES.GET_BORROWED_ASSETS_BY_USER, [user_id]);
  return rows;
};

const createAsset = async (assetData) => {
  const db = await initMySQL();
  const [result] = await db.query(QUERIES.CREATE_ASSET, assetData);
  return result;
};

const updateAsset = async (id, assetData) => {
  const db = await initMySQL();
  const [result] = await db.query(QUERIES.UPDATE_ASSET, [assetData, id]);
  return result;
};

const deleteAsset = async (id) => {
  const db = await initMySQL();
  const [result] = await db.query(QUERIES.DELETE_ASSET, [id]);
  return result;
};

const borrowAsset = async (id, user_id) => {
  const db = await initMySQL();
  const [result] = await db.query(QUERIES.BORROW_ASSET, [user_id, id]);
  return result;
};

const returnAsset = async (id) => {
  const db = await initMySQL();
  const [result] = await db.query(QUERIES.RETURN_ASSET, [id]);
  return result;
};

const getInformation = async () => {
  const db = await initMySQL();
  const [rows] = await db.query(QUERIES.GET_INFORMATION);
  return rows;
};

module.exports = {
  getAllAssets,
  getAssetById,
  getAssetsWithCategory,
  getAvailableAssets,
  getBorrowedAssetsByUser,
  createAsset,
  updateAsset,
  deleteAsset,
  borrowAsset,
  returnAsset,
  getInformation,
};
