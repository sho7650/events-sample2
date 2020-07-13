#!/usr/bin/env node
const nforce = require("./nforce.js");

nforce.org((org, event) => {
  console.log(event);
  event.set("dummy__c", "test");
  console.log(event);

  org.insert({ sobject: event }, (err, res) => {
    if (!err) console.log(res);
    console.log(err);
  });
});
