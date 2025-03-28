// MITCHELL SAREMBA - ICS 128 LAB05 - 02/25
"use strict";

// For creating "Input" objects with custom attributes
class Input {
  constructor(name, regex, errorMsg) {
    this.name = name;
    this.regex = regex; // Define custom regex filter
    this.errorMsg = errorMsg; // Define custom error message

    this.input = document.getElementById(`${this.name}Input`); // eg. fNameInput
    this.icon = document.getElementById(`${this.name}Icon`); // eg. fNameIcon
    this.errorSpan = document.getElementById(`${this.name}Error`); // Contianer for error message
    this.valid = false; // Keeps track of if the input is good/bad
  }

  // Allows us to get the most recent value - rather than the initial value
  getUpdatedValue() {
    return this.input.value;
  }
}

// Make some Input Objs with custom attributes - store in array for easy looping
let inputObjs = [
  new Input(
    /* Name: */ "fName",
    /* Regex: */ /^[a-zA-Z]+-?[a-zA-Z]+?$/, // Allows hyphen names
    /* Error Msg: */ "Please enter your first name without spaces."
  ),
  new Input(
    "lName",
    /^[a-zA-Z]+-?[a-zA-Z]+?$/, // Allows hyphen
    "Please enter a valid last name."
  ),
  new Input(
    "email",
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    "Please enter a valid email address."
  ),
  new Input(
    "age",
    /^([0-9]{1,2}|1[0,1]\d|120)$/, // 0-99 | 100-119 | 120
    "Please enter a valid age."
  ),
  new Input(
    "postalCode",
    // No D,F,I,O,Q,U
    // Can't start with W or Z
    /^[a-ceg-hj-npr-vyA-CEG-HJ-NPR-VY][0-9][a-ceg-hj-npr-zA-CEG-HJ-NPR-Z][\s]?[0-9][a-ceg-hj-npr-zA-CEG-HJ-NPR-Z][0-9]$/,
    "Please enter a valid Canadian postal code."
  ),
  new Input(
    "phoneNumber",
    /^\(?[0-9]{3}\)?[-\s]?[0-9]{3}[-\s]?[0-9]{4}$/, // Accepts multiple formats
    "Please enter a valid phone number."
  ),
];

// ClassLists to add/remove a bunch of classes from input elements - for changing the border, etc
let goodInputClassList = [
  "border",
  "border-4",
  "border-rounded",
  "focus-ring",
  "focus-ring-success",
  "border-success",
  "border-opacity-50",
];

let badInputClassList = [
  "border",
  "border-4",
  "border-rounded",
  "focus-ring",
  "focus-ring-danger",
  "border-danger",
  "border-opacity-50",
];

// ClassLists to be used to toggle between icons when validating inputs
const inputIcons = {
  neutral: "fs-5 bi-dash-circle",
  good: "fs-5 bi-check-circle",
  bad: "fs-5 bi-x-circle",
};

/* Loop through inputs and validate each one dynamically
 * The idea is to validate each input individually
 * Update styles depending on input state
 * Lets the user know there is a mistake right away */
inputObjs.forEach((obj) => {
  // 'blur' event fires when an element has lost focus
  obj.input.addEventListener("blur", () => {
    // If empty input
    if (obj.getUpdatedValue() === "") {
      // Clear previous input classes - back to default
      obj.input.classList.remove(...goodInputClassList);
      obj.input.classList.remove(...badInputClassList);
      obj.icon.className = inputIcons.neutral; // className clears prev classes

      obj.errorSpan.style.display = "none";
      obj.valid = false;

      // If good input
    } else if (obj.regex.test(obj.getUpdatedValue())) {
      obj.input.classList.remove(...badInputClassList); // Remove red styles
      obj.input.classList.add(...goodInputClassList); // Add green styles

      obj.icon.className = inputIcons.good; // Set checkmark icon
      obj.errorSpan.style.display = "none"; // Hide error message
      obj.valid = true;

      // If bad input
    } else {
      obj.input.classList.remove(...goodInputClassList); // Remove greens styles
      obj.input.classList.add(...badInputClassList); // Add red styles

      obj.icon.className = inputIcons.bad; // Set X icon
      obj.errorSpan.textContent = obj.errorMsg; // Display error message
      obj.errorSpan.style.display = "inline";

      obj.valid = false;
    }
  });
});

// FORM VALIDATION ---------------

const form = document.getElementById("form");
const display = document.getElementById("display");
const loginModal = new bootstrap.Modal(document.getElementById("loginModal")); // Turns bootstrap modal into JS object for easy control
const formBtn = document.getElementById("formBtn");
const loginBtnDiv = document.getElementById("loginBtnDiv");
const logoutBtnDiv = document.getElementById("logoutBtnDiv");
const welcomeMessage = document.getElementById("welcomeMessage");

// Click on login button
loginBtnDiv.addEventListener("click", () => {
  // Bring up modal
  loginModal.show();
});

// Click on logout button
logoutBtnDiv.addEventListener("click", () => {
  // Display login button, hide logout button, welcome message and profile
  loginBtnDiv.classList.remove("hidden");
  logoutBtnDiv.classList.add("hidden");
  display.classList.add("hidden");
  welcomeMessage.classList.add("hidden");
});

// Handle form submission
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevents page from reloading and wiping out the profile card after submission

  // To be extra sure each input is valid
  for (let input of inputObjs) {
    if (!input.valid) {
      input.errorSpan.display = "inline"; // Display error message
      return; // Abandon submission if an input is invalid
    }
  }

  // If all inputs are valid...

  // Hide Modal
  loginModal.hide();

  // Destructure input values into variables
  const { fName, lName, email, age, postalCode, phoneNumber } =
    getInputValues(inputObjs);

  // Put input values into DOM
  document.getElementById("nameTitle").innerText = `${fName} ${lName}`;
  document.getElementById("emailTitle").innerText = email;
  document.getElementById("ageLi").innerText = `Age: ${age}`;
  document.getElementById(
    "postalCodeLi"
  ).innerText = `Post Code: ${postalCode}`;
  document.getElementById("phoneNumberLi").innerText = `Phone: ${phoneNumber}`;

  // Update Welcome Message
  welcomeMessage.innerText = `Hello, ${fName} ${lName}`;
  welcomeMessage.classList.remove("hidden");

  // Show profile and logout button, hide login button
  display.classList.remove("hidden");
  loginBtnDiv.classList.add("hidden");
  logoutBtnDiv.classList.remove("hidden");
});

// Creates a key value pair for each input value of the form
function getInputValues(inputs) {
  let values = {};
  inputs.forEach((obj) => {
    values[obj.name] = obj.getUpdatedValue(); // Create an attribute like { name : "Jeremiah" }, etc
  });
  return values;
}
