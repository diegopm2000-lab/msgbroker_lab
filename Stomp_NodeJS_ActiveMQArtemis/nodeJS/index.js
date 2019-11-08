var Stomp = require('stompjs');

// Use raw TCP sockets
var client = Stomp.overTCP('localhost', 61613);
// uncomment to print out the STOMP frames
// client.debug = console.log;

var queue = "jms.queue.myPOCQueue";

client.connect('artemis', 'password', function(frame) {
  console.log('connected to Stomp');

  client.subscribe(queue, function(message) {
    console.log("received message " + message.body);

    // once we get a message, the client disconnects
    //Si ponemos disconnect, como no hay nadie conectado a la cola, no se muestra en el hawtio!!!! tocatelos!
    //client.disconnect();
  });

  console.log ('sending a message');
  client.send(queue, {}, 'Hello, node.js with Stomp <--> ActiveMQ Artemis !');
  console.log('mensaje enviado!');
}, function(error){
  console.log("STOMP error:"+error);
});
