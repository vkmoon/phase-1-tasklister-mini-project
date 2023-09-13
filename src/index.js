document.addEventListener("DOMContentLoaded", () => {
  let form = document.querySelector("#create-task-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    inputToDo(e.target.querySelector("#new-task-description").value, e.target.priority_level.value, e.target.inputDate.value);
    form.reset()
  })
})

function inputToDo(todo, color, input) {
  let li = document.createElement("li");
  let btn = document.createElement("button");
  btn.addEventListener("click", handleDelete)
  btn.textContent = "x";
  li.textContent = `${todo }` + " " + input ;
  li.style = "color:" + color;
  li.appendChild(btn);
  document.querySelector("#tasks").appendChild(li);
  orderList()
  dateInput()
}

function handleDelete(e) {
  e.target.parentNode.remove()
}

const priorityMap = {
  "green": 3,
  "yellow": 2,
  "red": 1   
}
function orderList () {
  let list = document.getElementById('tasks');
  let items = list.childNodes;
  let itemsArr = [];
  
  for (var i in items) {
    if (items[i].nodeType == 1) { // get rid of the whitespace text nodes
        itemsArr.push(items[i]);
    }
}

  itemsArr.sort(function(a, b) {
    let styleColorA = a.style.color;
    let styleColorB = b.style.color;
    let priorityA = priorityMap[styleColorA];
    let priorityB = priorityMap[styleColorB];
    return priorityA == priorityB
            ? 0
            : (priorityA > priorityB ? 1 : -1);
  });

  for (i = 0; i < itemsArr.length; ++i) {
    list.appendChild(itemsArr[i]);
  }
}

function dateInput() {
  let input = document.getElementById("inputDate");
  return input;
}