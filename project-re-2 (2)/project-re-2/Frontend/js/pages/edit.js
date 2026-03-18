import { fetchAssetById, updateAsset } from '../services/apiService.js';
import { validateAssetForm } from '../utils/validators.js';
import { showMessage, getById, setById } from '../utils/dom.js';

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const messageDOM = document.getElementById('message');

const loadAsset = async () => {
  const data = await fetchAssetById(id);
  setById('asset_code', data.asset_code);
  setById('asset_name', data.asset_name);
  setById('price', data.price);
  setById('category_id', data.category_id);
  setById('description', data.description);
};

const updateAssetHandler = async () => {
  const asset = {
    asset_code: getById('asset_code'),
    asset_name: getById('asset_name'),
    price: getById('price'),
    category_id: getById('category_id'),
    description: getById('description'),
  };

  const errors = validateAssetForm(asset);
  if (errors.length > 0) {
    showMessage(messageDOM, 'กรุณากรอกให้ครบ', 'danger', errors);
    return;
  }

  try {
    const response = await updateAsset(id, asset);
    showMessage(messageDOM, response.data.message || 'บันทึกข้อมูลสำเร็จ', 'success');
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'เกิดข้อผิดพลาด';
    const errors = error.response?.data?.errors || [];
    showMessage(messageDOM, message, 'danger', errors);
  }
};

window.updateAsset = updateAssetHandler;
loadAsset();
