$(document).ready(onReady)

function onReady() {
    console.log('The DOM is rendered')
    fetchAndRenderTasks();
    $('#addTaskButton').on('click', createTask)
    $('body').on('click', '.completedButton', markTaskCompleted)
    $('body').on('click', '.deleteButton', deleteTask)
}

function fetchAndRenderTasks() {
    $.ajax({
        method: 'GET',
        url: '/taskList'
    }).then((response) => {
        $('#taskList').empty();
        for (let task of response) {
            if (task.complete === 'TRUE') {
            $('#taskList').append(`
            <li data-id=${task.id} class="completedButtonCSS">
                <button class="completedButton">✅</button>
                ${task.task}
                <button class="deleteButton">🗑</button>
            </li>
            `)
        } else {
            $('#taskList').append(`
            <li data-id=${task.id} class="uncompletedTask">
                <button class="completedButton">❌</button>
                ${task.task}
                <button class="deleteButton">🗑</button>
            </li>
            `)
        }
    }
    }).catch((error) => {
        console.log('err client-side GET', error);
    })
}

function createTask() {
    let newTaskName = $('#taskInput').val();

    let newTask = {
        task: newTaskName,
        complete: 'FALSE'
    }
    $('#taskInput').val('')
    $.ajax({
        method: 'POST',
        url: '/taskList',
        data: newTask
    }).then((response) => {
        fetchAndRenderTasks();
    }).catch ((error) => {
        console.log('err client-side POST', error);
    })
    $('#taskInput').val('')
}

function markTaskCompleted() {
    let idToUpdate = $(this).parent().data().id

    $.ajax({
        method: 'PUT',
        url: `/taskList/${idToUpdate}`,
        data: {
            complete: 'TRUE'
        }
    }).then((response) => {
        fetchAndRenderTasks();
    }).catch((error) => {
        console.log('error client-side markTaskCompleted', error);
    })
}

function deleteTask(){
    let idToDelete = $(this).parent().data().id;

    $.ajax({
        method: 'DELETE',
        url: `/taskList/${idToDelete}`
    }).then((response) => {
        fetchAndRenderTasks();
    }).catch((error) => {
        console.log('err in deleteTask', error);
    })
}