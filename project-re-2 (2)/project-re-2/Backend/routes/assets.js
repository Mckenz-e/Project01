const express = require('express');
const router = express.Router();
const assetService = require('../services/assetService');
const { validateAssetMiddleware } = require('../middleware/validators');

router.get('/', async (req, res, next) => {
  try {
    const rows = await assetService.getAllAssets();
    res.json(rows);
  } catch (err) { next(err); }
});

router.get('/:id', async (req, res, next) => {
  try {
    const asset = await assetService.getAssetById(req.params.id);
    res.json(asset);
  } catch (err) { next(err); }
});

router.post('/', validateAssetMiddleware, async (req, res, next) => {
  try {
    const result = await assetService.createAsset(req.body);
    res.json({ message: 'บันทึกข้อมูลสำเร็จ', data: result });
  } catch (err) { next(err); }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { user_id } = req.body;
    await assetService.borrowAsset(req.params.id, user_id);
    res.json({ message: 'Updated successfully' });
  } catch (err) { next(err); }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await assetService.deleteAsset(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) { next(err); }
});

module.exports = router;
