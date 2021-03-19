const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionersBtn = document.getElementById('show-millioners');
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
