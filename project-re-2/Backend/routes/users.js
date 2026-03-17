const express = require('express');
const router = express.Router();
const assetService = require('../services/assetService');
const { validateAssetMiddleware } = require('../middleware/validators');

// GET /main — assets with category (main page)
router.get('/main', async (req, res, next) => {
  try {
    const rows = await assetService.getAssetsWithCategory();
    res.json(rows);
  } catch (err) { next(err); }
});

// GET /borrow — available assets
router.get('/borrow', async (req, res, next) => {
  try {
    const rows = await assetService.getAvailableAssets();
    res.json(rows);
  } catch (err) { next(err); }
});

// GET /return — assets borrowed by user
router.get('/return', async (req, res, next) => {
  try {
    const { user_id } = req.query;
    const rows = await assetService.getBorrowedAssetsByUser(user_id);
    res.json(rows);
  } catch (err) { next(err); }
});

// PUT /return/:id — return an asset
router.put('/return/:id', async (req, res, next) => {
  try {
    await assetService.returnAsset(req.params.id);
    res.json({ message: 'Updated successfully' });
  } catch (err) { next(err); }
});

// PUT /edit/:id — edit asset (original route kept for frontend compatibility)
router.put('/edit/:id', validateAssetMiddleware, async (req, res, next) => {
  try {
    const result = await assetService.updateAsset(req.params.id, req.body);
    res.json({ message: 'Asset updated successfully', data: result });
  } catch (err) { next(err); }
});

// GET /information — admin history view
router.get('/information', async (req, res, next) => {
  try {
    const rows = await assetService.getInformation();
    res.json(rows);
  } catch (err) { next(err); }
});

module.exports = router;
