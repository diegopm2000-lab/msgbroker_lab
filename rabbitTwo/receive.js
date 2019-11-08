#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://user:bitnami@localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'Accepted';

    console.log("Esperando de la cola de Accepted");

    ch.assertQueue(q, {durable: false});
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
    ch.consume(q, function(msg) {
        console.log(" [x] Received %s", msg.content.toString());
    }, {noAck: true});
  });

  conn.createChannel(function(err, ch) {
    var q = 'Executed';

    console.log("Esperando de la cola de Executed");

    ch.assertQueue(q, {durable: false});
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
    ch.consume(q, function(msg) {
        console.log(" [x] Received %s", msg.content.toString());
    }, {noAck: true});
  });
});
