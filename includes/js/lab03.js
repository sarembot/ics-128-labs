// ICS128 LAB03 - Mitchell Saremba
const countersBtn = document.getElementById("countersBtn");
const spacesDisplay = document.getElementById("spacesDisplay");
const lettersDisplay = document.getElementById("lettersDisplay");

countersBtn.addEventListener("click", () => {
  const spacesVal = document.getElementById("spaces").value;
  const lettersVal = document.getElementById("letters").value;

  const counts = counter(spacesVal, "L");
  console.log(counts);
});

function counter(str, char) {
  const counts = [];
  let spaceCount = 0;
  let charCount = 0;

  for (c of str) if (c === " ") spaceCount += 1;
  for (c of str) if (c === char) charCount += 1;

  counts.push(spaceCount);
  counts.push(charCount);

  return counts;
}
