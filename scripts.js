//Add listener to click and add item
let col = document.getElementsByClassName('col');
for (let i = 0; i < 3; i++) {
  col[i].addEventListener('click', addItem);
}

//Add listener to allow divs to be drop off targets
let dropOffs = document.querySelectorAll('#dropzone');
dropOffs.forEach(function(element) {
  element.addEventListener('drop', drop);
  element.addEventListener('dragover', allowDrop);
})

function addItem() {
  let description = '';
  if (event.target.innerHTML == '+') {
    description = prompt('Write a description for your Todo.');
  }
  if (description) createTodoItem(description, event.currentTarget.id);
}

function createTodoItem(description, category) {
  let section = document.getElementById(category);
  let itemLocation = section.querySelector('#items');
  let newDiv = document.createElement('DIV');

  newDiv.appendChild(createItem(description));
  newDiv.appendChild(createDeleteButton());
  newDiv.classList.add('todoItems');
  newDiv.draggable = true;
  itemLocation.appendChild(newDiv);

  //Add event to delete item
  let todoItem = document.getElementsByClassName('todoItems');

  for (let i = 0; i < todoItem.length; i++) {
    todoItem[i].addEventListener('click', deleteItem);
    todoItem[i].addEventListener('dragstart', drag);
  }

}

function createDeleteButton() {
  let newDeleteElement = document.createElement('P');
  newDeleteElement.innerHTML = 'X';
  return newDeleteElement;
}

function createItem(description) {
  let newItemElement = document.createElement('P');
  newItemElement.innerHTML = description;
  return newItemElement;
}

function deleteItem() {
  if (event.target.innerHTML == 'X') {
    event.currentTarget.remove();
  }
}

function drag(event) {
  event.dataTransfer.setData('text', event.currentTarget.className);
  console.log(event.target.parentNode.parentNode);
}

function drop(event) {
  event.preventDefault();
  let data = event.dataTransfer.getData('text');
  //console.log(data);
  //console.log(document.getElementsByClassName(data)[0]);
  //console.log(document.getElementsByClassName(data)[1]);
  console.log(event.target.parentNode.parentNode);
  if (event.target.parentNode.parentNode == 'ideas' || event.target.parentNode.parentNode == 'progress' || event.target.parentNode.parentNode == 'finished') {
    event.target.parentNode.parentNode.appendChild(document.getElementsByClassName(data)[0]);
  }
}

function allowDrop(event) {
  event.preventDefault();
}
