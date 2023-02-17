let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveTodoButton = document.getElementById("saveTodoButton");


function getTodoListFromLocalStorage() {
    let stringifiedTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifiedTodoList);
    if (parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }
}
let todoList = getTodoListFromLocalStorage();
let todosCount = todoList.length;

saveTodoButton.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
};

function checkStatus(checkboxId, labelId, todoId) {
    let labelEl = document.getElementById(labelId);

    labelEl.classList.toggle("checked");

    let todoind = todoList.findIndex(function(eachtodo) {
        let eachid = "todo" + eachtodo.no;
        if (eachid === todoId) {
            return true;

        } else {
            return false;

        }
    });
    let todoObject = todoList[todoind];
    if (todoObject.isChecked === true) {
        todoObject.isChecked = false;
    } else {
        todoObject.isChecked = true;
    }
}

function removeTodo(todoId) {
    let todoElement = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);

    let deleteElementIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.no;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });

    todoList.splice(deleteElementIndex, 1);

}

function getTime() {
    let today = new Date();
    const formatAMPM = (date) => {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'pm' : 'am';
        hours %= 12;
        hours = hours || 12;
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        const strTime = `${hours}:${minutes} ${ampm}`;
        return strTime;
    };
    return (formatAMPM(today));

}

function createAddtodo(todo) {
    let checkboxId = "checkbox" + todo.no;
    let labelId = "label" + todo.no;
    let todoId = "todo" + todo.no;

    let listitemContainer = document.createElement("li");
    listitemContainer.classList.add("todo-item-container", "d-flex", "flex-row");
    listitemContainer.id = todoId;
    todoItemsContainer.appendChild(listitemContainer);

    let checkboxInput = document.createElement("input");
    checkboxInput.type = "checkbox";
    checkboxInput.id = checkboxId;
    checkboxInput.checked = todo.isChecked;
    checkboxInput.onclick = function() {
        checkStatus(checkboxId, labelId, todoId);
    };
    checkboxInput.classList.add("checkbox-input");
    listitemContainer.appendChild(checkboxInput);

    let listcont = document.createElement("div");
    listcont.classList.add("ml-3", "d-flex", "flex-row", "label-container");
    listitemContainer.appendChild(listcont);

    let labelEl = document.createElement("label");
    labelEl.setAttribute("for", checkboxId);
    labelEl.id = labelId;
    labelEl.classList.add("checkbox-label");
    if (todo.isChecked === true) {
        labelEl.classList.add("checked");
    }
    labelEl.textContent = todo.text;
    listcont.appendChild(labelEl);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    listcont.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIcon.onclick = function() {
        removeTodo(todoId);
    };
    deleteIconContainer.appendChild(deleteIcon);

    let timecont = document.createElement("p");
    timecont.textContent = todo.time;
    timecont.classList.add("time");
    listcont.appendChild(timecont);
}
addTodoButton.onclick = function() {
    let todoUserInput = document.getElementById("todoUserInput");
    let todoUserInputText = todoUserInput.value;
    if (todoUserInputText === "") {
        alert("Please enter valid task");
        return;
    }
    todosCount = todosCount + 1;
    let newTodo = {
        text: todoUserInputText,
        no: todosCount,
        isChecked: false,
        time: getTime()
    };
    todoList.push(newTodo);
    createAddtodo(newTodo);
    todoUserInput.value = "";
};
for (let todo of todoList) {
    createAddtodo(todo);
}
