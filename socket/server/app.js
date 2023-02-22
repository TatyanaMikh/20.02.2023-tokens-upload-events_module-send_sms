const express = require('express');
const http = require('http');
const socket_io = require('socket.io');
const cors = require('cors');


const app = express();
const server = http.createServer(app);
const io = socket_io(server, {
    cors : {
        origin:'*',
        methods: ["GET"]
    }
});

app.use(cors());


const users = {};

io.on('connection',(socket)=>{

    console.log('client connected : with socket id : '+socket.id);


    // example for index 2

    setInterval(()=>{
        socket.emit('change-color');
    },500)





    socket.on('new-user',(user_name_value)=>{

        users[socket.id] = user_name_value;
        socket.broadcast.emit('user-connected', user_name_value);

    });

    socket.on('send-chat-message', (msg)=>{

        socket.broadcast.emit('chat-message', {
            message:msg, 
            name:users[socket.id]
        });

    });






    socket.on('disconnect',()=>{
        socket.broadcast.emit('user-disconnected',users[socket.id]);
        delete users[socket.id];
        console.log("client disconnected : with socket id : "+socket.id);
    })

});

server.listen(3000,()=>{
    console.log("server socket run in port 3000");
})