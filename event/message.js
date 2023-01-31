var socket = io;

var form = document.getElementById('form');
var input = document.getElementById('message');

form.addEventListener('submit', function(e) {
    console.log('submit');
  e.preventDefault()
console.log(input.value);
  if(input.value) {
      socket.emit('chat message', input.value);
        input.value = '';
  }
});