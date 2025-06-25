const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const taskCounter = document.getElementById("task-counter");
const filterButtons = document.querySelectorAll(".filter-btn");

function addTask() {
  if (inputBox.value.trim() === '') {
    alert("You must write something!");
    return;
  }

  const li = document.createElement("li");
  li.innerHTML = `${inputBox.value} <span>\u00d7</span>`;
  li.setAttribute("data-time", new Date().toLocaleString());
  listContainer.appendChild(li);

  saveData();
  updateCounter();
  inputBox.value = '';
}

listContainer.addEventListener("click", function (e) {
  if (e.target.tagName === 'LI') {
    e.target.classList.toggle("checked");
    saveData();
    updateCounter();
  } else if (e.target.tagName === 'SPAN') {
    e.target.parentElement.remove();
    saveData();
    updateCounter();
  }
}, false);

inputBox.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

function saveData() {
  localStorage.setItem("tasks", listContainer.innerHTML);
}

function showTask() {
  listContainer.innerHTML = localStorage.getItem("tasks") || '';
  updateCounter();
}

function updateCounter() {
  const tasks = listContainer.querySelectorAll("li");
  const completed = listContainer.querySelectorAll("li.checked").length;
  taskCounter.textContent = `Total Tasks: ${tasks.length} | Completed: ${completed}`;
}

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.id;
    const tasks = listContainer.querySelectorAll("li");
    tasks.forEach(task => {
      switch (filter) {
        case "show-all":
          task.style.display = "block";
          break;
        case "show-pending":
          task.style.display = task.classList.contains("checked") ? "none" : "block";
          break;
        case "show-completed":
          task.style.display = task.classList.contains("checked") ? "block" : "none";
          break;
      }
    });
  });
});

showTask();
