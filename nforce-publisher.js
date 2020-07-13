#!/usr/bin/env node
const nforce = require("./nforce.js");

nforce.org((org, event) => {
  process.argv.slice(2, process.argv.length).forEach((arg) => {
    event.set("dummy__c", arg);

    org.insert({ sobject: event }, (err, res) => {
      if (err) {
        console.log("error:");
        console.log(err);
      } else {
        console.log("success:");
        console.log(res);
      }
    });
  });
});
