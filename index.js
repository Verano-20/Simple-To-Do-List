$(document).ready(() => {

    // Function to create list item
    const newListItem = (content, completed=false) => {
        let listItem = $("<li></li>", {
            html: `<p>${content}</p>`,
            "class": "task-item",
            on: {
                'click': function() {
                    $(this).toggleClass('completed')
                    // Update Database
                    let isCompleted = false
                    if ($(this).hasClass('completed')) {
                        isCompleted = true
                    }
                    taskData = {"task": content, "completed": isCompleted}
                    $.post("/completedTask", taskData, (data) => {
                        console.log(`Status: ${data} - Task completion updated successfully.`)
                    })
                }
            }
        })
        if (completed == true) {
            listItem.toggleClass('completed') 
        }
        let binIcon = $("<span></span>", {
            on: {
                'click': function() {
                    $(this).parent().remove()
                    // Update Database
                    let isCompleted = false
                    if ($(this).hasClass('completed')) {
                        isCompleted = true
                    }
                    taskData = {"task": content, "completed": isCompleted}
                    $.post("/deleteTask", taskData, (data) => {
                        console.log(`Status: ${data} - Task deleted successfully.`)
                    })
                }
            }
        })
        binIcon.appendTo(listItem)
        return listItem
    }

    // Load tasks from database
    $.get("/getTasks", (data) => {
        for (let [task, completed] of Object.entries(data)) {
            var listItem = newListItem(task, completed)
            listItem.appendTo($("#task-list"))
        }
    })

    // Adding tasks on user input
    var input = $("#task-input")
    $("#submit-btn").on('click', (e) => { 
        var listItem = newListItem(input.val())
        listItem.prependTo($("#task-list"))
        taskData = {[input.val()]: false}
        $.post("/newTask", taskData, (data) => {
            console.log(`Status: ${data} - Task added successfully.`)
        })
        e.preventDefault()
        input.val('')
    })
})