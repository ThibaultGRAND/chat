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
    express.static(path.join(__dirname, "public"))
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



//get username (not working)
let users = []
console.log(users)


io.on('connection', (socket) => {
    console.log('is connected');
    users.push(socket.id)
});

//Connection + message
io.on('connection', (socket) => {
    socket.on('chat message', (username, msg) => {
        console.log(`${username} : ${msg}`);
        io.emit('chat message', username, msg);
    });
    socket.on('added user', (user)=> {
        console.log(user.username, user.socketId)
        console.log('user added')
        io.emit('added user', user)
    })
});

//START SERVER
let PORT = 80;
server.listen(PORT, () => {
    console.log('listening on :' + PORT);
});

//.hactess
app.all('*', function (req, res) {
    res.redirect('/404.html');
});