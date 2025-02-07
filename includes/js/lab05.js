// MITCHELL SAREMBA - ICS 128 LAB05 - 02/25
"use strict";
const formBtn = document.getElementById("formBtn");

const fName = fNameInput.value;
const lName = lNameInput.value;

class Input {
  constructor(name, input, icon, iconSpan, regex) {
    this.name = name;
    this.input = input;
    this.icon = icon;
    this.iconDiv = iconSpan;
    this.value = this.input.value; // needs to update dynamically
    this.regex = regex;
    this.errorMsg = errorMsg;
  }

  error = new Error(this.errorMsg);

  updateValue() {
    this.value = this.input.value;
  }
}

const inputIcons = {
  neutral: "fs-5 bi-dash-circle",
  good: "fs-5 bi-check-circle",
  bad: "fs-5 bi-x-circle",
};

let inputObjs = [
  new Input(
    "fName",
    document.getElementById("fNameInput"),
    document.getElementById("fNameIcon"),
    document.getElementById("fNameIconDiv"),
    /^[a-zA-Z]+$/
  ),
  new Input(
    "lName",
    document.getElementById("lNameInput"),
    document.getElementById("lNameIcon"),
    document.getElementById("lNameIconDiv"),
    /^[a-zA-Z]+$/
  ),
  new Input(
    "email",
    document.getElementById("emailInput"),
    document.getElementById("emailIcon"),
    document.getElementById("emailIconDiv"),
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  ),
  new Input(
    "age",
    document.getElementById("ageInput"),
    document.getElementById("ageIcon"),
    document.getElementById("ageIconDiv"),
    /^[0-9]{1,2}$/
  ),
  new Input(
    "postalCode",
    document.getElementById("postalCodeInput"),
    document.getElementById("postalCodeIcon"),
    document.getElementById("postalCodeIconDiv"),
    // No D,F,I,O,Q,U
    // Can't start with W or Z
    /^[a-ceg-hj-npr-vyA-CEG-HJ-NPR-VY][0-9][a-ceg-hj-npr-zA-CEG-HJ-NPR-Z][\s]?[0-9][a-ceg-hj-npr-zA-CEG-HJ-NPR-Z][0-9]$/
  ),
  new Input(
    "phoneNumber",
    document.getElementById("phoneNumberInput"),
    document.getElementById("phoneNumberIcon"),
    document.getElementById("phoneNumberIconDiv"),
    /^\(?[0-9]{3}\)?[-\s]?[0-9]{3}[-\s]?[0-9]{4}$/
  ),
];

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

// Validates input dynamically
inputObjs.forEach((obj) => {
  obj.input.addEventListener("input", () => {
    obj.updateValue(); // Dynamically update value

    // Empty input
    if (obj.value === "") {
      obj.input.classList.remove(...goodInputClassList);
      obj.input.classList.remove(...badInputClassList);

      obj.icon.className = inputIcons.neutral; // className clears prev classes

      // Good input
    } else if (obj.regex.test(obj.value)) {
      obj.input.classList.remove(...badInputClassList);
      obj.input.classList.add(...goodInputClassList);

      obj.icon.className = inputIcons.good;

      // Bad input
    } else {
      obj.input.classList.remove(...goodInputClassList);
      obj.input.classList.add(...badInputClassList);

      obj.icon.className = inputIcons.bad;
    }
  });
});

// Validates form after submission
formBtn.addEventListener("click", () => {
  for (obj in inputObjs) {
    if (obj.regex.test(obj.value)) {
      continue;
    } else {
      throw this.error;
    }
  }
});
