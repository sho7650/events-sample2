#!/usr/bin/env node
const nforce = require("nforce");
require("dotenv").config();

// set a org information to login
const org = nforce.createConnection({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: process.env.REDIRECT_URL,
  apiVersion: process.env.API_VERSION,
  environment: process.env.ENV,
  mode: "single", // Platform Event MUST set a "single" mode
  autoRefresh: true,
});
// put a connected application information
console.log(org);

const user = process.env.USER_ID;
const pass = process.env.PASSWORD;

// login and getting streaming events
org.authenticate({ username: user, password: pass }, function (err, oauth) {
  if (err) return console.log(err);

  // put an oauth information
  console.log(oauth);

  // connecting and set a topic
  const client = org.createStreamClient();
  const accs = client.subscribe({
    topic: process.env.TOPIC,
    isEvent: true, // you MUST set TRUE for subscribing Platform Events.
    replayId: -2, // you MUST set it.
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
