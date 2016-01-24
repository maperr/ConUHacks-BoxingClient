/*$.ajax({
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
});*/

$(function() {
  $("#addHashtag").click(function() {
    new NewTweet();

    if($("#message").val().trim())
      $("#current-hashtags").append("<span>" + $("#message").val() + ", </span>");
      //TODO: tell client to follow this hashtag

  });

  var client = new FilterClient();

  client.onNewTweet = function(tweet) {
      //TODO: jQuery manipulations
  }

  client.onStatUpdate = function(stats) {
      //TODO: jQuery manipulations
  }

});

NewTweet = function(tweet) {
  var numberOfPostsToShow = 5;
  
  obj = "<li class='received tweet' id='messageList1'>" +
                '<img src="http://placehold.it/32x32" />' +
                '<h4>DiplayName</h4>'+
                '<h5>@Username</h5>'+
                '<h6>Time</h6>' +
                '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dictum interdum ante non gravida. Duis fringilla pulvinar mi, non vestibulum felis dapibus non. Nunc elementum eleifend pretium. Phasellus mattis felis.</p>'+
            '</li>';
  $("#messages").prepend(obj);
  if($(".tweet").length > numberOfPostsToShow){
    $(".tweet").last().remove();
  }
}

FilterClient = function() {
  this.onNewTweet = function(tweet) {
    console.log('You must override this event handler');
  }

  this.onStatUpdate = function(stats) {
    console.log('You must override this event handler');
  }
}

FilterClient.prototype.connect = function() {
  this.socket = new WebSocket('ws://:1338');

  var that = this;

  this.socket.onopen = function() {
    console.log('Connected to the tweet filter');
  }

  this.socket.onclose = function() {
    console.log('Connection to the tweet filter closed');
  }

  this.socket.onmessage = function(event) {
      var response = JSON.parse(event.data);

      if(response.command == "NEW_TWEET"){
          that.onNewTweet(response.payload);
      } else if(response.command == "STATS_RESPONSE") {
        that.onStatUpdate(response.payload);
      }
  }
}

FilterClient.prototype.requestStats = function() {
  this.socket.send(JSON.stringify({
    command : 'STATS_REQUEST',
    payload : {}
  }));



  /*var x = 0;
  $.getJSON("https://api.twitter.com/1.1/trends/place.json?id=1", function(result) {
      console.log(++x);
      $.each(result, function(i, field) {

            console.log(field);
      });
  });*/



  // var socket = new WebSocket('');


  // socket.onopen = function() {

  // }

  // socket.onclose = function () {
    
  // }

  // socket.onmessage = function(event) {

  // }


};

