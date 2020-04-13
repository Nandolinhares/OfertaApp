var admin = require("firebase-admin");

var serviceAccount = require("../ofertaapp-86a41-firebase-adminsdk-iimyb-9d4da10ea5.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ofertaapp-86a41.firebaseio.com"
});

const db = admin.firestore();

module.exports = { admin, db };