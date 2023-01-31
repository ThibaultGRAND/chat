let form = document.querySelector('form');
let input = document.querySelector('input');
let bouton = document.querySelector('.btn');

let users = [];
let user = { id: 1, username: 'test', room: 'test' };
users.push(user);
let isConnected = false;
bouton.addEventListener('click', (e) => {
    console.log("users");
    for (let i = 0; i < users.length; i++) {

        if(input.value) {
            isConnected = false;
            if (input.value === users[i].username) {
                console.log(users[i].username);
                isConnected = true;
            }
        }
    }
});

function verifUserConnected(){
    return isConnected;
}

function getUserInfo(){
    return null;
}


let select = document.querySelector('select');
//getRoom From other module but
let roomList = ["JavaScript", "Python", "C#"];
roomList = []
if(!roomList.length > 0){
    console.log(select)
    console.log(select)
    select.style.display = 'none';
    document.querySelector('.roomLabel').style.display = 'none';
}

for(let i = 0; i < roomList.length; i++){
    let newRoom = document.createElement('option');
    newRoom.innerHTML = roomList[i];
    newRoom.value = roomList[i];
    select.appendChild(newRoom);
    console.log(newRoom)
}