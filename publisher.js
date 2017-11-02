require('dotenv').config();
var jsforce = require('jsforce');

var conn = new jsforce.Connection({
  loginUrl : 'https://login.salesforce.com'
});

conn.login(process.env.SFDC_USERNAME, process.env.SFDC_PASSWORD, function(err, userInfo) {
  if (err) { return console.error(err); }

  conn.sobject("Notification__e").create({Message__c: "Publish test"}, function(err, ret) {
    if (err || !ret.success) { return console.error(err, ret); }
  });
});
