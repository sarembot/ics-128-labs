// MITCHELL SAREMBA - ICS 128 LAB05 - 02/25
"use strict";
const formBtn = document.getElementById("formBtn");

// Make the emoji's to the left of inputs an 'x', and then when the user enters a valid input, make it a green check

console.log("working");
formBtn.addEventListener("click", () => {
  const fName = document.getElementById("firstNameInput").value;
  const lName = document.getElementById("lastNameInput").value;
  const nameRegex = /^[A-Za-z]+$/;

  if (nameRegex.test(fName)) console.log("First Name Valid");
  if (nameRegex.test(lName)) console.log("Last Name Valid");

  const email = document.getElementById("emailInput").value;
  // TODO: make email re better - don't allow more than one special char in a row, etc;
  //   const emailRegex = /^[\w\.]+@[\w\.]+\.[a-zA-Z]$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (emailRegex.test(email)) console.log("Email Valid");

  const age = document.getElementById("ageInput").value;
  const ageRegex = /^[0-9]{1,2}$/;

  if (ageRegex.test(age)) console.log("Age Valid");
  else console.log("Age not valid");

  const postalCode = document.getElementById("postalCodeInput").value;

  const phoneNumber = document.getElementById("phoneNumInput").value;
  const phoneRegex = /^\(?[0-9]{3}\)?[-\s]?[0-9]{3}[-\s]?[0-9]{4}$/;

  if (phoneRegex.test(phoneNumber)) console.log("Phone Valid");
  else console.log("Phone not valid");
});
