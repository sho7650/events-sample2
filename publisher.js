#!/usr/bin/env node

const jwt = require('./jwt');

jwt.login((conn) => {
  let msg = { 'Name': 'Publish test' };
  let i = 2;

  do {
    if (process.argv.length > 2) { msg.Name = process.argv[i]; }

    console.log(`new account name = ${msg.Name}`);
    conn.sobject('Account').create(msg, (err, ret) => {
      if (err || !ret.success) { console.error(err, ret); }
    });
  } while (++i < process.argv.length);

});
