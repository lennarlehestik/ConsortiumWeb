import React, { useState, useEffect, useRef } from "react";
import "./Chat.css";
import ChatMessage from "./ChatMessage";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import ChatIcon from "@material-ui/icons/Chat";
import SendIcon from "@material-ui/icons/Send";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyCQBj-ByBt1KwiGFEkHtmpKPRD-uqfKfw4",
  authDomain: "pureconso.firebaseapp.com",
  databaseURL: "https://pureconso.firebaseio.com",
  projectId: "pureconso",
  storageBucket: "pureconso.appspot.com",
  messagingSenderId: "955450426119",
  appId: "1:955450426119:web:cf6e5368724773ac46bba2",
  measurementId: "G-4EK9VDM08C",
});

const auth = firebase.auth();
const firestore = firebase.firestore();

function Chat(props) {
  const [isOpened, setIsOpened] = useState(false);
  const messagesRef = firestore.collection(props.scope);
  const query = messagesRef.orderBy("createdAt").limitToLast(35);

  const [messages] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  const openclose = () => {
    if (isOpened) {
      setIsOpened(false);
    } else if (!isOpened) {
      setIsOpened(true);
    } else if (!isOpened) {
      setIsOpened(true);
      setTimeout(
        () => dummy.current.scrollIntoView({ behavior: "smooth" }),
        500
      );
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      sender: props.user,
    });

    setFormValue("");
  };
  const dummy = useRef();
  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div>
      <ChatIcon class="openchat" onClick={() => openclose()}>
        Chat
      </ChatIcon>
      <div class="chatbox" style={{ display: isOpened ? "initial" : "none" }}>
        <div class="messages">
          <main>
            {messages &&
              messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} sender={msg.sender} />
              ))}
          </main>
        </div>
        <div class="inputform">
          <form onSubmit={sendMessage} style={{ width: "100%" }}>
            <input
              value={formValue}
              onChange={(e) => setFormValue(e.target.value)}
              placeholder="Say something..."
              class="inputfield"
            />

            <button type="submit" disabled={!formValue} class="sendingbutton">
              <SendIcon />
            </button>
          </form>
          <span ref={dummy}></span>
        </div>
      </div>
    </div>
  );
}

export default Chat;
