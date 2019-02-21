/*
 * publisher.js
 */

require('dotenv').config();
const jsforce = require('jsforce');

const conn = new jsforce.Connection({
  loginUrl : 'https://login.salesforce.com'
});

// login to salesforce
// TODO: adopt JWT
conn.login(process.env.SFDC_USERNAME, process.env.SFDC_PASSWORD, (err, userInfo) => {
  if (err) { return console.error(err); }

  console.log('login successfully.');
  console.log(JSON.stringify(userInfo));

  let msg = {'Name': 'Publish test'};
  let i = 2;

  do {
    console.log(msg.Name);
    if (process.argv.length > 2) { msg.Name = process.argv[i]; }

    conn.sobject("Account").create(msg, (err, ret) => {
      if (err || !ret.success) { return console.error(err, ret); }
    });
  } while (++i < process.argv.length);

});
