const firebaseAdmin = require('firebase-admin');
var serviceAccount = require('../../credentials/firebase/firebase-silkroad.json');

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: 'https://silkroad-8362d-default-rtdb.firebaseio.com',
});

const firebaseDatabase = firebaseAdmin.database();

module.exports = {
  db: firebaseDatabase
}