//Variables
const checkBtn = document.getElementById('check-btn');
const taskContainer = document.getElementById('tasks-container');
const inputContainer = document.getElementById('input-item');

//DATE



function getTimeFormat(hour) {
  return hour >= 12 ? "PM" : "AM";
}

//Create new elements
let div = document.createElement('div');
let li = document.createElement('li');

//get input text
let inputText = document.getElementById('input-item');


//add new tasks
checkBtn.addEventListener('click', () => {
  if (inputText.value.length !== 0) {

    //time
    const date = new Date();

    // let res = /\w+ \w+ \d+ \d+ \d\d/.exec(date);
    let res = /\w+ \w+ \d+ \d+ \d\d:\d\d/.exec(date);

    let array = res[0].split(" ");
    let [hours, minutes] = array[4].split(":");
    let houred = hours % 12;
    let month = array[1];
    let dayNumber = array[2];

    //create elements
    let divOuterContainer = document.createElement('div');
    let divInnerContainer = document.createElement('div')
    let icon1 = document.createElement("i");
    let icon2 = document.createElement("i");
    let span = document.createElement('span');

    //set attributes
    divOuterContainer.className = "tasks"
    span.className = "time"
    divInnerContainer.className = "task-content";
    icon1.className = "fa-solid fa-check-double task-icon done";
    icon2.className = "fa-solid fa-trash task-icon delete";



    //set the text content of li to the input text
    // li.innerText = inputText.value;
    divInnerContainer.innerHTML = `<li class="task-item"> ${inputText.value}</li> <span class="time" id="times">${dayNumber} ${month} ${hours < 12 ? houred : hours}:${minutes} ${getTimeFormat(hours)}</span>`;



    divOuterContainer.appendChild(divInnerContainer);
    divOuterContainer.appendChild(icon1);
    divOuterContainer.appendChild(icon2);
    taskContainer.prepend(divOuterContainer);
    inputText.value = '';
  }
});

inputContainer.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {

    if (inputText.value.length !== 0) {
      //time
      const date = new Date();

      // let res = /\w+ \w+ \d+ \d+ \d\d/.exec(date);
      let res = /\w+ \w+ \d+ \d+ \d\d:\d\d/.exec(date);

      let array = res[0].split(" ");
      let [hours, minutes] = array[4].split(":");
      let houred = hours % 12;
      let month = array[1];
      let dayNumber = array[2];

      //create elements
      let divOuterContainer = document.createElement('div');
      let divInnerContainer = document.createElement('div')
      let icon1 = document.createElement("i");
      let icon2 = document.createElement("i");
      let span = document.createElement('span');

      //set attributes
      divOuterContainer.className = "tasks"
      span.className = "time"
      divInnerContainer.className = "task-content";
      icon1.className = "fa-solid fa-check-double task-icon done";
      icon2.className = "fa-solid fa-trash task-icon delete";



      //set the text content of li to the input text
      // li.innerText = inputText.value;
      divInnerContainer.innerHTML = `<li class="task-item"> ${inputText.value}</li> <span class="time" id="times">${dayNumber} ${month} ${hours < 12 ? houred : hours}:${minutes} ${getTimeFormat(hours)}</span>`;



      divOuterContainer.appendChild(divInnerContainer);
      divOuterContainer.appendChild(icon1);
      divOuterContainer.appendChild(icon2);
      taskContainer.prepend(divOuterContainer);
      inputText.value = '';
    }
  }
});

//move the list with class of line-through down as received
//remove the line through class from the time text



//complete tasks
document.addEventListener('click', (e) => {
  if (e.target.classList.contains("done")) {
    const task = e.target.previousElementSibling.firstElementChild;
    task.classList.toggle("line-through");

    let tasksArray = taskContainer.childNodes;


    console.log(tasksArray);
    console.log(task.parentElement);
    console.log(task.parentElement.parentElement === tasksArray[1]);

    taskContainer.insertBefore(task.parentElement.parentElement, tasksArray[tasksArray.length])

    // task.parentElement


  }

  //move the task down

});


//Delete task
document.getElementById('tasks-container').addEventListener('click', (e) => {
  if (e.target.classList.contains("delete")) {
    if (confirm("Are you sure you want to delete?")) {
      e.target.parentElement.remove();
    }
  }
});



//confirm that the task container is not empty
setInterval(() => {
  if (taskContainer.childNodes.length !== 0) {
    taskContainer.style.display = 'block';
  } else {
    taskContainer.style.display = 'none';
  }
}, 100);