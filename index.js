$(document).ready(() => {
    var input = $("#task-input")
    $("#submit-btn").on('click', (e) => { 
        var listItem = $("<li></li>", {
            html: `<p>${input.val()}</p>`,
            "class": "task-item",
            on: {
                'click': function() {
                    $(this).toggleClass('completed')
                }
            }
        })
        var binIcon = $("<span></span>", {
            on: {
                'click': function() {
                    $(this).parent().remove()
                }
            }
        })
        binIcon.appendTo(listItem)
        listItem.prependTo($("#task-list"))        
        e.preventDefault()
        input.val('')
    })
})