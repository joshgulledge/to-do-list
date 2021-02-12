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
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
}
