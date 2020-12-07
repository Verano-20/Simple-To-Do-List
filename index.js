$(document).ready(() => {

    // Set user ID to default (1), will come back to this later
    const currentUser = 1;


    // Function to create list item
    const newListItem = (content, completed=false, userId=currentUser) => {
        let listItem = $("<li></li>", {
            html: `<p>${content}</p>`,
            "class": "task-item",
            on: {
                'click': function() {
                    $(this).toggleClass('completed')
                    // Update JSON
                    let isCompleted = false
                    if ($(this).hasClass('completed')) {
                        isCompleted = true
                    }
                    listItemJson = {
                        "userId": userId,
                        "title": content,
                        "completed": isCompleted
                    }
                    $.post("/completedTask", listItemJson, (data) => {
                        console.log(`Status: ${data} - Task completion updated successfully.`)
                    })
                }
            }
        })
        if (completed == "true") {
            listItem.toggleClass('completed') 
        }
        let binIcon = $("<span></span>", {
            on: {
                'click': function() {
                    $(this).parent().remove()
                    // Update JSON
                    let isCompleted = false
                    if ($(this).hasClass('completed')) {
                        isCompleted = true
                    }
                    listItemJson = {
                        "userId": userId,
                        "title": content,
                        "completed": isCompleted
                    }
                    $.post("/deleteTask", listItemJson, (data) => {
                        console.log(`Status: ${data} - Task deleted successfully.`)
                    })
                }
            }
        })
        binIcon.appendTo(listItem)
        return listItem
    }


    // Load tasks from JSON
    $.get("/list.json", (data) => {
        for (let i = 0; i < data.length; i++) {
            if (data[i].userId == currentUser) {
                var listItem = newListItem(data[i].title, data[i].completed)
                listItem.appendTo($("#task-list"))
            }
        }
    })


    // Adding tasks on user input
    var input = $("#task-input")
    $("#submit-btn").on('click', (e) => { 
        var listItem = newListItem(input.val())
        listItem.prependTo($("#task-list"))
        listItemJson = {
            "userId": currentUser,
            "title": input.val(),
            "completed": false
        }
        $.post("/newTask", listItemJson, (data) => {
            console.log(`Status: ${data} - Task added successfully.`)
        })
        e.preventDefault()
        input.val('')
    })
})