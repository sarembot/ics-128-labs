// ICS-128 LAB01 - Mitchell Saremba

const block = document.getElementById("block");
const helloDiv = document.getElementById("hello");

// GET USER INPUT
const name = prompt("Enter your name: ", "Billy Bob");
let amount = strictprompt("amount");
let taxRate = strictprompt("tax rate");
let rooms = strictprompt("number of rooms needed");

// DISPLAY OUTPUT
helloDiv.innerHTML = `Welcome, ${name}. Nice to see you again.`;

const total = parseFloat(
  amount * rooms + (amount * rooms * taxRate) / 100
).toFixed(2); // I had some more brackets in here but formatter threw them out

const table = document.createElement("table"); // create results table
table.classList.add(
  "table",
  "table-bordered",
  "mt-3",
  "table-hover",
  "table-responsive-md"
);
document.getElementById("table").appendChild(table); // add to DOM

table.innerHTML = `
<caption>Results for ${name}</caption>
<thead class="thead-dark">
<tr>
<th colspan="2" class="table-active text-center">
Here are your results:
</th>
</tr>
</thead>
<tbody>
<tr>
<th>Amount:</th>
<td>$${parseFloat(amount).toFixed(2)}</td>
</tr>
<tr>
<th>Tax Rate:</th>
<td>${taxRate}%</td>
</tr>
<tr>
<th># of Rooms:</th>
<td>${rooms}</td>
</tr>
<tr>
<th>Total Amount:</th>
<td>$${total}</td>
</tr>
</tbody>
`;

// if val user enter is not a number, call the fn again
// if user enters a number, return it
// TODO: let user cancel the prompt
function strictprompt(str) {
  val = parseInt(prompt(`Enter ${str}: `));

  if (isNaN(val)) {
    alert("Please enter a number");
    // console.log(`Calling strictprompt(${str})`);
    strictprompt(str);
  }
  // console.log(`Return: val=${val} type=${typeof val}`);
  return val;
}
