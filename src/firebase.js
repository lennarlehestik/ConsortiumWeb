import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCQBj-ByBt1KwiGFEkHtmpKPRD-uqfKfw4",
  authDomain: "pureconso.firebaseapp.com",
  databaseURL: "https://pureconso.firebaseio.com",
  projectId: "pureconso",
  storageBucket: "pureconso.appspot.com",
  messagingSenderId: "955450426119",
  appId: "1:955450426119:web:cf6e5368724773ac46bba2",
  measurementId:"UA-122820312-2"
};

firebase.initializeApp(config);
firebase.analytics();

export default firebase;
