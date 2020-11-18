import React, { useState, useEffect } from "react";
import "./Chat.css";
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyCQBj-ByBt1KwiGFEkHtmpKPRD-uqfKfw4",
authDomain: "pureconso.firebaseapp.com",
databaseURL: "https://pureconso.firebaseio.com",
projectId: "pureconso",
storageBucket: "pureconso.appspot.com",
messagingSenderId: "955450426119",
appId: "1:955450426119:web:cf6e5368724773ac46bba2",
measurementId: "G-4EK9VDM08C"

});

const auth = firebase.auth();
const firestore = firebase.firestore();


function Chat(props) {
  return(
    <div>a</div>
  )
}

export default Chat;
