document.addEventListener("DOMContentLoaded", () => {
  let form = document.querySelector("#create-task-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    inputToDo(e.target.querySelector("#new-task-description").value, e.target.priority_level.value, e.target.date.value);
    form.reset()
  })
})

function inputToDo(task, color, date) {
  let li = document.createElement("li");
  let newDate = formatDate(date)
  li.textContent = `${task} ${newDate}  `;
  document.querySelector("#tasks").appendChild(li);
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

}

function completedList(){

}

