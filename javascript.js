const URL = "https://jsonplaceholder.typicode.com/users"
const bouton = document.querySelector('.bouton');
const loadingMessage = document.querySelector('#loadingMessage');
const userTable = document.querySelector('.mytable');
const joy = "joy"
document.querySelector('.bouton').addEventListener('click' ,()=>{

    userTable.classList.add('hideTable');
    loadingMessage.classList.remove('hideLoader');
    loadingMessage.classList.add('showLoader');
    
    getData(URL);

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
        tableBody.innerHTML = "Erreur de chargement des données. Veuillez réessayer.";
        tableBody.style.color = "red";

    }finally{
        loadingMessage.classList.add('hideLoader');
        loadingMessage.classList.remove('showLoader'); 
        userTable.classList.remove('hideTable');
    }
    
}

