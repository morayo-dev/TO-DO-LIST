//Variables
const checkBtn = document.getElementById('check-btn');
const taskContainer = document.getElementById('tasks-container');
const inputContainer = document.getElementById('input-item');

//get input text
let inputText = document.getElementById('input-item');
/*============================== EVENT LISTENERS============================== */
//Event Listeners for the button click events that add new tasks
checkBtn.addEventListener('click', () => {
  if (inputText.value.length !== 0) {
    //create elements
    let toDoOuterContainer = createElement('div');
    let toDoInnerContainer = createElement('div')
    let doneIcon = createElement("i");
    let deleteIcon = createElement("i");
    let span = createElement('span');

    //the hours is a 24hr clock format hence the conversion below
    const [month, dayNumber, hours, minutes] = time();
    const twelveHourFormat = hours % 12;

    //for each element set their corresponding class attribute
    setMultipleElementAttributes(
      [toDoOuterContainer, toDoInnerContainer, doneIcon, deleteIcon, span],
      ["tasks", "task-content", "fa-solid fa-check-double task-icon done", "fa-solid fa-trash task-icon delete", "time"]);

    toDoInnerContainer.innerHTML = `<li class="task-item"> ${inputText.value}</li> <span class="time" id="times">${dayNumber} ${month} ${hours < 12 ? twelveHourFormat : hours}:${minutes} ${getTimeFormat(hours)}</span>`;

    multiChildAppend(toDoOuterContainer, [toDoInnerContainer, doneIcon, deleteIcon]);
    taskContainer.prepend(toDoOuterContainer);
    inputText.value = '';
  }
});


//Event Listener for the ENTER key event that add new tasks
inputContainer.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {

    if (inputText.value.length !== 0) {
      //create elements
      let toDoOuterContainer = createElement('div');
      let toDoInnerContainer = createElement('div')
      let doneIcon = createElement("i");
      let deleteIcon = createElement("i");
      let span = createElement('span');

      //the hours is a 24hr clock format hence the conversion below
      const [month, dayNumber, hours, minutes] = time();
      const twelveHourFormat = hours % 12;

      //for each element set their corresponding class attribute
      setMultipleElementAttributes(
        [toDoOuterContainer, toDoInnerContainer, doneIcon, deleteIcon, span],
        ["tasks", "task-content", "fa-solid fa-check-double task-icon done", "fa-solid fa-trash task-icon delete", "time"]);

      toDoInnerContainer.innerHTML = `<li class="task-item"> ${inputText.value}</li> <span class="time" id="times">${dayNumber} ${month} ${hours < 12 ? twelveHourFormat : hours}:${minutes} ${getTimeFormat(hours)}</span>`;


      multiChildAppend(toDoOuterContainer, [toDoInnerContainer, doneIcon, deleteIcon]);
      taskContainer.prepend(toDoOuterContainer);
      inputText.value = '';
    }
  }
});

//complete tasks should have their content underlined if the done button is clicked
document.addEventListener('click', (e) => {
  if (e.target.classList.contains("done")) {
    const task = e.target.previousElementSibling.firstElementChild;
    task.classList.toggle("line-through");
    // let tasksArray = taskContainer.childNodes;
    // taskContainer.insertBefore(task.parentElement.parentElement, tasksArray[tasksArray.length])
  }
});


//Delete task when the trash icon button is clicked
document.getElementById('tasks-container').addEventListener('click', (e) => {
  if (e.target.classList.contains("delete")) {
    if (confirm("Are you sure you want to delete?")) {
      e.target.parentElement.remove();
    }
  }
});
// ===================== END ===================================


/* ============================== TIME EVENTS ================================== */
//This alllow the tasks container to be shown if it is not empty
//By checking every 0.1secs
setInterval(() => {
  if (taskContainer.childNodes.length !== 0) {
    taskContainer.style.display = 'block';
  } else {
    taskContainer.style.display = 'none';
  }
}, 100);


//======================  END ===================================

/* ======================== FUNCTIONS DEFINITION ================================= */
function getTimeFormat(hour) {
  return hour >= 12 ? "PM" : "AM";
}


//return the month, day, and time of the day a certain event occurs.
function time() {
  const date = new Date();
  let [_, month, dayNumber, __, hourMin] = /\w+ \w+ \d+ \d+ \d\d:\d\d/.exec(date)[0].split(" ");
  let [hours, minutes] = hourMin.split(":");

  return [month, dayNumber, hours, minutes];
}

//Although this is self explanatory, this function creates and returns an HTMLElement
function createElement(element) {
  return document.createElement(element);
}

//this set a class attribute for each corresponding element
function setMultipleElementAttributes([...element], [...attr]) {
  for (let i = 0; i < element.length; i++) {
    for (let k = 0; k < attr.length; k++) {
      if (i === k) {
        element[i].className = attr[k];
      }
    }
  }
}

//this allow many childNode/Element to be appended to a parent element
function multiChildAppend(parent, [...child]) {
  for (let j = 0; j < child.length; j++) {
    parent.appendChild(child[j]);
  }
}
