// ICS128 LAB03 - Mitchell Saremba
const countersBtn = document.getElementById("countersBtn");
const dateBtn = document.getElementById("dateBtn");

const spacesDisplay = document.getElementById("spacesDisplay");
const lettersDisplay = document.getElementById("lettersDisplay");

const spacesInput = document.getElementById("spaces");
const lettersInput = document.getElementById("letters");

// TODO: Use spacesInput and add "input" event
countersBtn.addEventListener("click", () => {
  const spacesVal = document.getElementById("spaces").value;
  const lettersVal = document.getElementById("letters").value;
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

  const datesDisplayObj = {
    "Display your birthday here: ": `${date}`,
    "How many days in the month: ": `${month}`,
    "How many work days: ": `${days}`,
    "BC Minimum Wage: ": `${wage}`,
    "Salary for the month (8hours): ": `${salary}`,
  };

  div.innerText += date;
  console.log(date);

  function constructPs(obj) {
    for (item in obj) {
    }
  }
});

function counter(str, char) {
  let spaceCount = 0;
  let charCount = 0;

  for (c of str) if (c === " ") spaceCount += 1;
  for (c of str)
    if (c.toUpperCase() === char || c.toLowerCase() == char) charCount += 1;

  return [spaceCount, charCount];
}
