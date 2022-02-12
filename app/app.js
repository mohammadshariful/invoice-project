// common function for every elements
// get element
function getElement(id) {
  return document.getElementById(id);
}
// create element
function createElement(elmtName) {
  return document.createElement(elmtName);
}
// get input field value
function getInputValue(inputField) {
  const input = document.getElementById(inputField);
  const inputValue = input.value;
  input.value = "";
  return inputValue;
}

// sumbmit user infomation
const submitBtn = getElement("buyer-details-btn");
submitBtn.addEventListener("click", function () {
  const userData = getInputValue("buyer-details-info");
  const userDetails = getElement("user-details");
  const p = createElement("p");
  p.innerText = userData;
  userDetails.appendChild(p);
});
// Set date
const date = new Date();
const showDate = getElement("show-date");
showDate.innerText = date.toLocaleDateString();

// items add function
const addBtn = getElement("addBtn");
addBtn.addEventListener("click", addItems);

// add items function
function addItems(e) {
  e.preventDefault();
  const errMsg = getElement("erorr");
  const itemsName = getInputValue("items-name");
  const itemsPrice = +getInputValue("items-price");
  const itemsQuantity = +getInputValue("items-quantity");
  // conditonal checking
  if (itemsName == "" || itemsPrice == "" || itemsQuantity == "") {
    errMsg.style.display = "block";
    errMsg.innerText = "Input field doesn't empty";
  } else if (
    Number.isNaN(itemsName) ||
    Number.isNaN(itemsPrice) ||
    Number.isNaN(itemsQuantity)
  ) {
    errMsg.style.display = "block";
    errMsg.innerText = "Please enter currect value";
  } else {
    errMsg.style.display = "none";
    createAndAppendChild(itemsName, itemsPrice, itemsQuantity);
  }
}

// add items appenChild on the table function
function createAndAppendChild(itemsName, itemsPrice, itemsQuantity) {
  const tableContainer = getElement("table-container");
  const tr = createElement("tr");
  const name = createElement("td");
  const price = createElement("td");
  const quantity = createElement("td");
  const total = createElement("td");
  total.classList.add("totals");
  name.innerText = itemsName;
  price.innerText = itemsPrice;
  quantity.innerText = itemsQuantity;

  tr.appendChild(name);
  tr.appendChild(price);
  tr.appendChild(quantity);
  let totalPrice = ItemstotalPrice(price, quantity);
  total.innerText = totalPrice;
  tr.appendChild(total);
  tableContainer.appendChild(tr);

  let subTotalPrices = subTotal();
  let taxTotalPrices = tax();

  grandTotal(subTotalPrices, taxTotalPrices);
}
// total prices
function ItemstotalPrice(price, quantity) {
  const itemsPrice = parseInt(price.innerText);
  const itemsQuantity = parseInt(quantity.innerText);
  const totalPrice = itemsPrice * itemsQuantity;
  return totalPrice;
}
// subtotals function
function subTotalCalulate() {
  const itemsPrice = document.getElementsByClassName("totals");
  let sum = 0;
  for (let total of itemsPrice) {
    const itemsTotalPrices = parseInt(total.innerText);
    sum += itemsTotalPrices;
  }
  return sum;
}

function subTotal() {
  const subPrice = getElement("sub-total");
  const subTotalPrices = subTotalCalulate();
  subPrice.innerText = subTotalPrices;
  return subPrice.innerText;
}

// tax function
function tax() {
  const taxEl = getElement("tax");
  const subTotalPrices = subTotalCalulate();
  // 20% tax
  taxEl.innerText = subTotalPrices * 0.2;
  return taxEl.innerText;
}

// grand total function
function grandTotal(subTotalPrice, taxToalPrice) {
  const grandTotalPrices = getElement("grand-total");
  const totalPriceAll = +subTotalPrice + +taxToalPrice;
  grandTotalPrices.innerText = totalPriceAll;
  toalAmount(grandTotalPrices.innerText);
}
// total amount
function toalAmount(amount) {
  const totalAmount = getElement("total-amount");
  totalAmount.innerText = amount;
}
