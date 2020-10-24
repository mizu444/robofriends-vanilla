const cardList = document.getElementById("card-list");
const searchbox = document.getElementById("searchbox");
const container = document.getElementById("container");
const loader = document.getElementById("loader");

let robots = [];

// Fetch robots
function fetchRobots() {
  loader.classList.add("loading");
  container.classList.add("loading");

  fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.json())
    .then((data) => {
      robots = data;
      createCardList();
      loader.classList.remove("loading");
      container.classList.remove("loading");
    });
}

// Add cards to DOM
function createCard(robot, index) {
  const card = document.createElement("div");
  const image = document.createElement("img");
  const name = document.createElement("h2");
  const email = document.createElement("p");

  image.setAttribute("src", `https://robohash.org/${index}`);
  name.innerText = robot.name;
  email.innerText = robot.email;

  card.classList.add("card");

  card.appendChild(image);
  card.appendChild(name);
  card.appendChild(email);

  cardList.appendChild(card);
}

// Create card list
function createCardList() {
  robots.forEach(createCard);
}

// Search robots
function searchRobots(e) {
  const searchTerm = e.target.value.toLowerCase();
  const filteredRobots = robots.filter((robot) =>
    robot.name.toLowerCase().includes(searchTerm)
  );

  cardList.innerHTML = "";
  filteredRobots.forEach(createCard);
}

// Event listener
searchbox.addEventListener("input", searchRobots);

fetchRobots();
