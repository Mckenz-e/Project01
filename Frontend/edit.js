const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const messageDOM = document.getElementById('message');

async function loadAsset(){

    const response = await fetch(`http://localhost:8000/assets/${id}`);
    const data = await response.json();

    document.getElementById("asset_code").value = data.asset_code
    document.getElementById("asset_name").value = data.asset_name
    document.getElementById("price").value = data.price
    document.getElementById("category_id").value = data.category_id
    document.getElementById("description").value = data.description
}

async function updateAsset(){
    try {
    const asset = {
        asset_code: document.getElementById("asset_code").value,
        asset_name: document.getElementById("asset_name").value,
        price: document.getElementById("price").value,
        category_id: document.getElementById("category_id").value,
        description: document.getElementById("description").value
    }

    const response = await axios.put(`http://localhost:8000/edit/${id}`, asset);
    console.log(response);

    messageDOM.innerText = response.data.message || 'บันทึกข้อมูลสำเร็จ';
    messageDOM.className = 'message success';
    
    } catch (error) {
        const message = error.response?.data?.message || error.message || 'เกิดข้อผิดพลาด';
        const errors = error.response?.data?.errors || error.errors || [];

        let htmlData = `<div><div>${message}</div>`;
        if (errors.length) {
            htmlData += '<ul>';
            for (let i = 0; i < errors.length; i++) {
                htmlData += `<li>${errors[i]}</li>`;
            }
            htmlData += '</ul>';
        }
        htmlData += '</div>';

        messageDOM.innerHTML = htmlData;
        messageDOM.className = 'message danger' ;
    }
}


loadAsset();