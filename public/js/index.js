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
  li.text(`${message.from}: ${message.text}`)
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
  socket.emit('createMessage', {
    from:'User',
    text:jQuery('[name=message]').val()
  }, function(){

  });
});

const locButton = $('#send-locate');
locButton.on('click', () =>{
    if(!navigator.geolocation){
      return alert('GeoLocation not support by the browser');
    }

  navigator.geolocation.getCurrentPosition(function (position){
    socket.emit('createLocMesg',{
      latitude:position.coords.latitude,
      longitude:position.coords.longitude
    })
  }, function(){
    alert("Unable to fetch Location");
  })
})
