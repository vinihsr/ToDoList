// Seleção de elementos
const todoform = document.querySelector("#todo-form");
const todoinput = document.querySelector("#todo-input");
const editform = document.querySelector("#edit-Form");
const editinput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const searchForm = document.querySelector("#toolbar form");
const searchInput = document.querySelector("#search-input");
const outsideContent = document.getElementById("outside-content");

const savetodo = (text) => {
    const todo = document.createElement("div");
    todo.classList.add("todo");

    const todotitle = document.createElement("h3");
    todotitle.innerText = text;
    todo.appendChild(todotitle);

    const donebtn = document.createElement("button");
    donebtn.classList.add("finish-todo");
    donebtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(donebtn);

    const editbtn = document.createElement("button");
    editbtn.classList.add("edit-todo");
    editbtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    todo.appendChild(editbtn);

    const deletebtn = document.createElement("button");
    deletebtn.classList.add("remove-todo");
    deletebtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(deletebtn);

    outsideContent.appendChild(todo);

    todoinput.value = "";
    todoinput.focus();
};

const toggleForms = () => {
    editform.classList.toggle("hide");
    todoform.classList.toggle("hide");
    outsideContent.classList.toggle("hide");
};

const updatetodo = (text) => {
    const todos = document.querySelectorAll(".todo");
    
    todos.forEach((todo) => {
        let todotitle = todo.querySelector("h3");

        if (todotitle.innerText === oldinputvalue) {
            todotitle.innerText = text;
        }
    });
};

const searchTodo = (searchText) => {
    const todos = document.querySelectorAll(".todo");
    let visibleCount = 0;
    let totalCount = 0;
    
    todos.forEach((todo) => {
        const title = todo.querySelector("h3").innerText.toLowerCase();
        
        if (title.includes(searchText.toLowerCase())) {
            todo.style.visibility = "visible";
            todo.style.order = -visibleCount;
            visibleCount++;
        } else {
            todo.style.visibility = "hidden";
            todo.style.order = totalCount;
        }
        
        totalCount++;
    });

    // Limpar campo de pesquisa
    searchInput.value = "";

    // Ajustar a altura da área de contato
    const todoList = document.getElementById("todo-list");
    todoList.style.height = `${visibleCount * 50}px`; // Ajuste a altura conforme necessário (50px é um valor arbitrário)
};

// Eventos

todoform.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputValue = todoinput.value;
    
    if (inputValue) {
        savetodo(inputValue);
    }
});

document.addEventListener('click', (e) => {
    const targetel = e.target;
    const parentel = targetel.closest("div");
    let todotitle;

    if (parentel && parentel.querySelector("h3")){
        todotitle = parentel.querySelector("h3").innerText ||"";
    }

    if (targetel.classList.contains("finish-todo")) {
        parentel.classList.toggle("done");
    }

    if (targetel.classList.contains("remove-todo")) {
        parentel.remove();
    }

    if (targetel.classList.contains("edit-todo")) {
        toggleForms();

        editinput.value = todotitle;
        oldinputvalue = todotitle;
    }
});

cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();
    toggleForms();
});

editform.addEventListener("submit", (e) => {
    e.preventDefault();

    const editinputvalue = editinput.value;

    if (editinputvalue) {
        updatetodo(editinputvalue);
    }

    toggleForms();
});

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    searchTodo(searchInput.value);
});
