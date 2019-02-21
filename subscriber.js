/*
 * publisher.js
 */
const jwt = require('./jwt');

jwt.login((conn) => {
  console.log('Start subscription');

  conn.streaming.topic('/data/AccountChangeEvent').subscribe((message) => {
    console.log(`Received : ${JSON.stringify(message, null, 2)}\n`);
  });
});