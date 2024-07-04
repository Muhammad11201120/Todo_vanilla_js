let tasks =[];
tasks = JSON.parse(localStorage.getItem("tasks")) ?? []; // to reload data from local storage in array format

const tasksElement = document.getElementById("tasks");
function refresh(){

 tasksElement.innerHTML = ""; // to add only new things

  for (let i=0;i<tasks.length;i++) {

    tasksElement.innerHTML += ` <div class="task ${tasks[i].isDone?"done":""}">
              <div id="task-info" style="width: 70%;cursor:pointer">
                <h3 id="title" class= "${tasks[i].isDone ? "line-through" :""}">${tasks[i].title}</h3>

                <span class="material-symbols-outlined">
                  event_note
                </span>
                <span id="date-span">
                  ${tasks[i].date}
                </span>
              </div>
              <div id="task-actions" style="width: 20%;display:flex;justify-content:space-between; height:100% ;margin-left:10%">
                <button onclick = "deleteTask(${i})" id="delete-btn" class="circular-btn" style="background-color: rgb(185, 1, 1);color: white;"><span
                    class="material-symbols-outlined">
                    delete
                  </span></button>
                  ${tasks[i].isDone ? `<button onclick = "toggleTaskCompletion(${i})" id="done-btn" class="circular-btn" style="background-color: rgb(118, 0, 101);color: white;"><span class="material-symbols-outlined">
close
</span></button>`:`<button onclick = "toggleTaskCompletion(${i})" id="done-btn" class="circular-btn" style="background-color: rgb(1, 90, 1);color: white;"><span
                  class="material-symbols-outlined">
                  check
                </span></button>
                `}
                <button onclick = "editTask(${i})" id="edit-btn" class="circular-btn" style="background-color: rgb(30, 0, 77);color: white;"><span
                    class="material-symbols-outlined">
                    edit
                  </span></button>
              </div>
            </div>
  `;
  }

}
refresh()

document.getElementById("add-task").addEventListener("click",function(){
  let result = prompt("Enter A Task..");
  let now = new Date();
  let dateFormat = now.getDay() +"/"+(now.getMonth()+1)+"/"+now.getFullYear();

  if(result != null){
    let resultTask = {
      "title": result,
      "date": dateFormat,
      "isDone":false
    }

    tasks.push(resultTask);
    SaveToLocalStorage();
    refresh();
  }
})
function deleteTask(index){
  let confirmation = confirm("هل أنت متأكد من عملية الحذف لمهمُة :  " + tasks[index].title)
  if(confirmation){
    tasks.splice(index,1)
    SaveToLocalStorage();
    refresh();
  }
}

function editTask(index){
  let result = prompt("تعديل : ",tasks[index].title);
  if(result != null){
    tasks[index].title = result;
    tasks[index].isDone = false;
    SaveToLocalStorage();
    refresh();
  }
}
function toggleTaskCompletion(index){

    tasks[index].isDone = !tasks[index].isDone;
    SaveToLocalStorage();
    refresh();
}
function SaveToLocalStorage(){
  let tasksString = JSON.stringify(tasks); // to convert array to string and store it in localstorage
  localStorage.setItem("tasks",tasksString);
}