// Mitchell Saremba - ICS 128 LAB04

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

let roomTypes = [
  new Room(
    "Single",
    "Single bed in 36-bed dorm",
    "$159",
    "/images/lab04/lab04_singlebed.jpg"
  ),
  new Room(
    "Double",
    "Private bunk beds",
    "$229",
    "/images/lab04/lab04_doublebed.jpg"
  ),
  new Room(
    "Penthouse",
    ["King Size Bed", "Bar", "Jacuzzi"],
    "$359",
    "/images/lab04/lab04_penthouse.jpg"
  ),
];

// For each type of room, create a div w/ info and add it to DOM
roomTypes.forEach((obj) => {
  constructRoomDiv(obj);
});

function constructRoomDiv(obj) {
  display.innerHTML += `

  <div class="card my-3 border border-3 border-secondary bg-secondary bg-opacity-10 hotel-div">
  <div class="row p-2 g-0 d-flex align-items-center">
    <div class="col-sm-6">
      <img src="${
        obj.image
      }" alt="Description" class="img-fluid w-100 rounded border border-black border-1 ">
    </div>
    <div class="col-sm-6 my-0">
      <div class="card-body p-2 px-3">
        <h3 class="card-title p-0 my-1">${obj.type}</h3>
        <hr class="border border-secondary mx-auto p-0 m-1">
        <p class="card-text lh-1">
          ${
            Array.isArray(obj.description)
              ? obj.description.join("<br></br>")
              : obj.description
          }
        </p>
        <p class="card-text">${obj.price}</p>
        <button id="${
          obj.button
        }" type="button" class="btn btn-secondary border border-black border-1" data-toggle="modal" data-target="#${
    obj.modal
  }">
          Book Room
        </button>
      </div>
    </div>
  </div>
</div>

<!-- Modal -->
<div class="modal fade" id="${
    obj.modal
  }" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Confirm Your Stay</h5>
      </div>
      <div class="modal-body">
        <p>Please review your order below</p>
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
  
  `;

  // display.innerHTML += `
  // <div class="row d-flex align-items-center my-3 p-2 border border-secondary bg-light rounded">
  // <div class="col-sm-6">
  // <img src="${
  //   obj.image
  // }" alt="Description" class="img-fluid rounded border-black border-2">
  //   </div>
  //   <div class="col-sm-6">
  //   <h3>${obj.type}</h3>
  //   <hr class="border border-secondary mx-auto">
  //   <p class="lh-1">${
  //     // If description is an array, display items like a list
  //     Array.isArray(obj.description)
  //       ? obj.description.join(`<br></br>`)
  //       : obj.description
  //   }</p>
  //   <p>${obj.price}</p>

  //   <button id=${
  //     obj.button
  //   } type="button" class="btn btn-secondary" data-toggle="modal" data-target="#${
  //   obj.modal
  // }">
  //       Book Room
  //       </button>
  //       </div>

  //       <div
  //       class="modal fade"
  //       id=${obj.modal}
  //       tabindex="-1"
  //       role="dialog"
  //       aria-labelledby="exampleModalCenterTitle"
  //       aria-hidden="true"
  //       >
  //       <div class="modal-dialog modal-dialog-centered" role="document">
  //       <div class="modal-content">
  //       <div class="modal-header">
  //       <h5 class="modal-title" id="exampleModalLongTitle">Confirm Your Stay</h5>
  //       </div>
  //       <div class="modal-body">
  //       <p>Please review your order below</p>
  //       <p class="fs-3">${obj.type} ${
  //   // if type is penthouse, use suite instead of room
  //   obj.type == "Penthouse" ? "suite" : "room"
  // } for ${obj.price}</p>
  //           </div>
  //           <div class="modal-footer">
  //           <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
  //           <form action="/lab04_landing.html" method="get">
  //           <input type="submit" name="confirm" value="Confirm" class="btn btn-primary">
  //           </form>

  //           </div>
  //           </div>
  //           </div>
  //           </div>
  //           </div>

  //           `;
}

// Booking button event listeners
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

  // if singleBtn clicked
  if (e.target === singleBtn) {
    singleModal.show(); // bring up confirmation modal
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
