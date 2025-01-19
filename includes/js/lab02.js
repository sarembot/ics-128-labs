// ICS128 Lab02 - Mitchell Saremba
const occupancyBtn = document.getElementById("occupancyBtn");
const pricesBtn = document.getElementById("pricesBtn");
const iterationDiv = document.getElementById("iterationDiv");

const messageDiv = document.getElementById("message");
const pricesDiv = document.getElementById("pricesDiv");

const pricesTitle = document.querySelector(".prices-title");
const pricesList = document.querySelector(".prices-list");

const message = document.createElement("h2");
const prices = [];

message.innerText = "Please provide 3 prices for rooms.";
messageDiv.appendChild(message);

// 3 Prices for room
pricesBtn.addEventListener("click", () => {
  prices[0] = parseInt(document.getElementById("numOne").value);
  prices[1] = parseInt(document.getElementById("numTwo").value);
  prices[2] = parseInt(document.getElementById("numThree").value);

  // acc == running total (current sum), val == value of current index, 0 == initial value
  const mean = (
    prices.reduce((acc, val) => acc + val, 0) / prices.length
  ).toFixed(2);

  // Optional Compare fn passed in to sort by num value instead of str val
  prices.sort((a, b) => a - b);

  console.log(Math.round(prices.length / 2) - 1);
  const median = prices[Math.round(prices.length / 2) - 1];

  const pricesObj = {
    Prices: prices,
    Median: median,
    Mean: mean,
  };

  for (item in pricesObj) {
    const li = document.createElement("li");
    li.textContent = `${item}: $${pricesObj[item]}`;
    li.classList.add("list-group-item");

    if (item === "Median" && pricesObj["Median"] % 2 === 0) {
      li.style.color = "red";
    }
    pricesList.appendChild(li);
    console.log(item, pricesObj[item]);
  }

  //   pricesDiv.innerHTML = `
  //   <h3>Prices</h3>
  //   <ul class="list-group">

  //   <li class="list-group-item">Prices: $${prices[0]}, $${prices[1]}, $${prices[2]}</li>
  //   <li class="list-group-item">Median: $${median}</li>
  //   <li class="list-group-item">Mean: $${mean}</li>

  //   </ul>
  // `;
});

// Hotel occupancy
occupancyBtn.addEventListener("click", () => {
  const val = document.getElementById("occupancyRate").value;
  const div = document.getElementById("occupancyDisplay");

  // Clear previous entries
  div.innerHTML = "";

  const p1 = document.createElement("p");
  p1.textContent = "The hotel is: ";

  const p2 = document.createElement("p");
  const rate = document.createElement("span");

  rate.textContent = val + "%";

  // construct second p
  p2.appendChild(rate);
  p2.appendChild(document.createTextNode(" full")); // lets you add text

  div.appendChild(p1);
  div.appendChild(p2);

  if (val == 100) {
    div.removeChild(p1);
    div.removeChild(p2);
    div.innerText = "THE HOTEL IS FULL";
  } else if (val >= 90) {
    rate.style.color = "blue";
  } else if (val < 90 && val >= 80) {
    rate.style.color = "green";
  } else if (val < 80 && val >= 65) {
    rate.style.color = "yellow";
  } else if (val < 65 && val >= 51) {
    rate.style.color = "orange";
  } else {
    rate.style.color = "red";
  }
});

// Iteration
iterationDiv.addEventListener("click", () => {
  const val = document.getElementById("iteration").value;
  const div = document.getElementById("iterationDisplay");

  function createIteration(i) {
    let p = document.createElement("p");
    p.innerText = val.repeat(i);
    div.appendChild(p);
  }

  for (i = 1; i <= 5; i++) {
    createIteration(i);
  }

  for (i = 5; i > 0; i--) {
    createIteration(i);
  }
});
