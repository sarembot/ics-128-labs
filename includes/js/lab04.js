"use strict";
console.log("working");
const display = document.getElementById("display");

display.addEventListener("click", (e) => {
  const singleBtn = document.getElementById("singleBtn");
  const doubleBtn = document.getElementById("doubleBtn");
  const penthouseBtn = document.getElementById("penthouseBtn");

  // Modal objects from DOM element
  const singleModal = new bootstrap.Modal(
    document.getElementById("singleModal")
  );
  console.log(singleModal);
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

let roomTypes = [
  {
    type: "Standard",
    description: "Single bed in 36-bed dorm",
    price: "$159",
    image: "/images/lab04/lab04_singlebed.jpg",
    button: "singleBtn",
    modal: "singleModal",
  },
  {
    type: "Double",
    description: "Private bunk beds",
    price: "$229",
    image: "/images/lab04/lab04_doublebed.jpg",
    button: "doubleBtn",
    modal: "doubleModal",
  },
  {
    type: "Penthouse",
    description: ["King Size Bed", "Bar", "Jacuzzi"], // use join() when displaying - maybe ternary operator in the innerHTML
    price: "$359",
    image: "/images/lab04/lab04_penthouse.jpg",
    button: "penthouseBtn",
    modal: "penthouseModal",
  },
];

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
        <p>${obj.description}</p>
        <p>${obj.price}</p>

        <button id=${
          obj.button
        } type="button" class="btn btn-primary" data-toggle="modal" data-target="#${
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
              <button
                type="button"
                class="close"
                data-dismiss="#${obj.modal}"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
                <p>Please review your order below</p> 
                <p class="fs-3">${obj.type} ${
    obj.type == "Penthouse" ? "suite" : "room"
  } for ${obj.price}</p> 
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>       
                <form action="/lab04_landing.html" method="post">
                    <input type="submit" name="confirm" value="Confirm" class="btn btn-primary">
                </form>

            </div>
          </div>
        </div>
    </div>
</div>

`;
}

for (let item of roomTypes) {
  constructRoomDiv(item);
}
