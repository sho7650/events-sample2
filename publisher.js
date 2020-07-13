#!/usr/bin/env node

const jwt = require("./jwt");

jwt.login((conn) => {
  let msg = { dummy__c: "Publish test" };
  let i = 2;

  do {
    if (process.argv.length > 2) {
      msg.dummy__c = process.argv[i];
    }

    console.log(`event message = ${msg.dummy__c}`);
    conn.sobject(process.env.TOPIC).create(msg, (err, ret) => {
      if (err) {
        console.log(err);
      } else {
        console.log(ret);
      }
    });
  } while (++i < process.argv.length);
});
