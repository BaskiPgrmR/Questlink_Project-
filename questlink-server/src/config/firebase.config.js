const admin = require('firebase-admin');
const path = require('path');
require('dotenv').config();

const serviceAccountPath = path.resolve(__dirname, '../../serviceAccount.json');
const serviceAccount = require(serviceAccountPath);

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;