'use strict';

// libraries
const jwt = require('jsonwebtoken');
const jsforce = require('jsforce');
const request = require('request');

// .env
// PRIVATE_KEY: private key by base64
// ISSUER: consumer key from connected application
// AUDIENCE: https://login.salesforce.com
// SUBJECT: login user name like an e-mail address type
require('dotenv').config();

// define
const TOKEN_ENDPOINT_URL = 'https://login.salesforce.com/services/oauth2/token';

// sign
const secret = Buffer.from(process.env.PRIVATE_KEY, 'base64');
const claim = {
  iss: process.env.ISSUER,
  aud: process.env.AUDIENCE,
  sub: process.env.SUBJECT,
  exp: Math.floor(Date.now() / 1000) + (3 * 60) // Salesforce の仕様上 5分未満を指定
};

const token = jwt.sign(claim, secret, { algorithm: 'RS256' });

// login salesforce with JWT
exports.login = function (callback) {
  // prepare loging in
  const post = {
    method: 'POST',
    url: TOKEN_ENDPOINT_URL,
    form: {
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: token
    }
  };

  // request to login
  request(post, function (err, response, body) {
    if (err) {
      return console.error(err);
    }
    const ret = JSON.parse(body);
    if (ret.error) {
      return console.error(`login error: ${ret.error_description}`);
    }

    const conn = new jsforce.Connection({
      accessToken: ret.access_token,
      instanceUrl: ret.instance_url
    });
    console.log('login successfully.');

    callback(conn);
  });
};