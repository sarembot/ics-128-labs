// ICS128 LAB03 - Mitchell Saremba
const countersBtn = document.getElementById("countersBtn");
const dateBtn = document.getElementById("dateBtn");
const errorBtn = document.getElementById("errorBtn");

const spacesDisplay = document.getElementById("spacesDisplay");
const lettersDisplay = document.getElementById("lettersDisplay");

const spacesInput = document.getElementById("spaces");
const lettersInput = document.getElementById("letters");

// TODO: Use spacesInput and add "input" event
countersBtn.addEventListener("click", () => {
  const spacesVal = document.getElementById("spaces").value;
  let lettersVal = document.getElementById("letters").value;
  const spacesSpan = document.getElementById("spacesSpan");

  // counts[0] --> spacesCount, counts[1] --> lettersCount
  const [spacesCount, lettersCount] = counter(spacesVal, "L");

  // Clear DOM
  // spacesDisplay.innerHTML = "";
  // lettersDisplay.innerHTML = "";

  spacesSpan.classList.add("text-danger");
  spacesSpan.classList.add("fw-bold");
  spacesSpan.textContent = spacesCount;

  console.log(typeof document.getElementById("spacesP").textContent);

  lettersSpan.classList.add("text-success");
  lettersSpan.classList.add("fw-bold");
  lettersSpan.textContent = lettersCount;

  lettersVal = `${document.getElementById("spacesP").textContent}`;
});

// lettersInput.addEventListener("input", () => {
//   console.log("working");
// });

dateBtn.addEventListener("click", () => {
  const div = document.getElementById("dateDisplay");
  const date = document.getElementById("date").value;

  const dateObj = new Date(date);
  const daysInMonth = getDaysInMonth(dateObj);
  const weekdayCount = getWeekDaysInMonth(dateObj);
  const minWage = (17.4).toFixed(2);
  const salary = (8 * weekdayCount * minWage).toFixed(2);

  div.innerText = "";

  div.innerHTML = `
    <p>Birthday: ${date}</p>
    <p>Days in the month: ${daysInMonth}</p>
    <p>Weekdays in the month: ${weekdayCount}</p>
    <p>Min. Wage in BC: $${minWage}</p>
    <p>Monthly salary: $${salary}</p>
  `;

  console.log(date);
});

function counter(str, char) {
  let spaceCount = 0;
  let charCount = 0;

  for (c of str) if (c === " ") spaceCount += 1;
  for (c of str)
    if (c.toUpperCase() === char || c.toLowerCase() == char) charCount += 1;

  return [spaceCount, charCount];
}

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
    case 1:
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
    // dateObj.setDate(day) returns m str since epoch
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
