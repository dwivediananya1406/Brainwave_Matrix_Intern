const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
  if (inputBox.value === '') {
    alert("You must write something!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);

    let span = document.createElement("span");
    span.innerHTML = '\u00d7'; // Unicode for × (delete button)
    li.appendChild(span);

    saveData(); // Save only after adding
  }

  inputBox.value = ''; // Clear input after adding
}

// Handle clicks for checking or deleting
listContainer.addEventListener("click", function (e) {
  if (e.target.tagName === 'LI') {
    e.target.classList.toggle("checked");
    saveData();
  } else if (e.target.tagName === 'SPAN') {
    e.target.parentElement.remove();
    saveData();
  }
}, false);

// Save current list to localStorage
function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

// Show tasks from localStorage
function showTask() {
  listContainer.innerHTML = localStorage.getItem("data") || '';
}

showTask();
