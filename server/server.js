const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;

//call express
const express = require('express');
//socket io
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message');

const app = express();
app.use(express.static(publicPath));

//use http
const server = http.createServer(app);
//use io
const io = socketIO(server);

//on method is register the an event listener using arrow fuction (Call back)
io.on('connection',(socket)=>{
  console.log('New user connected');
  socket.on('connect', () =>{
    console.log('Connected to Client');
  });
  socket.on('disconnect', () =>{
    console.log('Disconnected from Client');
  });
  //socket.emit is  single connection
  socket.emit('newMessage',generateMessage('Admin','Wecome to Chat App'));
  //socket.broadcast.emit from admin text new user joined
  socket.broadcast.emit('newMessage',generateMessage('Admin','New User Joined'));
  // socket.emit('newEmail',{
  //   from:'mahadevan_k@hcl.com',
  //   text:'Hi This is mahadevan',
  //   createAt:123
  // });

  // socket.on('createEmail', (newEmail)=>{
  //   console.log('createEmail', newEmail);
  // });
  socket.on('createMessage', (message)=>{
    console.log('createMessage',message);
    //will emit every to every single connectin
    io.emit('newMessage',generateMessage(message.from, message.text))
    //broadcast where every one will get message there are two arg first is event name and second one is object

    // socket.broadcast.emit('newMessage',{
    //      from:message.from,
    //      text:message.text,
    //      createdAt: new Date().getTime()
    // })
  });



});

//server listen (emit)
server.listen(port , () =>{
  console.log(`Server is Up on port ${port}` );
})
