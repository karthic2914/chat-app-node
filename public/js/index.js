var socket = io();

socket.on('connect', () =>{
  console.log('Connected to server');


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
