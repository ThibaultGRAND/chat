const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require("socket.io");
const path = require("path");
const io = new Server(server);

function next() {
    console.log("next");
    io.emit('next');

}

app.use(
    express.static(path.join(__dirname, "public"))
);


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
        "192.168.1.59",

        //David
        "192.168.1.16"
    ];


    console.log(users[ip]);
    console.log(ip)
    if (users.includes(ip)) {
        console.log("ip authorized");
        let auth = true;
    } else {
        console.log("ip not authorized");
        let auth = false;
    }
});


// ipChecker()

io.on('connection', (socket) => {
    console.log('is connected');
    socket.on('is disconnect', () => {
        console.log('is deconnected');
    });
});


io.on('connection', (socket) => {
    socket.on('chat message', (username, msg) => {
        console.log(`${username} : ${msg}`);
        io.emit('chat message', username, msg);
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});

//.hactess
app.all('*', function (req, res) {

    res.redirect('/404.html');
});

