import { fetchMainAssets } from '../services/apiService.js';

const loadAssets = async () => {
  const data = await fetchMainAssets();
  const tbody = document.querySelector('#assetTable tbody');

  tbody.innerHTML = data
    .map(
      (asset) => `
      <tr>
        <td>${asset.asset_id}</td>
        <td><span class="badge">${asset.asset_code}</span></td>
        <td>${asset.asset_name}</td>
        <td class="desc">${asset.description}</td>
        <td>${asset.category_name}</td>
        <td class="price">฿${asset.price}</td>
      </tr>`
    )
    .join('');
};

loadAssets();
