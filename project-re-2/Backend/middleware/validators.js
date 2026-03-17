const { validateUser, validateAsset } = require('../utils/validators');

const validateUserMiddleware = (req, res, next) => {
  const errors = validateUser(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ message: 'กรุณากรอกให้ครบ', errors });
  }
  next();
};

const validateAssetMiddleware = (req, res, next) => {
  const errors = validateAsset(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ message: 'กรุณากรอกให้ครบ', errors });
  }
  next();
};

module.exports = { validateUserMiddleware, validateAssetMiddleware };
