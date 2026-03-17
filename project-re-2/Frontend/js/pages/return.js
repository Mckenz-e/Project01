import { fetchBorrowedAssets, returnAsset } from '../services/apiService.js';

const modal = document.getElementById('confirmModal');
const cancelBtn = document.getElementById('cancelBtn');
const confirmBtn = document.getElementById('confirmBtn');

let pendingAssetId = null;

const loadReturn = async () => {
  const user_id = localStorage.getItem('user_id');
  const data = await fetchBorrowedAssets(user_id);
  const tbody = document.querySelector('#borrowTable tbody');

  tbody.innerHTML = data
    .map(
      (asset) => `
      <tr>
        <td>${asset.asset_id}</td>
        <td><span class="badge">${asset.asset_code}</span></td>
        <td>${asset.asset_name}</td>
        <td class="desc">${asset.description}</td>
        <td class="price">฿${asset.price}</td>
        <td><button class="btn-return" onclick="openReturnModal(${asset.asset_id})">Return</button></td>
      </tr>`
    )
    .join('');
};

const openReturnModal = (id) => {
  pendingAssetId = id;
  modal.showModal();
};

confirmBtn.addEventListener('click', async () => {
  if (!pendingAssetId) return;
  await returnAsset(pendingAssetId);
  modal.close();
  window.location.reload();
});

cancelBtn.addEventListener('click', () => {
  modal.close();
});

window.openReturnModal = openReturnModal;
loadReturn();
