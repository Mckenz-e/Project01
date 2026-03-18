export const validateLoginForm = (user, password) => {
  const errors = [];
  if (!user) errors.push('Username is required');
  if (!password) errors.push('Password is required');
  return errors;
};

export const validateAssetForm = (data) => {
  const errors = [];
  if (!data.asset_code) errors.push('asset_code is required');
  if (!data.asset_name) errors.push('asset_name is required');
  if (!data.category_id) errors.push('category_id is required');
  if (!data.price) errors.push('price is required');
  if (!data.description) errors.push('description is required');
  return errors;
};
