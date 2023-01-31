var socket = io();

var messages = document.getElementById('messages');
var form = document.getElementById('form');
let userInput = document.getElementById('userInput');
let user = 'Anonymous';

var input = document.getElementById('input');


let room = [];
// let roomList = ["JavaScript", "Python", "C#"];
let roomList = []
if(!roomList.length > 0){
    document.querySelector('.rooms_list').parentElement.style.display = 'none';
    document.querySelector('.container').classList.remove = 'roomListActive';
}else{
    document.querySelector('.roomList').style.display = 'block';
    document.querySelector('.container').classList.add = 'roomListActive';
}
function getUsernamRooms () {
let url = window.location.href
    console.log(window.location.href)
    url.split('username=')
    let splitedOne = url.split('username=')[1]
    let username = splitedOne.split('&')[0]
    let rooms = splitedOne.split('room=')[1]

    console.log(username, rooms)

    return username;


}
user = getUsernamRooms()
form.addEventListener('submit', function(e) {

    e.preventDefault();
    if (input.value) {
        socket.emit('chat message', user,  input.value);
        input.value = '';
    }
});
function stringToColor (str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = '#';
    for (var i = 0; i < 3; i++) {
        var value = (hash >> (i * 8)) & 0xFF;
        colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
}



socket.on('chat message', function(username, msg) {
    var item = document.createElement('li');
    var itemSpan = document.createElement('span');
    itemSpan.style.color = stringToColor(username);
    itemSpan.textContent = username + ": "
    item.textContent =  msg;
    item.insertAdjacentElement( 'afterbegin', itemSpan);
    messages.appendChild(item);

    window.scrollTo(0, document.body.scrollHeight);
});

socket.on('connect', function(userConnected) {
    socket.emit('chat message', 'Bot', "Hello " + user + "!");
});


let ul = document.querySelector('.rooms_list');



for(let i = 0; i < roomList.length; i++){
    let newRoom = document.createElement('li');
    newRoom.innerHTML = roomList[i];
    ul.appendChild(newRoom);
}