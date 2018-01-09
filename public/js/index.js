var socket = io();

socket.on('connect', () =>{
  console.log('Connected to server');
});
//disconnect event
socket.on('disconnect', () =>{
  console.log('Disconnected from server');
});

socket.on('newMessage', (message)=>{
  console.log('newMessage', message);
  var li = $(`<li></li>`);
  li.text(`${message.from} : ${message.text}`)
  $('#messages').append(li);
})
socket.on('newLocationMessage', (message)=>{
  const li = $(`<li></li>`);
  const a  = $(`<a target = "_blank"> My Current Location</a>`);

  li.text(`${message.from};`);
  a.attr('href',message.url);
  li.append(a);
  $('#messages').append(li);
})

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
