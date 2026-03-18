import { createAsset } from '../services/apiService.js';
import { validateAssetForm } from '../utils/validators.js';
import { showMessage, getInputValue } from '../utils/dom.js';

const submitData = async () => {
  const messageDOM = document.getElementById('message');

  const assetData = {
    asset_code: getInputValue('asset_code'),
    asset_name: getInputValue('asset_name'),
    category_id: getInputValue('category_id'),
    price: getInputValue('price'),
    description: getInputValue('description'),
  };

  const errors = validateAssetForm(assetData);
  if (errors.length > 0) {
    showMessage(messageDOM, 'กรุณากรอกให้ครบ', 'danger', errors);
    return;
  }

  try {
    const response = await createAsset(assetData);
    showMessage(messageDOM, response.data.message || 'บันทึกข้อมูลสำเร็จ', 'success');
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'เกิดข้อผิดพลาด';
    const errors = error.response?.data?.errors || [];
    showMessage(messageDOM, message, 'danger', errors);
  }
};

window.submitData = submitData;
