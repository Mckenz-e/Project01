const modal = document.getElementById('confirmModal');
const openBtn = document.getElementById('openModal');
const cancelBtn = document.getElementById('cancelBtn');
const confirmBtn = document.getElementById('confirmBtn');
async function loadBorrow(){
        const user_id = localStorage.getItem("user_id");
        const response = await fetch(`http://localhost:8000/return?user_id=${user_id}`);
        const data = await response.json();

        const table = document.querySelector("#borrowTable tbody");

        data.forEach(asset => {

            const row = `
            <tr>
                <td>${asset.asset_id}</td>
                <td>${asset.asset_code}</td>
                <td>${asset.asset_name}</td>
                <td>${asset.description}</td>
                <td>${asset.price}</td>
                <td><button onclick="clicked(${asset.asset_id})">Return</button></td>

            </tr>
            `;

            table.innerHTML += row;

        });

    }

    function clicked(id) {
        modal.showModal();
        confirmBtn.addEventListener('click', async () => {
            const response = await axios.put(`http://localhost:8000/return/${id}`);
            window.location.reload(); 
        });
        cancelBtn.addEventListener('click', () => {
        modal.close();
    });
    }
    
    loadBorrow();