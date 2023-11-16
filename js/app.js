// VARIABLES
let input = document.getElementById('input');
let divChars = document.getElementById('chars');
let remainingChars = document.getElementById('remainingChars');

let addBtn = document.getElementById('add_btn');
let clearAllBtn = document.getElementById('clear_all');

let divTodos = document.getElementById('todos');

let todosNbr = document.getElementById("todos_nbr");
let nbr = 0;
let charsNbr = 0;
let text = '';


// FUNCTIONS
function countCharacters(){
    
    charsNbr = input.value.length;
    if(charsNbr < 25){
        divChars.style.color = '#005C94';
    } else if(charsNbr < 40){
        divChars.style.color = '#38c0ff';
    } else {
        divChars.style.color = '#F875AA';
    }

    displayRemainingCharacters(charsNbr);
}

function displayRemainingCharacters(){
    
    remainingChars.textContent = 50 - charsNbr;
}

function addTodo(){
    
    if(input.value === ''){
        return false;
    }

    storeNewTodo(input.value);
    loadStorage();
    input.value = '';
    countCharacters();
}

function storeNewTodo(value){

    let todosToStore = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
    
    todosToStore.push(value);

    localStorage.setItem('todos', JSON.stringify(todosToStore));
}

function loadStorage(){

    removeAllChildNodes(divTodos);
    nbr = 0;

    if(localStorage.getItem('todos')){
        let storedTodos = JSON.parse(localStorage.getItem('todos'));

        storedTodos.forEach(element => {
            divTodos.appendChild(createTodoRow(element));
        });
        nbr = storedTodos.length;
    }
    displayTodosNumber();
}

function createTodoRow(value){

    let div = document.createElement("div");
    div.classList.add('todo');

    let p = document.createElement("p");
    p.textContent = value;
    p.addEventListener('click', isUrgent);

    div.append(p, createDeleteButton());

    return div;
}

function isUrgent(e){
    
    let parent = e.target.closest("div.todo");
    let index = Array.prototype.indexOf.call(divTodos.children, parent);
    let urgentTodo = parent.querySelector('p').textContent;

    let storedTodos = JSON.parse(localStorage.getItem('todos'));

    storedTodos.splice(index, 1);
    storedTodos.unshift(urgentTodo);

    localStorage.setItem('todos', JSON.stringify(storedTodos));

    loadStorage();
}

function createDeleteButton() {

    let btn = document.createElement("button");
    btn.setAttribute('type', 'button');
    btn.classList.add('btn', 'delete_btn');
    btn.innerHTML = '<i class="fas fa-trash"></i>';

    btn.addEventListener('click', deleteTodo);

    return btn;
}

function deleteTodo(e){

    let divToDelete = e.target.closest("div.todo");
    let index = Array.prototype.indexOf.call(divTodos.children, divToDelete);

    let storedTodos = JSON.parse(localStorage.getItem('todos'));

    storedTodos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(storedTodos));

    loadStorage();
}

function clearAll(){

    localStorage.clear();
    loadStorage();
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function displayTodosNumber(){

    if(nbr < 0){
        nbr = 0;
    }
    if(nbr === 0){
        text = `Vous n'avez <span class="color_nbr">rien</span> à faire`;
    } else if (nbr === 1) {
        text = `Vous avez <span class="color_nbr">${nbr}</span> chose à faire`;
    } else {
        text = `Vous avez <span class="color_nbr">${nbr}</span> choses à faire`;
    }
    todosNbr.innerHTML = text;
}


// CODE
loadStorage();
displayRemainingCharacters(charsNbr);
addBtn.addEventListener('click', addTodo);
clearAllBtn.addEventListener('click', clearAll);
input.addEventListener('keyup', countCharacters);
