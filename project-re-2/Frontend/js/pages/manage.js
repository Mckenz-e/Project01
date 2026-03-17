import { fetchMainAssets, deleteAsset } from '../services/apiService.js';

const modal = document.getElementById('confirmModal');
const cancelBtn = document.getElementById('cancelBtn');
const deleteBtn = document.getElementById('deleteBtn');
const editBtn = document.getElementById('editBtn');

let pendingAssetId = null;

const loadAssets = async () => {
  const data = await fetchMainAssets();
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
        <td><button class="btn-edit" onclick="openManageModal(${asset.asset_id})">edit</button></td>
      </tr>`
    )
    .join('');
};

const openManageModal = (id) => {
  pendingAssetId = id;
  modal.showModal();
};

deleteBtn.addEventListener('click', async () => {
  if (!pendingAssetId) return;
  await deleteAsset(pendingAssetId);
  modal.close();
  window.location.reload();
});

editBtn.addEventListener('click', () => {
  if (!pendingAssetId) return;
  window.location.href = `edit.html?id=${pendingAssetId}`;
});

cancelBtn.addEventListener('click', () => {
  modal.close();
});

window.openManageModal = openManageModal;
loadAssets();
