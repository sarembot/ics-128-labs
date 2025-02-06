// Mitchell Saremba - ICS 128 LAB04
"use strict";
const display = document.getElementById("display");

class Room {
  constructor(type, description, price, image) {
    // Basic info
    this.type = type;
    this.description = description;
    this.price = price;
    this.image = image;

    // Custom ID's for innerHTML
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

roomTypes.forEach((obj) => {
  constructRoomDiv(obj);
});

// Build bootstrap card & modal using Room obj attributes
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
}

// Modal triggering buttons for room divs
display.addEventListener("click", (e) => {
  const singleBtn = document.getElementById("singleBtn");
  const doubleBtn = document.getElementById("doubleBtn");
  const penthouseBtn = document.getElementById("penthouseBtn");

  // Turn bootstrap modals from DOM into JS objects
  const singleModal = new bootstrap.Modal(
    document.getElementById("singleModal")
  );

  const doubleModal = new bootstrap.Modal(
    document.getElementById("doubleModal")
  );

  const penthouseModal = new bootstrap.Modal(
    document.getElementById("penthouseModal")
  );

  // If singleBtn clicked
  if (e.target === singleBtn) {
    singleModal.show(); // bring up modal
  } else if (e.target === doubleBtn) {
    doubleModal.show();
  } else if (e.target === penthouseBtn) {
    penthouseModal.show();
  }
});


// Add rows to table
const table = document.getElementById("table");
const tableBtn = document.getElementById("tableBtn");

let row = 1; // Keep track of latest row
tableBtn.addEventListener("click", () => {
  row += 1;
  table.innerHTML += `
    <tr>
      <td>Row ${row} Cell 1</td>
      <td>Row ${row} Cell 2</td>
    </tr>
  `;
});
