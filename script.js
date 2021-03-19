const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairsBtn = document.getElementById('show-millionairs');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();


// Fetch random user and add money
async function getRandomUser()  {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();
  console.log(data);

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random()*1000000)
  }
  addData(newUser);
}

// Double everyones money 
function doubleMoney() {
 data = data.map(person => {
   return { ...person, money: person.money * 2 }
  })

  updateDOM();
}

// Sort people by richest
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);

  updateDOM();
}

// Show only millionairs
function showMillionairs() {
  data = data.filter(person => person.money > 1000000); 

  updateDOM();
}

function calculateWealth() {
  const total = data.reduce((acc, person) => (acc += person.money), 0);
  const totalWealthEl = document.createElement('div');
  totalWealthEl.innerHTML = `<h3>Total wealth: <strong>${formatMoney(total)}</strong></h3>`;
  main.appendChild(totalWealthEl); 
}

// Add new object to data arr
function addData(obj) {
  data.push(obj);

  updateDOM();
}

// Update DOM
function updateDOM(providedData = data) {
  // Clear main div
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  providedData.forEach(person => {
   const element = document.createElement('div');
   element.classList.add('person');
   element.innerHTML=`<strong>${person.name}</strong> ${formatMoney(person.money)}`;
   main.appendChild(element); 
  });
}

// Format number as money
//https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string 
function formatMoney(number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}


// Event Listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairsBtn.addEventListener('click', showMillionairs);
calculateWealthBtn.addEventListener('click', calculateWealth);