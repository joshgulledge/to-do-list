console.log('Js is up and running');

$(document).ready(andGo);

function andGo() {
  // start with existing data
  getData();

  // start e listeners
  $('#add-task-btn').on('click', addTask);
  $(document).on('click', '.delete-btn', deleteBtn);
  $(document).on('click', '.complete-task-btn', completeTaskBtn);
}

function completeTaskBtn() {
  const taskId = $(this).data('id');
  const isComplete = $(this).data('bool');

  $.ajax({
    method: 'PUT',
    url: `/toDoItem/${taskId}`,
    data: {
      isComplete,
    },
  })
    .then((res) => {
      swal({
        title: `Marked as ${isComplete === true ? 'Incomplete' : 'Complete'}`,
        text: `${
          isComplete === true
            ? 'You Can finish this task Again!'
            : 'You Finished the task!'
        }`,
        icon: 'success',
        button: `Continue`,
      });
      $('.table-of-toDo').empty();
      getData();
    })
    .catch((err) => console.error(err));
}

function deleteBtn() {
  const theTask = $(this).data('id');

  swal({
    title: 'Are you sure?',
    text: 'Once deleted, you will not be able to recover this task!',
    icon: 'warning',
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      $.ajax({
        method: 'DELETE',
        url: `/toDoItem/${theTask}`,
      })
        .then((res) => {
          // console.log(res);
          $('.table-of-toDo').empty();

          getData();
        })
        .catch((err) => console.error(err));

      swal('Your task has been deleted!', {
        icon: 'success',
      });
    } else {
      swal('Your task is safe!');
    }
  });
}

function addTask() {
  // gather the information
  // put into an object
  const newTask = {
    task_name: $('#task-name-input').val(),
    completion_time: $('#how-long-input').val(),
    complete: $('#is-complete').val(),
  };

  // make sure all values are put in
  if (!newTask.task_name || !newTask.completion_time || !newTask.complete) {
    alert('Please fill out all input fields');
    return;
  }

  clearInputs();
  sendTaskToDB(newTask);

  // console.log('newTask in addTask function', newTask);
}

function sendTaskToDB(theNewTask) {
  // console.log('in send task', theNewTask);

  swal({
    title: 'Are you sure?',
    text: 'This Task will be added to your list.',
    icon: 'info',
    buttons: true,
    dangerMode: true,
  }).then((addTheTask) => {
    if (addTheTask) {
      $.ajax({
        method: 'POST',
        url: '/toDoItem/postOnServer',
        data: {
          newTask: theNewTask,
        },
      })
        .then((res) => {
          // clear existing list
          $('.table-of-toDo').empty();
          // get data, now with added task
          getData();
        })
        .catch((err) => console.error(err));
      swal('You added a Task', {
        icon: 'success',
      });
    } else {
      swal('No Task was added');
    }
  });
}

function clearInputs() {
  $('#task-name-input').val('');
  $('#how-long-input').val('');
  $('#is-complete').val('');
}

function getData() {
  $.ajax({
    method: 'GET',
    url: '/toDoItem',
  })
    .then((res) => {
      // the res is an array of Objs
      // console.log(res);

      renderData(res);
    })
    .catch((err) => {
      console.error(err);
    });
}

function renderData(itemsList) {
  itemsList.forEach((obj) => {
    // console.log(obj);
    $('.table-of-toDo').append(`
    <tr ${
      obj.complete === false ? `class="table-danger"` : `class="table-success"`
    }>
        <td>${obj.task_name}</td>
        <td>${obj.completion_time} hours</td>
        <td>${obj.complete === false ? 'No' : 'Yes'}</td>
        ${
          obj.complete === false
            ? `<td><button class="complete-task-btn btn btn-success" data-id="${obj.id}" data-bool="${obj.complete}">Mark Complete</button></td>`
            : `<td><button class="complete-task-btn btn btn-secondary" data-id="${obj.id}" data-bool="${obj.complete}">Mark Incomplete</button></td>`
        }
        <td><button class="delete-btn btn btn-danger" data-id="${
          obj.id
        }">Delete</button></td> 
      </tr>
    `);
  });
}
