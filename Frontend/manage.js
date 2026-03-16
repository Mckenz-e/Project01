const modal = document.getElementById('confirmModal');
const openBtn = document.getElementById('openModal');
const cancelBtn = document.getElementById('cancelBtn');
const deleteBtn = document.getElementById('deleteBtn');
const editBtn = document.getElementById('editBtn');

async function loadBorrow(){
        const response = await fetch("http://localhost:8000/main");
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
                <td><button class="btn-edit" onclick="clicked(${asset.asset_id})">edit</button></td>
            </tr>
            `;

            table.innerHTML += row;
        });

    }
    function clicked(id) {
        modal.showModal();
        deleteBtn.addEventListener('click', async () => {
            const user_id = localStorage.getItem("user_id");
            const response = await axios.delete(`http://localhost:8000/assets/${id}`, { user_id });
            window.location.reload(); 
        });
        editBtn.addEventListener('click', () => {
            window.location.href = `edit.html?id=${id}`;
        })
        cancelBtn.addEventListener('click', () => {
        modal.close();
    });
    }
    
    loadBorrow();