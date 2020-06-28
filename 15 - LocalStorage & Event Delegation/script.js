const addItems = document.querySelector(".add-items");
const itemsList = document.querySelector(".plates");
const toggleAllBtn = document.querySelector("#toggleAll");
const deleteAllBtn = document.querySelector("#deleteAll");
const ITEMS_KEY = "items";

let items = JSON.parse(localStorage.getItem(ITEMS_KEY)) || [];

// handle add item
function addItem(e) {
  e.preventDefault();

  const text = this.querySelector("[name=item]").value;
  // create a item object
  const item = {
    text,
    done: false,
  };

  items.push(item);
  populateList(items, itemsList);

  // add the data to localstorage for persistance
  localStorage.setItem(ITEMS_KEY, JSON.stringify(items));

  // reset the form once done
  this.reset();
}

// populate list
function populateList(plates = [], platesList) {
  platesList.innerHTML = plates
    .map((item, index) => {
      return `
      <li>
        <input type="checkbox" id="item${index}" data-index=${index} ${
        item.done && "checked"
      } />
        <label for="item${index}">${item.text}</label>
      </li>
    `;
    })
    .join("");
}

// toggle checked
function toggleDone(e) {
  if (!e.target.matches("input")) return;
  const el = e.target;
  const { index } = el.dataset;

  items[index].done = !items[index].done;

  // update the data in localstorage
  localStorage.setItem(ITEMS_KEY, JSON.stringify(items));
  // rerender the list
  populateList(items, itemsList);
}

// toggle all
function toggleAll() {
  if (items.length === 0) return;

  let isAllChecked = false;

  if (this.dataset.status === "off") {
    isAllChecked = true;
    // update the status
    this.dataset.status = "on";
    // update the btn text
    this.textContent = "UnCheck All";
  } else {
    this.dataset.status = "off";
    // update the btn text
    this.textContent = "Check All";
  }

  // loop through the data and update the done prooperty
  items.forEach((item) => (item.done = isAllChecked));
  // update the data in localstorage
  localStorage.setItem(ITEMS_KEY, JSON.stringify(items));
  // rerender the list
  populateList(items, itemsList);
}

// delete all items
function deleteAll() {
  items = [];
  // update the data in localstorage
  localStorage.removeItem(ITEMS_KEY);
  // rerender the list
  populateList([], itemsList);
}

// get the value from input on submit
addItems.addEventListener("submit", addItem);
// attach an event listener to the parent item which is <ul>
itemsList.addEventListener("click", toggleDone);
// toggle all
toggleAllBtn.addEventListener("click", toggleAll);
// delete all
deleteAllBtn.addEventListener("click", deleteAll);

// populate the data on page load
populateList(items, itemsList);
