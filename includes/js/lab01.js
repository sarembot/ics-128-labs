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

const total = parseInt(amount * (taxRate / 100) + amount * rooms);
// console.log(total);

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
<td>$${amount}</td>
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

// TODO: Allow user to cancel prompt
function strictprompt(str) {
  val = parseInt(prompt(`Enter ${str}: `));
  console.log(val);
  if (isNaN(val)) {
    alert("Please enter a number");
    console.log(`Calling strictprompt(${str})`);
    strictprompt(str);
  }
  console.log(`Return: val=${val} type=${typeof val}`);
  return val;
}
