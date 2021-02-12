console.log('Js is up and running');

$(document).ready(andGo);

function andGo() {
  console.log('jQuery is running right on time');
  getData();
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
    <tr>
        <td>${obj.task_name}</td>
        <td>${obj.completion_time}</td>
        <td>${obj.complete}</td>
        <td><button class="delete-btn">Delete</button></td> 
      </tr>
    `);
  });
}
