const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require("socket.io");
const path = require("path");
const io = new Server(server);
// const fetch = require('node-fetch');


// const emojiAPI = "7c1a000cde9aa741b8b826ded687743997aaca87";
//
// const emojiList = "https://emoji-api.com/emojis?access_key="+emojiAPI;
// console.log(fetch(emojiList));
//

function next() {
    console.log("next");
    io.emit('next');

}

app.use(
    express.static(path.join(__dirname, "public"))
);

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

server.listen(80, () => {
    console.log('listening on *:80');
});

//.hactess
app.all('*', function (req, res) {

    res.redirect('/404.html');
});

