const nforce = require("nforce");
require("dotenv").config();
const user = process.env.USER_ID;
const pass = process.env.PASSWORD;

// set a org information to login
exports.org = function (callback) {
  const org = nforce.createConnection({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URL,
    apiVersion: process.env.API_VERSION,
    environment: process.env.ENV,
    mode: "single", // Platform Event MUST set a "single" mode
    autoRefresh: true,
  });
  // put a connected application information
  console.log(org);

  // login and getting streaming events
  org.authenticate({ username: user, password: pass }, (err, oauth) => {
    if (err) return console.log(err);

    // put an oauth information
    console.log(oauth);
    const event = nforce.createSObject(process.env.TOPIC);

    callback(org, event);
  });
};
