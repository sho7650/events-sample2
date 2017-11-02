/*
 * publisher.js
 */

require('dotenv').config();
var jsforce = require('jsforce');

var conn = new jsforce.Connection({
  loginUrl : 'https://login.salesforce.com'
});

// login to salesforce
// TODO: adopt JWT
conn.login(process.env.SFDC_USERNAME, process.env.SFDC_PASSWORD, function(err, userInfo) {
  if (err) { return console.error(err); }

  var msg = {Message__c: "Publish test"};
  var i = 2;

  do {
    console.log(msg.Message__c);
    if (process.argv.length > 2) { msg.Message__c = process.argv[i]; }

    conn.sobject("Notification__e").create(msg, function(err, ret) {
      if (err || !ret.success) { return console.error(err, ret); }
    });
  } while (++i < process.argv.length);

});
