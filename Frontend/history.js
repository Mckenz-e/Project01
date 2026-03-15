async function loadAssets(){
        const response = await fetch("http://localhost:8000/information");
        const data = await response.json();

        const table = document.querySelector("#informationTable tbody");

        data.forEach(asset => {

            const row = `
            <tr>
                <td>${asset.asset_id}</td>
                <td><span class="badge">${asset.asset_code}</span></td>
                <td>${asset.asset_name}</td>
                <td>${asset.user}</td>
                <td class="desc">${asset.description}</td>
                <td class="status">${asset.status}</td>
            </tr>
            `;

            table.innerHTML += row;

        });

    }
loadAssets();

function exportPDF(){

    const element = document.getElementById("report");

    const options = {
        margin: 10,
        filename: "assets-report.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
    };

    html2pdf().set(options).from(element).save();

}