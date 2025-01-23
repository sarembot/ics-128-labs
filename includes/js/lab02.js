// ICS128 Lab02 - Mitchell Saremba
const pricesBtn = document.getElementById("pricesBtn");
const occupancyBtn = document.getElementById("occupancyBtn");
const iterationBtn = document.getElementById("iterationBtn");
const fastestBtn = document.getElementById("fastestBtn");

// Room Prices
pricesBtn.addEventListener("click", () => {
  const pricesList = document.querySelector(".prices-list");

  // Get user inputs
  const prices = [
    parseInt(document.getElementById("numOne").value),
    parseInt(document.getElementById("numTwo").value),
    parseInt(document.getElementById("numThree").value),
  ];

  // acc == running total (current sum), val == value of current index, 0 == initial value
  const mean = (
    prices.reduce((acc, val) => acc + val, 0) / prices.length
  ).toFixed(2);

  // Function forces sort by num value
  // Sort prices to calculate median
  prices.sort((a, b) => a - b);

  const median = prices[Math.round(prices.length / 2) - 1];

  // Just for fun
  const pricesObj = {
    Prices: prices,
    Median: median,
    Mean: mean,
  };

  // Reset list vals in DOM
  pricesList.innerHTML = "";

  for (item in pricesObj) {
    const li = document.createElement("li");

    // Format nums array correctly in DOM
    if (item == "Prices") {
      li.textContent = `${item}: `;
      for (i of pricesObj[item]) li.textContent += `$${i}   `;
    } else {
      li.textContent = `${item}: $${pricesObj[item]} `;
    }

    li.classList.add("list-group-item");

    // If median is an even number
    if (item === "Median" && pricesObj["Median"] % 2 === 0) {
      li.style.color = "red";
    }

    // Add stuff to DOM
    pricesList.appendChild(li);
  }
});

// Hotel occupancy
occupancyBtn.addEventListener("click", () => {
  const val = parseInt(document.getElementById("occupancyRate").value);
  const div = document.getElementById("occupancyDisplay");

  // Clear previous entries
  div.innerHTML = "";

  console.log(val, typeof val);

  if (!isNaN(val) && val <= 100 && val >= 0) {
    // Create elements
    const p1 = document.createElement("p");
    const p2 = document.createElement("p");
    const rate = document.createElement("span");

    // Add content
    p1.textContent = "The hotel is: ";
    rate.textContent = val + "%";
    p2.appendChild(rate);

    div.appendChild(p1);
    div.appendChild(p2);
    p2.appendChild(document.createTextNode(" full")); // lets you add text

    if (val >= 100) {
      div.innerText = "";
      div.innerText = "THE HOTEL IS FULL";
      div.style.fontSize = "1.5em";
    } else if (val >= 90) {
      rate.style.color = "blue";
    } else if (val >= 80) {
      rate.style.color = "green";
    } else if (val >= 65) {
      rate.style.color = "#efcc00";
    } else if (val >= 51) {
      rate.style.color = "orange";
    } else {
      rate.style.color = "red";
    }
  } else {
    div.innerText = "Incorrect - not between 0-100.";
  }
});

// Iteration
iterationBtn.addEventListener("click", () => {
  const div = document.getElementById("iterationDisplay");
  const val = document.getElementById("iteration").value;

  if (val !== "") {
    // Reset DOM
    div.innerHTML = "";

    for (i = 1; i <= 5; i++) iterate(i);

    for (i = 4; i > 0; i--) iterate(i);

    function iterate(i) {
      let p = document.createElement("p");
      p.innerText = val.repeat(i); // takes str returns str*i
      p.classList.add("text-primary");
      p.classList.add("p-0");
      p.classList.add("m-0");
      div.appendChild(p);
    }
  } else {
    div.innerText = "";
  }
});

// Fastest
fastestBtn.addEventListener("click", () => {
  // Div for displaying results
  const div = document.getElementById("fastestDisplay");

  // Input values
  const alexa = document.getElementById("alexa").value;
  const siri = document.getElementById("siri").value;

  // Make some elements
  const alexaP = document.createElement("p");
  const siriP = document.createElement("p");
  const winnerP = document.createElement("p");

  const alexaSpan = document.createElement("span");
  const siriSpan = document.createElement("span");
  const winnerSpan = document.createElement("span");

  // Add content to elements
  alexaSpan.innerText = alexa;
  siriSpan.innerText = siri;

  // 'spreads' classes of element as args to the remove method
  // resets styles
  siriSpan.classList.remove(...siriSpan.classList);
  alexaSpan.classList.remove(...alexaSpan.classList);
  winnerSpan.classList.remove(...winnerSpan.classList);

  winnerSpan.classList.add("text-danger");

  // if siri is faster
  if (parseInt(siri) > parseInt(alexa)) {
    winnerSpan.textContent = "Siri";
    siriSpan.classList.add("text-danger");
    alexaSpan.classList.add("text-primary");

    // if alexa is faster
  } else if (parseInt(alexa) > parseInt(siri)) {
    winnerSpan.textContent = "Alexa";
    alexaSpan.classList.add("text-danger");
    siriSpan.classList.add("text-primary");
  }

  // Add content to elements
  siriP.innerText = "Siri's speed: ";
  alexaP.innerText = "Alexa's speed: ";

  siriP.appendChild(siriSpan);
  alexaP.appendChild(alexaSpan);
  winnerP.appendChild(winnerSpan);
  winnerP.innerHTML += " is the winner.";

  // Reset previous content
  div.innerHTML = "";

  // Add elements to DOM
  div.appendChild(siriP);
  div.appendChild(alexaP);
  div.appendChild(winnerP);
});
