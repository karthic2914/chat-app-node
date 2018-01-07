var socket = io();

socket.on('connect', () =>{
  console.log('Connected to server');

  socket.emit('createMessage',{
    from:'Maha',
    to:'Say Hi'
  });
});
//disconnect event
socket.on('disconnect', () =>{
  console.log('Disconnected from server');
})

//email demo
socket.on('newEmail', (email) =>{
  console.log('New Email', email.from);
});
socket.on('newMessage', (message) =>{
  console.log('newMessage', message);
});
