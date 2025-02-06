// ICS128 LAB03 - Mitchell Saremba
const countersDiv = document.getElementById("countersDiv");
const dateBtn = document.getElementById("dateBtn");
const errorBtn = document.getElementById("errorBtn");

// COUNTERS
// Uses event bubbling - event attached to the entire div
countersDiv.addEventListener("input", (e) => {
  const spacesInput = document.getElementById("spaces");
  const lettersInput = document.getElementById("letters");
  const spacesSpan = document.getElementById("spacesSpan");
  const lettersSpan = document.getElementById("lettersSpan");
  const spacesVal = document.getElementById("spaces").value;
  const lettersVal = document.getElementById("letters").value;
  const letter = document.getElementById("char").value;

  // To make sure number only changes colour on target input
  let lastCharSpaces = spacesVal.slice(-1);
  let lastCharLetters = lettersVal.slice(-1);

  // If user types in spaces input and it's a good input
  if (e.target === spacesInput && lastCharSpaces == " ") {
    updateInput(spacesSpan, spacesVal, " ");
    changeSpanColour(spacesSpan);

    // If user types in letters input - Case insensitive
  } else if (
    (e.target === lettersInput && lastCharLetters === letter.toUpperCase()) ||
    lastCharLetters === letter.toLowerCase()
  ) {
    updateInput(lettersSpan, lettersVal, letter);
    changeSpanColour(lettersSpan);
  }

  // To make sure empty string resets back to 0
  if (spacesVal === "") {
    spacesSpan.innerText = 0;
    spacesSpan.style.color = "black";
  }
  if (lettersVal === "") {
    lettersSpan.innerText = 0;
    lettersSpan.style.color = "black";
  }
});

function updateInput(span, str, char) {
  const display = counter(str, char);

  span.innerHTML = ``;
  span.innerText = display;
}

function changeSpanColour(span) {
  const colors = [
    "red",
    "green",
    "blue",
    "orange",
    "purple",
    "darkblue",
    "cyan",
    "magenta",
  ];

  // Change color to random index in colors
  span.style.color = colors[Math.floor(Math.random() * colors.length)];
}

function counter(str, char) {
  let count = 0;
  char = char.toLowerCase();

  // loop through each char in str
  for (c of str) {
    // change to lower case for comparison
    c = c.toLowerCase();

    if (c === char) count += 1;
  }

  return count;
}

// DATES
dateBtn.addEventListener("click", () => {
  const div = document.getElementById("dateDisplay");
  const date = document.getElementById("date").value;

  // Get necessary values
  const dateObj = new Date(date);
  const daysInMonth = getDaysInMonth(dateObj);
  const weekdayCount = getWeekDaysInMonth(dateObj);
  const minWage = (17.4).toFixed(2);
  const salary = (8 * weekdayCount * minWage).toFixed(2);

  // Reset DOM
  div.innerText = "";
  div.cssText = ``;

  // Populate DOM
  try {
    div.appendChild(constructP("Day: ", date, "red"));
    div.appendChild(constructP("Days in the month: ", daysInMonth, "blue"));
    div.appendChild(constructP("Weekdays in month: ", weekdayCount, "magenta"));
    div.appendChild(constructP("Min. Wage n BC: ", `$${minWage}`, "orange"));
    div.appendChild(constructP("Monthly Salary: ", `$${salary}`, "green"));

    // If user didn't enter a date
    if (date === "") throw new Error("Please enter a valid date.");
  } catch (error) {
    div.style.cssText = `
      padding: 2em;
      text-align: center;
      font-size = 1em;
      font-weight = bold; 
      color: red;
    `;

    div.textContent = error;
  }
  // Make P tags to easily add custom colours/items
  function constructP(str, item, color) {
    const p = document.createElement("p");
    p.innerText = str;

    const span = document.createElement("span");
    span.innerText = item;
    span.style.color = color;
    p.appendChild(span);

    return p;
  }
});

function getDaysInMonth(dateObj) {
  let daysInMonth;
  // Separate months with 30/31 days
  switch (dateObj.getMonth()) {
    case 0:
    case 2:
    case 4:
    case 6:
    case 7:
    case 9:
    case 11:
      daysInMonth = 31;
      break;
    case 3:
    case 5:
    case 8:
    case 10:
      daysInMonth = 30;
      break;
    // Feb is special
    case 1:
      // If leap year
      if (
        dateObj.getYear() % 4 === 0 &&
        (dateObj.getYear() % 100 !== 0 || dateObj.getYear() % 400 === 0)
      ) {
        daysInMonth = 29;
        break;
      } else {
        daysInMonth = 28;
        break;
      }
  }

  return daysInMonth;
}

function getWeekDaysInMonth(dateObj) {
  let weekdays = 0;
  // Loop through days of month
  for (let day = 1; day <= getDaysInMonth(dateObj); day++) {
    // Create new Date() for each day
    let currentDay = new Date(dateObj.setDate(day)); //setDate returns str in ms - use constructor to get proper type

    // if currentDay is a weekday, add it to count
    if (currentDay.getDay() > 0 && currentDay.getDay() < 6) weekdays++;
  }
  return weekdays;
}

// ERROR HANDLING
errorBtn.addEventListener("click", () => {
  const div = document.getElementById("errorDisplay");
  const val = document.getElementById("error").value;

  div.innerHTML = ``;

  // Prepare DOM for results
  const p1 = document.createElement("p");
  const p2 = document.createElement("p");
  const s1 = document.createElement("span");
  const s2 = document.createElement("span");
  s1.classList.add("text-primary");
  s2.classList.add("text-success");
  s1.innerText = val;
  s2.innerText = val;

  p1.innerText = `Your number is: `;
  p1.appendChild(s1);

  p2.innerText =
    val > 2
      ? `Your number is greater than 2: `
      : `Your number is less than or equal to 2: `;
  p2.appendChild(s2);

  div.appendChild(p1);
  div.appendChild(p2);

  // Create element to display result of isItInRange
  const errorP = document.createElement("p");
  errorP.classList.add("text-danger");

  // try and store string return value into result
  try {
    const result = isItInRange(val);
    errorP.innerText = result;
    errorP.classList.remove("text-danger");
    errorP.classList.add("text-success");
    div.appendChild(errorP);

    // if isItInRange throws an error, display error message instead
  } catch (error) {
    errorP.innerText = error;
    div.appendChild(errorP);
  }
});

function isItInRange(input) {
  if (input <= 0) {
    throw new Error(`Your number: ${input} must be greater than zero.`);
  } else if (input <= 2) {
    throw new Error(`Number must be greater than 2: ${input}`);
  } else if (input > 2 && input < 4) {
    return `The value is over 2: ${input}`;
  } else {
    return `Your number is in the correct range`;
  }
}
