// ICS128 Lab02 - Mitchell Saremba
// console.log("working");

const messageDiv = document.getElementById("message");
const message = document.createElement("h2");
message.innerText = "Please provide 3 prices for rooms.";

messageDiv.appendChild(message);

const numOne = document.getElementById("numOne").value;
const numTwo = document.getElementById("numTwo").value;
const numThree = document.getElementById("numThree").value;
