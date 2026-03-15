const modal = document.getElementById('confirmModal');
const openBtn = document.getElementById('openModal');
const cancelBtn = document.getElementById('cancelBtn');
const confirmBtn = document.getElementById('confirmBtn')

async function loadBorrow(){
        const response = await fetch("http://localhost:8000/borrow");
        const data = await response.json();

        const table = document.querySelector("#borrowTable tbody");

        data.forEach(asset => {

            const row = `
            <tr>
                <td>${asset.asset_id}</td>
                <td><span class="badge">${asset.asset_code}</span></td>
                <td>${asset.asset_name}</td>
                <td class="desc">${asset.description}</td>
                <td class="price">฿${asset.price}</td>
                <td><button class="btn-borrow" onclick="clicked(${asset.asset_id})">borrow</button></td>
            </tr>
            `;

            table.innerHTML += row;

        });

    }
    function clicked(id) {
        modal.showModal();
        confirmBtn.addEventListener('click', async () => {
            const user_id = localStorage.getItem("user_id");
            const response = await axios.put(`http://localhost:8000/assets/${id}`, { user_id });
            window.location.reload(); 
        });
        cancelBtn.addEventListener('click', () => {
        modal.close();
    });
    }
    
    loadBorrow();