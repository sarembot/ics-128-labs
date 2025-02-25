// Mitchell Saremba - ICS128 LAB06 - Feb. 2025
const display = document.getElementById("display");

// Hotel ----------------------------------------
class Hotel {
  constructor(name, city, rooms, gym) {
    this._name = name;
    this._city = city;
    this._rooms = rooms;
    this._gym = gym;

    this._booked = 0;
    this.restaurants = new Map();
  }

  // Keep track of remaining rooms
  get availableRooms() {
    return this._rooms - this._booked;
  }

  // Updates available rooms in DOM after bookings/cancellations
  updateBookedP = (p) => {
    // If space available - green text. If full - red text
    p.className = "text-success";
    if (this._booked >= this._rooms) p.className = "text-danger";

    p.innerText = `There are ${this.booked} / ${this.rooms} rooms booked.`;
  };

  bookRoom() {
    if (this._booked < this._rooms) this._booked += 1;

    return `Booking completed. There are ${this.availableRooms} rooms remaining.`;
  }

  cancelRoom() {
    if (this._booked > 0) this._booked -= 1;

    return `Booking removed. There are ${this.availableRooms} remaining.`;
  }

  // Getters
  get name() {
    return this._name;
  }

  get city() {
    return this._city;
  }

  get rooms() {
    return this._rooms;
  }

  get gym() {
    return this._gym;
  }

  get booked() {
    return this._booked;
  }

  // Setters
  set name(name) {
    this._name = name;
  }

  set city(city) {
    this._city = city;
  }

  set rooms(rooms) {
    this._rooms = rooms;
  }

  set gym(gym) {
    this._gym = gym;
  }

  set booked(booked) {
    this._booked = booked;
  }
}

// Create new hotel
let hotel = new Hotel("Hotel Motel", "Bangkok", 15, true);

// Add some extra attributes
hotel.roomTypes = ["Single", "Double", "Penthouse"];
hotel.swimmingPool = true;
hotel.airportShuttle = false;

// Add values to restaurants map
hotel.restaurants.set("Burger King", "American");
hotel.restaurants.set("McDonalds", "American");
hotel.restaurants.set("Lotto", "Vietnamese");

// Interpolate hotel information into bootstrap card
const hotelInfoHTML = `
<div class="card p-3">
 <h2 class="text-center">${hotel.name}</h2>
 <p>The <strong>${hotel.name}</strong> located in <strong>${
  hotel.city
}</strong>.</p>
 
 <p>The available room types are: <strong>${hotel.roomTypes.join(
   ", "
 )}</strong></p>
 
 <p><strong>Hotel has a shuttle?</strong> ${
   hotel.airportShuttle ? "Yes" : "No"
 }</p>
 <p><strong>Hotel has a swimming pool?</strong> ${
   hotel.swimmingPool ? "Yes" : "No"
 }</p>
 
 <p ><strong>Hotel has 3 restaurants each with a different theme:</strong></p>
 <ol id="restaurantList">
 </ol>

 <p id="hotelBookedP" class="text-success">There are ${hotel.booked} / ${
  hotel.rooms
} rooms booked.</p>

 <button id="hotelBookRoomBtn" class="btn btn-primary m-2">Book Room</button>
 <button id="hotelCancelRoomBtn" class="btn btn-danger m-2">Cancel Room</button>
</div>
<div>
  <button id="sisterResortBtn" class="btn btn-primary m-2">See Our Sister Resort</button>
</div>

`;

// Add info to DOM
display.innerHTML = hotelInfoHTML;
addHotelMapItemsToList();

// Formats Map items into HTML list in hotelInfoHTML
function addHotelMapItemsToList() {
  for (let [key, value] of hotel.restaurants) {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${key}</strong> / Type / <strong>${value}</strong>`;
    document.getElementById("restaurantList").appendChild(li);
  }
}

// Resort ----------------------------------------
class Resort extends Hotel {
  constructor(name, city, rooms, gym, resortType, beachFront, kidsClub) {
    super(name, city, rooms, gym);

    this._resortType = resortType;
    this._beachFront = beachFront;
    this._kidsClub = kidsClub;
  }

  // Getters
  get resortType() {
    return this._resortType;
  }
  get beachFront() {
    return this._beachFront;
  }
  get kidsClub() {
    return this._kidsClub;
  }

  // Setters
  set resortType(resortType) {
    this._resortType = resortType;
  }

  set beachFront(beachFront) {
    this._beachFront = beachFront;
  }

  set kidsClub(kidsClub) {
    this._kidsClub = kidsClub;
  }
}

// Create new instance of resort
let resort = new Resort(
  "Riviera",
  "Prince George",
  4,
  false,
  "Cheap Motel",
  false,
  false
);

// Interpolate resort info into bootstrap card
const resortInfoHTML = `
<div id="resortDisplay" class="card p-3">
 <h2 class="text-center">${resort.name}</h2>
 <p>The <strong>${resort.name}</strong> resort located in <strong>${
  resort.city
}</strong>.</p>
  <p><strong>What kind of resort is it?</strong> ${resort.resortType}</p> 
 <p><strong>Is it on the beach?</strong> ${resort.beachFront ? "Yes" : "No"}</p>
 <p><strong>Does it have a kids club?</strong> ${
   resort.kidsClub ? "Yes" : "Definitely Not"
 }</p>
 

 <p id="resortBookedP" class="text-success">There are ${resort.booked} / ${
  resort.rooms
} rooms booked.</p>

 <button id="resortBookRoomBtn" class="btn btn-primary m-2">Book Room</button>
 <button id="resortCancelRoomBtn" class="btn btn-danger m-2">Cancel Room</button>
</div>
<div>
  <button id="returnToHotelBtn" class="btn btn-primary m-2">Return to Hotel</button>
</div>
  `;

// EVENTS ------------------------------------------
// All events handled in this listener... seems kinda greasy to me but it does what I want
display.addEventListener("click", (e) => {
  const hotelBookRoomBtn = document.getElementById("hotelBookRoomBtn");
  const hotelCancelRoomBtn = document.getElementById("hotelCancelRoomBtn");
  const resortBookRoomBtn = document.getElementById("resortBookRoomBtn");
  const resortCancelRoomBtn = document.getElementById("resortCancelRoomBtn");
  const sisterResortBtn = document.getElementById("sisterResortBtn");
  const returnToHotelBtn = document.getElementById("returnToHotelBtn");

  // Book room at resort
  if (e.target === resortBookRoomBtn) {
    resort.bookRoom();
    resort.updateBookedP(resortBookedP);

    // Cancel room at resort
  } else if (e.target === resortCancelRoomBtn) {
    resort.cancelRoom();
    resort.updateBookedP(resortBookedP);

    // Book room at hotel
  } else if (e.target === hotelBookRoomBtn) {
    hotel.bookRoom();
    hotel.updateBookedP(hotelBookedP);

    // Cancel room at hotel
  } else if (e.target === hotelCancelRoomBtn) {
    hotel.cancelRoom();
    hotel.updateBookedP(hotelBookedP);

    // Show resort info
  } else if (e.target === sisterResortBtn) {
    display.innerHTML = resortInfoHTML;
    resort.updateBookedP(resortBookedP);

    // Show hotel info
  } else if (e.target === returnToHotelBtn) {
    display.innerHTML = hotelInfoHTML;
    addHotelMapItemsToList(); // Need to reload restaurants into DOM
    hotel.updateBookedP(hotelBookedP);
  }
});
