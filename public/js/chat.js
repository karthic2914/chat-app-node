var socket = io();

function scrollToBottom () {
  // Selectors
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child')
  // Heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function () {
  var params = jQuery.deparam(window.location.search);

  socket.emit('join', params, function (err) {
    if (err) {
      alert(err);
      window.location.href = '/';
    } else {
      console.log('No error');
    }
  });
});
//disconnect event
socket.on('disconnect', () =>{
  console.log('Disconnected from server');
});

socket.on('updateUserList', function (users) {
  var ol = jQuery('<ol></ol>');

  users.forEach(function (user) {
    ol.append(jQuery('<li></li>').text(user));
  });

  jQuery('#users').html(ol);
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
  scrollToBottom();
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
  scrollToBottom();
});
jQuery('#message-form').submit(function(e){
  e.preventDefault();
  const messageTextBox = $('[name=message]');
  socket.emit('createMessage', {
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
