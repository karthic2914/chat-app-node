const path = require('path');
const http = require('http');
//call express
const express = require('express');
//socket io
const socketIO = require('socket.io');

const app = express();

const {generateMessage,generateLocationMessage} = require('./utils/message' );
const {isRealString} = require('./utils/validations');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname,'../public');

const port = process.env.PORT || 3000;
//use http
const server = http.createServer(app);
//use io
const io = socketIO(server);
//user
const users = new Users();

app.use(express.static(publicPath));

//on method is register the an event listener using arrow fuction (Call back)
io.on('connection',(socket)=>{
  console.log('New user connected');
  socket.on('connect', () =>{
    console.log('Connected to Client');
  });
  socket.on('disconnect', () =>{
    console.log('Disconnected from Client');
  });

socket.on('join',(params, callback) =>{
    if(!isRealString(params.name) || !isRealString(params.room)){
      callback('Name and room name are required');
    }
    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('newMessage',generateMessage('Admin ','Welcome to Chat App'));
    socket.broadcast.emit('newMessage',generateMessage('Admin ',`${params.name} has joined.`));
    callback();
  });


  socket.on('createMessage', (message , callback)=>{
    console.log('createMessage',message);
    //will emit every to every single connectin
    io.emit('newMessage',generateMessage(message.from, message.text));
    callback();
    //broadcast where every one will get message there are two arg first is event name and second one is object
  });

socket.on('createLocMesg',(coords)=>{
  io.emit('newLocationMessage',generateLocationMessage('Admin ', coords.latitude, coords.longitude));
});
socket.on('disconnect', () => {
  var user = users.removeUser(socket.id);

  if (user) {
    io.to(user.room).emit('updateUserList', users.getUserList(user.room));
    io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
  }
});

});

//server listen (emit)
server.listen(port , () =>{
  console.log(`Server is Up on port ${port}` );
})
