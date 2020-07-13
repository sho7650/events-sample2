#!/usr/bin/env node

const jwt = require("./jwt");
const jsforce = require("jsforce");

jwt.login((conn) => {
  console.log("Start subscription");

  const topic = `/event/${process.env.TOPIC}`;
  const replayExt = new jsforce.StreamingExtension.Replay(topic, -2);
  const fayeClient = conn.streaming.createClient([replayExt]);

  console.log(`topic: ${topic}`);
  console.log(fayeClient);

  fayeClient.subscribe(topic, (message) => {
    console.log("Event Type : " + message.event.type);
    console.log("Event Created : " + message.event.createdDate);
    console.log("Object Id : " + message.sobject.Id);
    console.log(`Received: ${JSON.stringify(message, null, 2)}\n`);
  });
});
