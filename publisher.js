#!/usr/bin/env node

const jwt = require("./jwt");

jwt.login((conn) => {
  let msg = { dummy__c: "Publish test" };

  process.argv.slice(2, process.argv.length).forEach((arg) => {
    msg.dummy__c = arg;

    console.log(`event message = ${msg.dummy__c}`);
    conn.sobject(process.env.TOPIC).create(msg, (err, ret) => {
      if (err) {
        console.log(err);
      } else {
        console.log(ret);
      }
    });
  });
});
