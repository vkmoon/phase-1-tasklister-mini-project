document.addEventListener("DOMContentLoaded", () => {
  let form = document.querySelector("#create-task-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    inputToDo(e.target.querySelector("#new-task-description").value, e.target.priority_level.value, e.target.date.value);
    form.reset();
  })
})

function inputToDo(task, color, date) {
  let li = document.createElement("li");
  let newDate = formatDate(date);
  let label = document.createElement("label");
  label.innerText = `${task} ${newDate}  `;
  li.appendChild(label);
  document.querySelector("#tasks").appendChild(li);
  editTodo(li);
  completeButton(li);
  priorityColor(li, color);
  prioritySort();
};

function completeButton(li) {
  let completeBtn = document.createElement("button");
  completeBtn.addEventListener("click", handleComplete);
  completeBtn.textContent = "Completed";
  li.appendChild(completeBtn);
}

function handleComplete(e) {
  let li = e.target.parentNode;
  e.target.parentNode.remove();
  document.querySelector("#tasks2").appendChild(li);
  document.querySelector("button").remove();
  document.querySelector("button").remove();
  
  let isEditMode = li.classList.contains("editMode");
  
  if (isEditMode) {
    let editInput = li.querySelector("input[type=text]");
    let label = li.querySelector("label");
    label.innerText = editInput.value;
    li.classList.toggle("editMode");
  }
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

function formatDate(date){
  let newDate = new Date(date);
  newDate.setHours(newDate.getHours() + 7);
  let formattedDate = `${newDate.getMonth() + 1}/${newDate.getDate()}/${newDate.getFullYear()}`;
  return formattedDate;
}

function editTodo(li){
  let editInput = document.createElement("input");
  let editButton = document.createElement("button");
  editInput.type = "text";
  editButton.innerText = "Edit";
  editButton.className = "edit";
  li.appendChild(editInput);
  li.appendChild(editButton);
  
  let editTask = function() {
    let listItem = this.parentNode;
    let editInput = listItem.querySelector("input[type=text]");
    let label = listItem.querySelector("label");
    let containsClass = listItem.classList.contains("editMode");
    if (containsClass) {
        label.innerText = editInput.value;
        editButton.innerText = "Edit";
    } else {
        editInput.value = label.innerText;
        editButton.innerText = "Save";
    }
    listItem.classList.toggle("editMode");
  }
  editButton.onclick = editTask;
}