async function loadAssets(){
        const response = await fetch("http://localhost:8000/main");
        const data = await response.json();

        const table = document.querySelector("#assetTable tbody");

        data.forEach(asset => {

            const row = `
            <tr>
                <td>${asset.asset_id}</td>
                <td><span class="badge">${asset.asset_code}</span></td>
                <td>${asset.asset_name}</td>
                <td class="desc">${asset.description}</td>
                <td>${asset.category_name}</td>
                <td class="price">฿${asset.price}</td>
            </tr>
            `;

            table.innerHTML += row;

        });
    }
loadAssets();