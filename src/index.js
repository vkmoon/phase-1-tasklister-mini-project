document.addEventListener("DOMContentLoaded", () => {
  
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    inputToDo(e.target.querySelector("#new-task-description").value, e.target.priority_level.value);
    form.reset()
  })
})

let form = document.querySelector("#create-task-form");

function inputToDo(todo, color) {
  let li = document.createElement("li");
  li.textContent = `${todo}   `;
  document.querySelector("#tasks").appendChild(li);
  deleteButton(li);
  priorityColor(li, color);
  prioritySort();
}

function deleteButton(li) {
  let deleteBtn = document.createElement("button");
  deleteBtn.addEventListener("click", handleComplete());
  deleteBtn.textContent = "Completed";
  li.appendChild(deleteBtn);
}

function handleComplete(e) {
  e.target.parentNode.remove();
}

function prioritySort() {
  const priorityMap = {
    "green": 3,
    "yellow":2,
    "red": 1
  }
  let list = document.getElementById("tasks");
  let items = list.childNodes;
  let itemsArr = [];

  for (let i in items) {
    if (items[i].nodeType === 1) {
      itemsArr.push(items[i]);
    }
  }
  itemsArr.sort(function (a, b) {
    let styleColorA = a.style.color;
    let styleColorB = b.style.color;
    let priorityA = priorityMap[styleColorA];
    let priorityB = priorityMap[styleColorB];
    return priorityA === priorityB
    ? 0
    : (priorityA > priorityB ? 1 : -1);
  });
  for (i = 0; i < itemsArr.length; ++i) {
    list.appendChild(itemsArr[i]);
  }
}

function priorityColor(li, color){
  li.style = "color:" + color;
}