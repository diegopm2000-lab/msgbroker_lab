#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://user:bitnami@localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'Executed';

    ch.assertQueue(q, {durable: false});
    // Note: on Node 6 Buffer.from(msg) should be used
    ch.sendToQueue(q, new Buffer('Hello World Executed!'));
    console.log(" [x] Sent 'Hello World Executed!'");
    setTimeout(function() { conn.close(); process.exit(0) }, 500);

  });
});
