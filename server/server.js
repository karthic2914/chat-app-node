const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
//call express
const express = require('express');
//socket io
const socketIO = require('socket.io');
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
  // socket.emit('newEmail',{
  //   from:'mahadevan_k@hcl.com',
  //   text:'Hi This is mahadevan',
  //   createAt:123
  // });
socket.emit('newMessage',{
  from:'Vidya',
  text:'I love you'
})
  // socket.on('createEmail', (newEmail)=>{
  //   console.log('createEmail', newEmail);
  // });
  socket.on('createMessage', (message)=>{
    console.log('createMessage',message);
  })
});

//server listen (emit)
server.listen(port , () =>{
  console.log(`Server is Up on port ${port}` );
})
