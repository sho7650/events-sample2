require('dotenv').config();
var jsforce = require('jsforce');

var conn = new jsforce.Connection({
  loginUrl : 'https://login.salesforce.com'
});

conn.login(process.env.SFDC_USERNAME, process.env.SFDC_PASSWORD, function(err, userInfo) {
  if (err) { return console.error(err); }

  console.log('Start subscription');

  conn.streaming.topic("/event/Notification__e").subscribe(function(message) {
   console.log('Received :' + JSON.stringify(message, null, 2));
  });


});
