const functions = require('firebase-functions');
const express = require('express');

const app = express();

//User functions
const { signup } = require('./handlers/users');

//User routes
app.post('/signup', signup);

exports.api = functions.region('us-east1').https.onRequest(app); 