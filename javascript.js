const URL = "https://jsonplaceholder.typicode.com/users";
const bouton = document.querySelector(".bouton");
const loadingMessage = document.querySelector("#loadingMessage");
const userTable = document.querySelector(".mytable");
const tableBody = document.getElementById("userTableBody");
allUsers = [];
const searchBar = document.querySelector(".searchbar");
const containLop = document.querySelector(".contain-lopImage");

alert("cliquer ici pour me fermer!");
document.querySelector(".bouton").addEventListener("click", () => {
  userTable.classList.add("hideTable");
  loadingMessage.classList.remove("hideLoader");
  loadingMessage.classList.add("showLoader");

  getData(URL);
});

document.querySelector(".boutonCreate").addEventListener("click", () => {
  CreateNewUser(URL);
});

searchBar.addEventListener("input", (e) => {
  SearchItem(e.target.value);
});

async function getData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
    }
    const data = await response.json();

    console.log("Données récupérées avec succès :");
    console.log(data);

    allUsers = data;
    displayUsers(allUsers);
  } catch (error) {
    console.error(
      "Une erreur est survenue lors de la récupération des données :",
      error
    );
    tableBody.innerHTML =
      "Erreur de chargement des données. Veuillez réessayer.";
    tableBody.style.color = "red";
  } finally {
    loadingMessage.classList.add("hideLoader");
    loadingMessage.classList.remove("showLoader");
    userTable.classList.remove("hideTable");
  }
}

function displayUsers(usersToDisplay) {
  tableBody.innerHTML = "";

  if (usersToDisplay.length === 0) {
    tableBody.innerHTML =
      "<tr><td colspan='6'>Aucun utilisateur trouvé.</td></tr>";
    return;
  }

  usersToDisplay.forEach((user) => {
    const row = document.createElement("tr");

    const cells = [
      user.id,
      user.name,
      user.username,
      user.phone,
      user.website,
      user.email,
    ];
    cells.forEach((cellData) => {
      const td = document.createElement("td");
      td.textContent = cellData;
      row.appendChild(td);
    });

    tableBody.appendChild(row);
  });
}

async function CreateNewUser(url) {
  const userData = {
    name: "Jean Dupont",
    username: "jeandupont",
    email: "jean.dupont@example.com",
    phone: "1-770-736-8031 x56442",
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP! Statut :${response.status}`);
    }

    const createdUser = await response.json();
    console.log("Utilisateur crée avec succès: ");
    console.log(createdUser);
    console.log(`Le nouvel utilisateur est : ${createdUser.id}`);
  } catch (error) {
    console.error(
      "Erreur l'ors que la création de l'utilisateur:",
      error.message
    );
  }
}

function SearchItem(searchTerm) {
  const lowerCaseSearchTerm = searchTerm.toLowerCase();

  const filteredUsers = allUsers.filter((user) =>
    user.name.toLowerCase().includes(lowerCaseSearchTerm)
  );

  displayUsers(filteredUsers);
}
