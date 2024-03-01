//drag variables
let isDragging = false;
let offsetX, offsetY;
let currentDraggable;
let workTimer = 2000;
//timer variables
let restTime = 5;
let startButton;
let targetDateTime = new Date();
let restBoolean = false;
let intervalCountdown;
let  countdownTimer = document.getElementById("workTimer");
let timeDifference;
let currentTime; 
let initialTime = 1;
// tripple button functionality
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("toggle-button1").classList.add("active");

    document.querySelectorAll(".tri-state-toggle-button").forEach(function (button) {
        button.addEventListener('click', function () {
            document.querySelectorAll(".tri-state-toggle-button").forEach(function (btn) {
                btn.classList.remove("active");
            });
            let id = this.id;
            document.getElementById(id).classList.add("active");
        });
    });
});



function addNewTask() {
    let title = document.getElementById("titleInput");
    let text = document.getElementById("floatingTextarea2");

    let newTask = document.createElement("div");
    newTask.className = "mydiv";

    let header = document.createElement("div");
    header.className = "mydivheader";
    header.innerHTML = title.value;


    let content = document.createElement("p");
    content.innerHTML = text.value;

      // Append header to newTask
      newTask.appendChild(header);

    // Append content to header
    newTask.appendChild(content);

   

  
    // Make the new task draggable
    newTask.addEventListener('mousedown', (e) => {
        isDragging = true;
        currentDraggable = newTask;
        offsetX = e.clientX - newTask.getBoundingClientRect().left;
        offsetY = e.clientY - newTask.getBoundingClientRect().top;
        newTask.style.cursor = 'grabbing';
    });

    document.body.appendChild(newTask); // Append the new task to the body or another container
}

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    const x = e.clientX - offsetX;
    const y = e.clientY - offsetY;

    currentDraggable.style.left = `${x}px`;
    currentDraggable.style.top = `${y}px`;
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    if (currentDraggable) {
        currentDraggable.style.cursor = 'grab';
        currentDraggable = null;
    }
});

//timer 


function handleTriStateButton(timeSetter){


if(timeSetter == 1){

restTime = 5;
} else if (timeSetter == 2) {
 
  restTime = 10;
} else if (timeSetter == 3){
 
  restTime = 15;
}
}
function updateTimerDisplay(timeDifference, timerDisplay) {
    // Calculate days, hours, minutes, and seconds
    let minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    // Update the timer display
    timerDisplay.innerHTML = minutes+ ":"+ seconds;
}
let actionExecuted = false;
targetDateTime.setMinutes(targetDateTime.getMinutes() + initialTime);
function countdownTime(){
   
    currentTime = new Date();
   
    workTag = document.getElementById("workTag");
    timeDifference = targetDateTime - currentTime;
    
    console.log(restTime);

    // Check if the target date and time have passed
   
   
   
    if (timeDifference <= 0) {
      if (!restBoolean){
        targetDateTime = new Date();    
        targetDateTime.setMinutes(targetDateTime.getMinutes() + restTime);
        rest();
      } else {
        targetDateTime = targetDateTime.setMinutes(targetDateTime.getMinutes() + initialTime);
      }
        
       
    } else {
        updateTimerDisplay(timeDifference, countdownTimer);
    }
}
function rest(){
    currentTime = new Date();
    timeDifference = targetDateTime - currentTime;
    updateTimerDisplay(timeDifference, countdownTimer);
    restBoolean = true;
}
function executeTimerFunction(){

    startButton = document.getElementById("startStopButton");

if (startButton.innerHTML === "Start"){
    startButton.innerHTML = "Stop";
    intervalCountdown = setInterval(countdownTime, 1000);
} else {
    clearInterval(intervalCountdown);
    startButton.innerHTML = "Start";

}
}

