import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCV6n1PbfWeOQJg4505AtYGyLa5Sk3bM2Q",
    authDomain: "phone-auth-317f2.firebaseapp.com",
    projectId: "phone-auth-317f2",
    storageBucket: "phone-auth-317f2.appspot.com",
    messagingSenderId: "613974628909",
    appId: "1:613974628909:web:839a8332d30146c51b36a4"
  };
  firebase.initializeApp(firebaseConfig);
  var auth = firebase.auth();
  export {auth , firebase};