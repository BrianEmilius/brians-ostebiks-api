const firebase = require("firebase");

const firebaseConfig = {
  apiKey: "AIzaSyCdIpSFjPXBZLh8Op1Tg47fMU6FVPYeykk",
  authDomain: "cheese-api-7d3c7.firebaseapp.com",
  databaseURL: "https://cheese-api-7d3c7.firebaseio.com",
  projectId: "cheese-api-7d3c7",
  storageBucket: "cheese-api-7d3c7.appspot.com",
  messagingSenderId: "1084797610953",
  appId: "1:1084797610953:web:5ac10f11b211302d8b5618"
};

const db = firebase.initializeApp(firebaseConfig);

module.exports = db;
