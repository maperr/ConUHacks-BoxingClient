$.ajax({
  url: 'https://api.twitter.com/oauth/request_token',
  type: 'POST',
  beforeSend: function (xhr) {
      xhr.setRequestHeader('oauth_consumer_key', "qco0kTVO5GHh37T7FKeI4ACSa");
      xhr.setRequestHeader('oauth_token', "2582787825-eMclz0Yc2bcPWqoHUMKk4NpyQrUmVkkg2qREgh0");
  },
  dataType: 'jsonp',
  success: function (data) {
      alert(data);
  }
});

$(function() {
  var x = 0;
  $.getJSON("https://api.twitter.com/1.1/trends/place.json?id=1", function(result) {
      console.log(++x);
      $.each(result, function(i, field) {

            console.log(field);
      });
  });

  // var socket = new WebSocket('');


  // socket.onopen = function() {

  // }

  // socket.onclose = function () {
    
  // }

  // socket.onmessage = function(event) {

  // }


});

