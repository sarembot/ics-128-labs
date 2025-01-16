// ICS128 Lab02 - Mitchell Saremba
// console.log("working");

const messageDiv = document.getElementById("message");
const message = document.createElement("h2");
message.innerText = "Please provide 3 prices for rooms.";

let numOne, numTwo, numThree;

messageDiv.appendChild(message);

document.getElementById("special-btn").addEventListener("click", () => {
  numOne = parseInt(document.getElementById("numOne").value);
  numTwo = parseInt(document.getElementById("numTwo").value);
  numThree = parseInt(document.getElementById("numThree").value);
  const nums = [numOne, numTwo, numThree];

  const max = Math.max(nums);
  const min = Math.min(nums);

  let mean = numOne + numTwo + numThree / 3;
  let median;
  console.log(`Max: ${max} Min: ${min}`);
  console.log(`Nums: ${numOne}, ${numTwo}, ${numThree}`);
  console.log(`Mean: ${mean}`);
});

function calculateMean(num1, num2, num3) {
  return num1, num2, num3;
}
