let isDragging = false;
let offsetX, offsetY;
let currentDraggable;

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
    header.innerHTML = "Task";

    let head = document.createElement("p");
    head.innerHTML = title.value;

    let content = document.createElement("p");
    content.innerHTML = text.value;

    // Append content to header
    newTask.appendChild(content);
    header.appendChild(head);

    // Append header to newTask
    newTask.appendChild(header);

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
