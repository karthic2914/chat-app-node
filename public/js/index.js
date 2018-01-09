var socket = io();

socket.on('connect', () =>{
  console.log('Connected to server');
});
//disconnect event
socket.on('disconnect', () =>{
  console.log('Disconnected from server');
});

socket.on('newMessage', (message)=>{
  const formatTime = moment(message.createAt).format('h:mm a');
  const template = $('#message-template').html();
  const html = Mustache.render(template, {
    text:message.text,
    from:message.from,
    createdAt:formatTime,
  });
  $('#messages').append(html);
});

socket.on('newLocationMessage', (message)=>{
  const formatTime = moment(message.createAt).format('h:mm a');
  const template = $('#location-message-template').html();
  const html = Mustache.render(template, {
    from:message.from,
    url:message.url,
    createdAt:formatTime,
  });
  $('#messages').append(html);
});
jQuery('#message-form').submit(function(e){
  e.preventDefault();
  const messageTextBox = $('[name=message]');
  socket.emit('createMessage', {
    from:'User',
    text:messageTextBox.val()
  }, function(){
    messageTextBox.val('')
  });
});

const locButton = $('#send-locate');
locButton.on('click', () =>{
    if(!navigator.geolocation){
      return alert('GeoLocation not support by the browser');
    }
locButton.attr('disabled','disabled').text('Sending location....');
  navigator.geolocation.getCurrentPosition(function (position){
    locButton.removeAttr('disabled').text('Sending location');
    socket.emit('createLocMesg',{
      latitude:position.coords.latitude,
      longitude:position.coords.longitude
    })
  }, function(){
    locButton.removeAttr('disabled').text('Sending location');
    alert("Unable to fetch Location");
  })
})
