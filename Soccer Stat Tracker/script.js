// Get references to HTML elements
const clubList = document.getElementById('club-list');
const searchInput = document.getElementById('search');
const clubDetailsContainer = document.getElementById('main');

// Attach an input event listener for the search input
searchInput.addEventListener('input', handleSearchInput);

// Initialize football club data and display all clubs
let clubData = footballClubs; 
displayClubs(footballClubs);


// Display football clubs in the club list
function displayClubs(clubs) {
    // Generate HTML for club cards and set it in the clubList element
    const clubCardsHTML = clubs.map(createClubCardHTML).join('');
    clubList.innerHTML = clubCardsHTML;
}

// Create HTML for a football club card
function createClubCardHTML(club) {
    return `
        <div class="club-card" onclick="handleClubClick(this);"><!-- Add onclick event -->
            <h2>${club.name}</h2>
            <img src="${club.image}" alt="${club.name} Image" style="width:100%; height:20vh;">
            <p><b>League: </b>${club.league}</p>
            <p><b>City: </b>${club.city}</p>
            <button onclick="viewClubPlayers('${club.name}'); event.stopPropagation();" style="width:100%;">View Players</button>
        </div>
    `;
}

// Handle clicking on a football club card
function handleClubClick(element) {
    const clickedClubCard = element;
    if(clickedClubCard){
        const clickedClubName = clickedClubCard.querySelector('h2').textContent;
        const selectedClub = clubData.find(club => club.name === clickedClubName);

        if(selectedClub){
            displayClubDetails(selectedClub);
        }
    }
}

// Display football club details
function displayClubDetails(club) {
    const clubDetails = `
    <button onclick="window.location.reload();">Back</button>
    <h2>${club.name}</h2>
    <img src="${club.image}" alt="${club.name} Image">
    <p><b>League: </b>${club.league}</p>
    <p><b>City: </b>${club.city}</p>
    <p><b>Stadium: </b>${club.stadium}</p>
    <button onclick="viewClubPlayers('${club.name}'); event.stopPropagation();">View Players</button>
    <p><b>Description: </b>${club.description}</p>
    `;
    clubDetailsContainer.innerHTML = clubDetails;
}

// Function to view club players
function viewClubPlayers(clubName) {
    const selectedClub = clubData.find(club => club.name === clubName);

    if(selectedClub){
        let clubPlayers = `
        <button onclick="window.location.reload();">Back</button>
        <h2>${clubName} Players</h2>
        `;

        selectedClub.players.forEach(player =>{
            clubPlayers += `
            <p><b>Name: </b>${player.name}</p>
            <p><b>Position: </b>${player.position}</p>
            <p><b>Goals: </b>${player.goals}</p>
            <p><b>Assists: </b>${player.assists}</p>
            <hr>
            `;
        });


        clubDetailsContainer.innerHTML = clubPlayers;
    }
   
}

// Handle search input and filter clubs
function handleSearchInput() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredClubs = clubData.filter(club => {
        const clubDataString = `${club.name} ${club.league} ${club.city}`.toLowerCase();
        return clubDataString.includes(searchTerm);
    });
    displayClubs(filteredClubs);
}