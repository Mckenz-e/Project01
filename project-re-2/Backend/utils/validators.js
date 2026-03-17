const validateUser = (data) => {
  const errors = [];
  if (!data.user) errors.push('User is required');
  if (!data.password) errors.push('Password is required');
  return errors;
};

const validateAsset = (data) => {
  const errors = [];
  if (!data.asset_code) errors.push('asset_code is required');
  if (!data.asset_name) errors.push('asset_name is required');
  if (!data.category_id) errors.push('category_id is required');
  if (!data.price) errors.push('price is required');
  if (!data.description) errors.push('description is required');
  return errors;
};

module.exports = { validateUser, validateAsset };
