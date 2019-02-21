require('dotenv').config();
var jsforce = require('jsforce');

var conn = new jsforce.Connection({
  loginUrl : 'https://login.salesforce.com'
});

conn.login(process.env.SFDC_USERNAME, process.env.SFDC_PASSWORD, (err, userInfo) => {
  if (err) { return console.error(err); }
  
  console.log('login successfully.');
  console.log(JSON.stringify(userInfo));
  console.log('Start subscription');

  conn.streaming.topic(process.env.TOPIC).subscribe((message) => {
   console.log('Received :' + JSON.stringify(message, null, 2));
  });


});
