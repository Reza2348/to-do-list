let formElement = document.querySelector(".form");
let todolistElement = document.querySelector(".todo-list");

let todoList = [];

formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputteaVatue = e.target.elements["input-add-todo"].value;

  if (!inputteaVatue) {
    return;
  }

  const todo = {
    id: new Date().getTime().toString(),
    todo: inputteaVatue,
  };
  console.log(todo);
  createTodo(todo);
  formElement.reset();
});

todolistElement.addEventListener("click", (e) => {
  const deletBtnElement = e.target.closest(".todo-item-delete-btn");

  if (!deletBtnElement) {
    return;
  }

  const currentTodoItemElement = deletBtnElement.parentElement;
  deleteTodo(currentTodoItemElement.id);
  currentTodoItemElement.remove();
});

const createTodo = (todo) => {
  todoList.push(todo);
  localStorage.setItem("todo-list", JSON.stringify(todoList));
  createTodoItem(todo);
};

const createTodoItem = ({ todo, id }) => {
  const todoItem = ` <li id=${id} class="todo-item">
          <p>${todo}</p>
          <button class="todo-item-delete-btn">
            <i class="ri-close-large-line"></i>
          </button>
        </li>`;

  todolistElement.insertAdjacentHTML("beforeend", todoItem);
};

const deleteTodo = (id) => {
  const updatedTodo = todoList.filter((todo) => todo.id !== id);
  todoList = updatedTodo;
  localStorage.setItem("todo-list", JSON.stringify(todoList));
};

const init = () => {
  const attTodo = JSON.parse(localStorage.getItem("todo-list") || []);
  todoList = attTodo;

  todoList.forEach((todo) => createTodoItem(todo));
};

window.addEventListener("DOMContentLoaded", init);
