var input = document.getElementById("task-input")
var submitbtn = document.getElementById("submit-btn")
var list = document.getElementById("task-list")

submitbtn.addEventListener('click', function(e) {
    var newTask = document.createElement('li')
    var textNode = document.createTextNode(input.value)
    var firstTask = list.firstElementChild
    newTask.classList.add('task-item')
    newTask.appendChild(textNode)
    newTask.addEventListener('click', function(){
        if (newTask.classList.contains("completed")){
            newTask.classList.remove("completed")
        } else {
            newTask.classList.add("completed")
        }})
    list.insertBefore(newTask, firstTask)
    e.preventDefault()
})
