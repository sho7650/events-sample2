#!/usr/bin/env node
const nforce = require("./nforce.js");

nforce.org((org, event) => {
  // connecting and set a topic
  const client = org.createStreamClient();
  const accs = client.subscribe({
    topic: process.env.TOPIC,
    isEvent: true, // you MUST set TRUE for subscribing Platform Events.
    replayId: -1, // you MUST set it.
  });

  // CONNECTED
  client.on("connect", () => {
    console.log("streaming client transport: up");
  });

  // DISCONNECTED
  client.on("disconnect", (data) => {
    console.log("streaming disconnect: " + data.reason);
    console.log("disconnect data", data);
  });

  // SUBSCRIPTION ERROR
  accs.on("error", (err) => {
    console.log("subscription error");
    console.log(err);
    client.disconnect();
  });

  // getting an event
  accs.on("data", (data) => {
    console.log(data);
  });
});
