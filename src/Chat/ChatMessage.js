import React, { useState, useEffect } from "react";
import "./Chat.css";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: "#343A40",
    opacity: 0.7,
    width:"16px",
    height:"16px",
    fontSize:"12px",
    marginRight:"3px"
  },
}));

function ChatMessage(props) {
  const classes = useStyles();
  const { text } = props.message;
  return (<>
    <div>
    <a style={{"display":"flex"}}>
    <Avatar aria-label="recipe" className={classes.avatar}>
      {props.sender.charAt(0).toUpperCase()}
    </Avatar>
    <a style={{"font-size":"12px"}}>{props.sender}</a>
    </a>
    <div class="message">
    <a style={{"font-size":"14px"}}>{text}</a>
    </div>
    </div>
  </>)
}

export default ChatMessage;
