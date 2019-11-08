#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://user:bitnami@localhost', function(err, conn) {

  console.log(conn);
  conn.createChannel(function(err, ch) {
    var q = 'Accepted';

    ch.assertQueue(q, {durable: false});
    // Note: on Node 6 Buffer.from(msg) should be used
    ch.sendToQueue(q, new Buffer('Hello World Accepted!'));
    console.log(" [x] Sent 'Hello World Accepted!'");
    setTimeout(function() { conn.close(); process.exit(0) }, 500);

  });
});
