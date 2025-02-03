"use strict";
const display = document.getElementById("display");
const tableBtn = document.getElementById("tableBtn");
const table = document.getElementById("table");

class Room {
  constructor(type, description, price, img) {
    this.type = type;
    this.description = description;
    this.price = price;
    this.image = img;
    this.button = `${this.type.toLowerCase()}Btn`;
    this.modal = `${this.type.toLowerCase()}Modal`;
  }
}

class Suite extends Room {
  constructor() {}
}

let standardRoom = new Room(
  "Standard",
  "Single bed in 36-bed dorm",
  "$159",
  "/images/lab04/lab04_singlebed.jpg"
);

let doubleRoom = new Room(
  "Double",
  "Private bunk beds",
  "$229",
  "/images/lab04/lab04_doublebed.jpg"
);

let penthouseRoom = new Room(
  "Penthouse",
  ["King Size Bed", "Bar", "Jacuzzi"],
  "359",
  "/images/lab04/lab04_penthouse.jpg"
);

let roomTypes = [standardRoom, doubleRoom, penthouseRoom];

// let roomTypes = [
//   {
//     type: "Standard",
//     description: "Single bed in 36-bed dorm",
//     price: "$159",
//     image: "/images/lab04/lab04_singlebed.jpg",
//     button: "singleBtn",
//     modal: "singleModal",
//   },
//   {
//     type: "Double",
//     description: "Private bunk beds",
//     price: "$229",
//     image: "/images/lab04/lab04_doublebed.jpg",
//     button: "doubleBtn",
//     modal: "doubleModal",
//   },
//   {
//     type: "Penthouse",
//     description: ["King Size Bed", "Bar", "Jacuzzi"], // use join() when displaying - maybe ternary operator in the innerHTML
//     price: "$359",
//     image: "/images/lab04/lab04_penthouse.jpg",
//     button: "penthouseBtn",
//     modal: "penthouseModal",
//   },
// ];

roomTypes.forEach((obj) => {
  constructRoomDiv(obj);
});

function constructRoomDiv(obj) {
  display.innerHTML += `
  <div class="row d-flex align-items-center my-3 p-2 border border-secondary bg-light rounded">
  <div class="col-sm-6">
  <img src="${
    obj.image
  }" alt="Description" class="img-fluid rounded border-black border-2">
    </div>
    <div class="col-sm-6">
    <h3>${obj.type}</h3>
    <hr class="border border-secondary mx-auto">
    <p class="lh-1">${
      Array.isArray(obj.description) // If description is an array, display items like a list
        ? obj.description.join(`<br></br>`)
        : obj.description
    }</p>
    <p>${obj.price}</p>
    
    <button id=${
      obj.button
    } type="button" class="btn btn-secondary" data-toggle="modal" data-target="#${
    obj.modal
  }">
        Book Room 
        </button>
        </div>
        
        <div
        class="modal fade"
        id=${obj.modal}
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
        >
        <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
        <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Confirm Your Stay</h5>
        </div>
        <div class="modal-body">
        <p>Please review your order below</p> 

        <!-- Uses's 'suite' for penthouse, 'room' for other types -->
        <p class="fs-3">${obj.type} ${
    obj.type == "Penthouse" ? "suite" : "room"
  } for ${obj.price}</p> 
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>       
            <form action="/lab04_landing.html" method="get">
            <input type="submit" name="confirm" value="Confirm" class="btn btn-primary">
            </form>
            
            </div>
            </div>
            </div>
            </div>
            </div>
            
            `;
}

display.addEventListener("click", (e) => {
  const singleBtn = document.getElementById("singleBtn");
  const doubleBtn = document.getElementById("doubleBtn");
  const penthouseBtn = document.getElementById("penthouseBtn");

  // Construct modal objects from DOM element
  const singleModal = new bootstrap.Modal(
    document.getElementById("singleModal")
  );

  const doubleModal = new bootstrap.Modal(
    document.getElementById("doubleModal")
  );

  const penthouseModal = new bootstrap.Modal(
    document.getElementById("penthouseModal")
  );

  console.log(e.target);
  if (e.target === singleBtn) {
    singleModal.show();
    console.log("single");
  } else if (e.target === doubleBtn) {
    doubleModal.show();
  } else if (e.target === penthouseBtn) {
    penthouseModal.show();
  }
});

// Add rows to table
let rowCount = 1;
tableBtn.addEventListener("click", () => {
  rowCount += 1;
  table.innerHTML += `
    <tr>
      <td>Row ${rowCount} Cell 1</td>
      <td>Row ${rowCount} Cell 2</td>
    </tr>
  `;
});
