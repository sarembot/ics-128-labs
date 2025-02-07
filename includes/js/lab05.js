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
  }

  updateValue() {
    this.value = this.input.value;
  }
}

let inputObjs = [
  new Input(
    "fName",
    document.getElementById("fNameInput"),
    document.getElementById("fNameIcon"),
    document.getElementById("fNameIconDiv"),
    /^[a-za-z]+$/
  ),

  //   {
  //     name: "fName",
  //     input: document.getElementById("fNameInput"),
  //     icon: document.getElementById("fNameIcon"),
  //     value: `${this.input.value}`,
  //     regex: /^[a-za-z]+$/,
  //   },
  //   {
  //     name: "lName",
  //     input: document.getElementById("lNameInput"),
  //     icon: document.getElementById("lNameIcon"),
  //     regex: /^[a-za-z]+$/,
  //   },
  //   {
  //     name: "email",
  //     input: document.getElementById("emailInput"),
  //     icon: document.getElementById("emailIcon"),
  //   },
  //   {
  //     name: "age",
  //     input: document.getElementById("ageInput"),
  //     icon: document.getElementById("ageIcon"),
  //   },
  //   {
  //     name: "postalCode",
  //     input: document.getElementById("postalCodeInput"),
  //     icon: document.getElementById("postalCodeIcon"),
  //   },
  //   {
  //     name: "phoneNumber",
  //     input: document.getElementById("phoneNumberInput"),
  //     icon: document.getElementById("phoneNumberIcon"),
  //   },
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

inputObjs.forEach((obj) => {
  obj.input.addEventListener("input", () => {
    obj.updateValue(); // So input value is updated dynamically

    // If input passes regex test
    if (obj.regex.test(obj.value)) {
      // Update input color
      obj.input.classList.remove(...badInputClassList);
      obj.iconDiv.classList.remove(...badInputClassList);

      obj.input.classList.add(...goodInputClassList);
      obj.iconDiv.classList.add(...goodInputClassList);

      obj.icon.classList.remove("bi-person-fill-exclamation");
      obj.icon.classList.remove("bi-person-dash-fill");
      obj.icon.classList.add("bi-person-check-fill");
    } else {
      obj.input.classList.remove(...goodInputClassList);
      obj.iconDiv.classList.remove(...goodInputClassList);

      obj.input.classList.add(...badInputClassList);
      obj.iconDiv.classList.add(...badInputClassList);

      obj.icon.classList.remove("bi-person-check-fill");
      obj.icon.classList.add("bi-person-fill-exclamation");
    }
  });
});

// inputs.forEach((input) => {
//   input.addEventListener("input", () => {
//     console.log("fire");
//     if (nameregex.test(fName)) {
//       input.className = "form-control border border-3 border-success";
//       icon;
//     } else {
//       input.className = "form-control";
//     }
//   });
// });

// Make the emoji's to the left of inputs an 'x', and then when the user enters a valid input, make it a green check

console.log("working");
formBtn.addEventListener("click", () => {
  if (nameRegex.test(fName)) console.log("first name valid");
  if (nameRegex.test(lName)) console.log("last name valid");

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
