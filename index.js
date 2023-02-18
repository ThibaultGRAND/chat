//Module
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require("socket.io");
const path = require("path");
const io = new Server(server);

//Static files
app.use(
    express.static(path.join(__dirname, "public")),
    express.static(path.join(__dirname, "socket.io")),
);


//ipFilter (not working)
let ipFilter = false;
if (ipFilter) {
    app.use(function (req, res, next) {
        var ip = req.connection.remoteAddress;

        ip = ip.replace('::ffff:', '');
        console.log('New connection from ' + ip);

        let users = [
            //localhost
            "192.168.1.20",
            "::1",
            "127.0.0.1",

            //Clement
            "192.168.1.18",

            //David
            "192.168.1.16",

            //Thibault
            "192.168.1.59"
        ];


        console.log(ip)
        if (users.includes(ip)) {
            console.log("ip authorized");
            let auth = true;
        } else {
            console.log("ip not authorized");
            let auth = false;
        }

    });
}
let disconnectedUser = null;

function getDisconnectedUser(id) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].socketID === id) {
            disconnectedUser = users[i];
        }
    }
    return disconnectedUser;
}

//get username (not working)
let users = []
console.log(users)


io.on('connection', (socket) => {
    console.log('is connected');
});

function removeitem(array, item) {
    let index = array.indexOf(item);
    if (index > -1) {
        array.splice(index, 1);
    }
    return array;
}

//Connection + message
io.on('connection', (socket) => {
    socket.on('chat message', (username, msg) => {
        console.log(`${username} : ${msg}`);
        io.emit('chat message', username, msg);
    });

    socket.on('added user', (user) => {
        console.log('user added')
        console.log(user.username)
        users.push(user)
        console.log(users)
        //io.emit('added user', user)
        io.emit('refreshUsers', users)
    })

    socket.on('disconnect', () => {
        let disocoUser = getDisconnectedUser(socket.id)
        users = removeitem(users, disocoUser)
        console.log(users)
        console.log(disocoUser.username + ' is disconnected');

        io.emit('user disconnected', disocoUser.username)
        io.emit('refreshUsers', users)
    });
});

//START SERVER
let PORT = 80;
server.listen(PORT, () => {
    console.log('listening on :' + PORT);
});

//.hactess
