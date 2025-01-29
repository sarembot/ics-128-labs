// ICS128 LAB03 - Mitchell Saremba
const countersDiv = document.getElementById("countersDiv");
const dateBtn = document.getElementById("dateBtn");
const errorBtn = document.getElementById("errorBtn");

// COUNTERS
countersDiv.addEventListener("input", (e) => {
  const spacesInput = document.getElementById("spaces");
  const lettersInput = document.getElementById("letters");
  const spacesSpan = document.getElementById("spacesSpan");
  const lettersSpan = document.getElementById("lettersSpan");
  const spacesVal = document.getElementById("spaces").value;
  const lettersVal = document.getElementById("letters").value;
  const letter = document.getElementById("char").value;

  // Make sure number only changes colour on target input
  let lastCharSpaces = spacesVal.slice(-1);
  let lastCharLetters = lettersVal.slice(-1);

  // If user types in spaces input
  if (e.target === spacesInput && lastCharSpaces == " ") {
    updateInput(spacesSpan, spacesVal, " ");
    changeSpanColour(spacesSpan);
    // If user types in letters input
  } else if (e.target === lettersInput && lastCharLetters == letter) {
    updateInput(lettersSpan, lettersVal, letter);
    changeSpanColour(lettersSpan);
  }

  // Make sure empty string resets back to 0
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
  span.innerHTML = ``;
  span.innerText = `${counter(str, char)}`;
}

function changeSpanColour(span) {
  const colors = [
    "red",
    "green",
    "blue",
    "orange",
    "yellow",
    "purple",
    "darkblue",
    "cyan",
  ];

  // Change color to random index in colors
  span.style.color = colors[Math.floor(Math.random() * colors.length)];
}

function counter(str, char) {
  let count = 0;

  for (c of str) {
    c = c.toLowerCase();
    char = char.toLowerCase();
    if (c === char) count += 1;
  }

  return count;
}

// DATES
dateBtn.addEventListener("click", () => {
  const div = document.getElementById("dateDisplay");
  const date = document.getElementById("date").value;

  const dateSpan = document.createElement("span");
  dateSpan.innerText = date;
  dateSpan.classList.add("primary");

  const dateObj = new Date(date);
  const daysInMonth = getDaysInMonth(dateObj);
  const weekdayCount = getWeekDaysInMonth(dateObj);
  const minWage = (17.4).toFixed(2);
  const salary = (8 * weekdayCount * minWage).toFixed(2);

  // Reset DOM
  div.innerText = "";

  div.appendChild(constructP("Day: ", date, "red"));
  div.appendChild(constructP("Days in the month: ", daysInMonth, "blue"));
  div.appendChild(constructP("Weekdays in month: ", weekdayCount, "magenta"));
  div.appendChild(constructP("Min. Wage n BC: ", `$${minWage}`, "orange"));
  div.appendChild(constructP("Monthly Salary: ", `$${salary}`, "green"));

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
  switch (dateObj.getMonth()) {
    case 0:
    case 2:
    case 4:
    case 6:
    case 7:
    case 9:
    case 11:
      daysInMonth = 31;
      return daysInMonth;
    case 3:
    case 5:
    case 8:
    case 10:
      daysInMonth = 30;
      return daysInMonth;
    // Feb is special
    case 1:
      // If leap year
      if (
        dateObj.getYear() % 4 === 0 &&
        (year % 100 !== 0 || year % 400 === 0)
      ) {
        daysInMonth = 29;
        return daysInMonth;
      } else {
        daysInMonth = 28;
        return daysInMonth;
      }
  }
}

function getWeekDaysInMonth(dateObj) {
  let weekdays = 0;
  // Loop through days of month
  for (let day = 0; day <= getDaysInMonth(dateObj); day++) {
    // Create new Date() for each day
    // dateObj.setDate(day) returns ms str since epoch
    let currentDay = new Date(dateObj.setDate(day));

    if (currentDay.getDay() > 0 && currentDay.getDay() < 6) weekdays++;
  }
  return weekdays;
}

function isItInRange(input) {
  if (input <= 0) {
    throw new Error("The value must be zero or greater");
  } else if (input < 2) {
    throw new Error(`The value is less than 2: ${input}`);
  } else if (input > 2 && input < 4) {
    throw new Error(`The value is over 2: ${input}`);
  } else {
    throw new Error(`Your value is in the correct range.`);
  }
}

// ERROR HANDLING
