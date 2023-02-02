var socket = io();



var messages = document.getElementById('messages');
var form = document.getElementById('form');
let userInput = document.getElementById('userInput');
let user = 'Anonymous';

var input = document.getElementById('input');


// const emojiAPI = "7c1a000cde9aa741b8b826ded687743997aaca87";
//
// const emojiList = "https://emoji-api.com/emojis?access_key="+emojiAPI;
// console.log(fetch(emojiList))

let room = [];
// let roomList = ["JavaScript", "Python", "C#"];
let roomList = []
if (!roomList.length > 0) {
    document.querySelector('.rooms_list').parentElement.style.display = 'none';
    document.querySelector('.container').classList.remove = 'roomListActive';
} else {
    document.querySelector('.rooms_list').parentElement.display = 'block';
    document.querySelector('.container').classList.add = 'roomListActive';
}

function getUsernamRooms() {
    let url = window.location.href
    url.split('username=')
    let splitedOne = url.split('username=')[1]
    let username = splitedOne.split('&')[0]
    let rooms = splitedOne.split('room=')[1]
    return username;


}

user = getUsernamRooms()
form.addEventListener('submit', function (e) {

    e.preventDefault();
    if (input.value) {
        socket.emit('chat message', user, input.value);
        input.value = '';
    }
});

function stringToColor(str) {
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


function hexToRgbA(hex) {
    var c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('');
        if (c.length == 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = '0x' + c.join('');
        return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',1)';
    }
    throw new Error('Bad Hex');
}

function timeStamper() {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let time = `${hours}:${minutes}`;
    return time;
}

hexToRgbA('#fbafff')
let loggedUsername = getUsernamRooms()

let UsernameColor = new Object()


function getOpositeColor(rgb) { // Like this : rgb(0, 0, 0);
    while (rgb.indexOf(' ') != -1) rgb = rgb.replace(' ', '');
    //Check if is formatted as RGB
    if ((x = /([0-9]{0,3}),([0-9]{0,3}),([0-9]{0,3})/.exec(rgb))) {
        //Extract colors
        color = {
            'r': parseInt(x[1]),
            'g': parseInt(x[2]),
            'b': parseInt(x[3])
        };
        //If is this operation be <= 128 return white, others else return black
        OpositeColor = ((0.3 * (color['r'])) + (0.59 * (color['g'])) + (0.11 * (color['b'])) <= 128) ? 'white' : 'black';
        return OpositeColor;
    }
    return -1;
}
function LightenDarkenColor(col,amt) {
    var usePound = false;
    if ( col[0] == "#" ) {
        col = col.slice(1);
        usePound = true;
    }

    var num = parseInt(col,16);

    var r = (num >> 16) + amt;

    if ( r > 255 ) r = 255;
    else if  (r < 0) r = 0;

    var b = ((num >> 8) & 0x00FF) + amt;

    if ( b > 255 ) b = 255;
    else if  (b < 0) b = 0;

    var g = (num & 0x0000FF) + amt;

    if ( g > 255 ) g = 255;
    else if  ( g < 0 ) g = 0;

    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
}

socket.on('chat message', function (username, msg) {
    let usernameNow = username
    var item = document.createElement('li');
    var itemSpan = document.createElement('span');
    let userMessage = username
    if (UsernameColor.usernameNow) {
        itemSpan.style.color = UsernameColor.usernameNow
    } else {
        let userNameColorNewValue = stringToColor(username)
        userNameColorNewValue = hexToRgbA(userNameColorNewValue)
        if (userNameColorNewValue) {
            if (getOpositeColor(userNameColorNewValue) === "black") {
                let newColorFinal = LightenDarkenColor(stringToColor(username), 80);
                itemSpan.style.color = newColorFinal;
            }else{
                itemSpan.style.color = stringToColor(username);
            }
    }
}
    let spanClass2 = "NotYourMessage"
    if (userMessage === loggedUsername) {
        let spanClass = "yourMessage"
        spanClass2 = "yourMessageItem"
        itemSpan.classList.add(spanClass)
        usernameNow = "You"
    }


// itemSpan.style.color = stringToColor(username);
let time = timeStamper()
let timeSpan = document.createElement('span');
timeSpan.classList.add('timeSpan')
timeSpan.innerHTML = time
itemSpan.textContent = usernameNow + ": "
item.textContent = msg;
item.insertAdjacentElement('afterbegin', itemSpan);
item.insertAdjacentElement('beforeend', timeSpan);
item.classList.add(spanClass2)
messages.appendChild(item);
window.scrollTo(0, document.body.scrollHeight);


})
;

let botWelcome = [
    " est arriver, bienvenue a lui",
    " arrive surfez avec nous",
    " se prépare a taper sur son clavier"
]

socket.on('connect', function (userConnected) {
    WelcomeMessage = botWelcome[Math.floor(Math.random() * botWelcome.length)]
    socket.emit('chat message', 'Bot', user  + WelcomeMessage  + "!");
});


let ul = document.querySelector('.rooms_list');


for (let i = 0; i < roomList.length; i++) {
    let newRoom = document.createElement('li');
    newRoom.innerHTML = roomList[i];
    ul.appendChild(newRoom);
}



