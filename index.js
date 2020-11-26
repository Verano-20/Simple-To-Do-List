var input = document.getElementById("task-input")
var submitbtn = document.getElementById("submit-btn")
var list = document.getElementById("task-list")

submitbtn.addEventListener('click', function(e) {
    var firstTask = list.firstElementChild
    var listItem = document.createElement('li')
    var newTask = document.createElement('p')
    var textNode = document.createTextNode(input.value)
    var binIcon = document.createElement('span')

    listItem.classList.add('task-item')
    newTask.appendChild(textNode)
    listItem.appendChild(newTask)
    listItem.appendChild(binIcon)
    listItem.addEventListener('click', function(){
        if (listItem.classList.contains("completed")){
            listItem.classList.remove("completed")
        } else {
            listItem.classList.add("completed")
        }})

    list.insertBefore(listItem, firstTask)

    binIcon.addEventListener('click', function() {
        console.log('delete')
        list.removeChild(listItem)
    })

    e.preventDefault()
    input.value=''
})
