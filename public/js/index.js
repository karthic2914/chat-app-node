var socket = io();

socket.on('connect', () =>{
  console.log('Connected to server');
});
//disconnect event
socket.on('disconnect', () =>{
  console.log('Disconnected from server');
});

socket.on('newMessage', function(message){
  console.log('newMessage', message);
  var li = $(`<li></li>`);
  li.text(`${message.from}: ${message.text}`)
  $('#messages').append(li);
})
jQuery('#message-form').submit(function(e){
  e.preventDefault();
  socket.emit('createMessage', {
    from:'User',
    text:jQuery('[name=message]').val()
  }, function(){

  });
});
