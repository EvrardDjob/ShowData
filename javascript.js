const URL = "https://jsonplaceholder.typicode.com/users"

document.querySelector('.bouton').addEventListener('click' ,()=>{
    getData(URL);

    // const tableElement = document.querySelector('.contain_table table');
    // loader.style.display = 'block';
    // tableElement.style.display = 'none';
})


const tableBody = document.getElementById('userTableBody');

async function getData(url){
    try{
        const response = await fetch(url);
        if(!response.ok){
            throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
        }
        const data = await response.json();

        console.log("Données récupérées avec succès :");
        console.log(data)

        data.forEach(user => {
            const row = document.createElement('tr'); 

            const cells = [
                user.id,
                user.name,
                user.username,
                user.phone,
                user.website,
                user.email
            ];
            cells.forEach(cellData => {
                const td = document.createElement('td'); 
                td.textContent = cellData; 
                row.appendChild(td); 
            });

            tableBody.appendChild(row); 
        });


    }catch(error){
        console.error("Une erreur est survenue lors de la récupération des données :", error);
    }
    
}

