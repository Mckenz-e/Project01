import { fetchAvailableAssets, borrowAsset } from '../services/apiService.js';

const modal = document.getElementById('confirmModal');
const cancelBtn = document.getElementById('cancelBtn');
const confirmBtn = document.getElementById('confirmBtn');

let pendingAssetId = null;

const loadBorrow = async () => {
  const data = await fetchAvailableAssets();
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
        <td><button class="btn-borrow" onclick="openBorrowModal(${asset.asset_id})">borrow</button></td>
      </tr>`
    )
    .join('');
};

const openBorrowModal = (id) => {
  pendingAssetId = id;
  modal.showModal();
};

confirmBtn.addEventListener('click', async () => {
  if (!pendingAssetId) return;
  const user_id = localStorage.getItem('user_id');
  await borrowAsset(pendingAssetId, user_id);
  modal.close();
  window.location.reload();
});

cancelBtn.addEventListener('click', () => {
  modal.close();
});

window.openBorrowModal = openBorrowModal;
loadBorrow();
