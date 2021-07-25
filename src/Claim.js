import React, { useState, useEffect } from "react";
import "./App.css";
import "./Claim.css"
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Swal from "sweetalert2";
import AddBoxIcon from '@material-ui/icons/AddBox';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Button as BootstrapButton } from "react-bootstrap";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import { makeStyles } from "@material-ui/core/styles";

import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { withUAL } from "ual-reactjs-renderer";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: "auto",
    bottom: 0,
  },
  avatar: {
    backgroundColor: "#00003C",
  },
  grow: {
    flexGrow: 1,
  },
  media: {
    height: 0,
    paddingTop: "30%", // 16:9
  },
  fabButton: {
    position: "absolute",
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: "0 auto",
  },
  offset: {
    ...theme.mixins.toolbar,
    flexGrow: 1,
  },
}));

function Claim(props) {
  const {
    ual: { showModal, hideModal, logout },
  } = props;

  const [accountname, setAccountName] = useState("");
  const [pooldata, setPooldata] = useState({ rows: [] });
  const [pooldescription, setPoolDescription] = useState("");
  const [poolname, setPoolName] = useState("");
  const [clmamount, setClmAmount] = useState("");
  const [contractname, setContractName] = useState("");




  const {
    ual: { activeUser },
  } = props;
  if (activeUser) {
    const accountName = activeUser.getAccountName();
    accountName.then(function (result) {
      setAccountName(result);
    });
  }
  const displayaccountname = () => {
    if (accountname) {
      return accountname;
    }
  };

  const logmeout = () => {
    logout();
    window.location.reload(false);
  };

  const classes = useStyles();


  const AppBarOffset = () => {
    return <div className={classes.offset} />;
  };


  useEffect(() => {
    fetch("https://api.main.alohaeos.com:443/v1/chain/get_table_rows", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        json: true,
        code: "consortiumlv",
        table: "pooltable",
        scope: "consortiumlv",
        limit: 100,
      }),
    }).then((response) =>
      response.json().then((pooldata) => setPooldata(pooldata["rows"]))
    );
  }, pooldata[0]);

  const logbutton = () => {
    if (accountname) {
      //IF WE HAVE A SESSIONRESULT, SHOW LOGIN BUTTON
      return (
        <div>
          <Button
            color="inherit"
            onClick={() => logmeout()}
            style={{ "border-radius": "50px" }}
          >
            Log out
          </Button>
          <Button
            color="inherit"
            id="logoutname"
            style={{ "border-radius": "50px" }}
          >
            {displayaccountname()}
          </Button>
        </div>
      );
    } else {
      //IF THERE IS NO SESSIONRESULT WE SHOW LOGIN BUTTON
      return (
        <Button color="inherit" onClick={showModal}>
          Log in
        </Button>
      );
    }
  };

  function makeint() {
    var result = "";


    result = Math.floor(Math.random() * 99999999);
    return result;

  }

  const headercard = () => {
    return(
      <Card
          className={classes.root}
          style={{
            marginBottom: "7px",
            "padding-bottom": "10px",
            borderRadius: "20px",
            marginTop: "5px",
          }}
        >
          <CardMedia
            className={classes.media}
            image={"https://i.ibb.co/WxjRR3Q/eden.png"}
            title="Community image"
          />
                    <CardContent
            style={{ "padding-bottom": "5px"}}
          >
            <Typography style={{ fontSize: "20px", "font-weight": "500" }}>
              Claim tokens
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              style={{ "margin-top": "6px" }}
            >
              You can claim tokens.
            </Typography>
          <div class="claimheaderbuttonrow">
          <BootstrapButton
          onClick={() => claimall()}
                color="inherit"
                variant="outline-dark"
                style={{
                  "font-weight": "bold",
                  borderRadius: "15px",
                  padding:"5px 20px 5px 20px",
                  fontSize: "14px",
                }}
              >
                Claim all
              </BootstrapButton>
          </div>
          </CardContent>
        </Card>
    )
  }

  const cards = () => {
    if(pooldata[0]){
      return Object.keys(pooldata).map( key => 
        <div class="claimcard">
                <div class="claimcardtitle">{pooldata[key].poolname}</div>
                <div class="claimcarddescription">{pooldata[key].pooldescr}</div>
                <div class="claimamounts">Total tokens in pool: {pooldata[key].totalamount}</div>
                <div class="claimamounts">Available to claim: {pooldata[key].clmamount}</div>
                <div class="buttonrow">
                <BootstrapButton
                color="inherit"
                variant="outline-dark"
                style={{
                  "font-weight": "bold",
                  borderRadius: "15px",
                  padding:"5px 20px 5px 20px",
                  fontSize: "14px",
                }}
              >
                Claim
              </BootstrapButton>
                <div class="buttonsright">
                  <AddBoxIcon/>
                  <DeleteIcon onClick={() => deletepool(pooldata[key].poolid)}/>
                  <EditIcon/>
                </div>
              </div>
              </div>
      )
    }
  }


  const actionpuccis = (err) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "center",
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: "error",
      title: err,
    });
  };



  const sucesssvote = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: "center",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: "success",
      title: "Success!",
    });
  };

  const sucesspoll = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: "center",
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: "success",
      title: "Tokens successfully claimed!",
    });
  };


  const loadingpoll = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: "center",
      showConfirmButton: false,
      timer: 35000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: "info",
      title: "Opening wallet...",
    });
  };

  const createpool = async () => {
    const {
      ual: { login, displayError, showModal },
    } = props;
    // Via static contextType = UALContext, access to the activeUser object on this.context is now available
    const {
      ual: { activeUser },
    } = props;

    const poolid = makeint();

    if (activeUser) {
      loadingpoll();
      try {
        const transaction = {
          actions: [
            {
              account: "consortiumlv",
              name: "createpool",
              authorization: [
                {
                  actor: displayaccountname(), // use account that was logged in
                  permission: "active",
                },
              ],
              data: {
                creator: displayaccountname(),
                poolid: poolid,
                poolname: poolname,
                pooldescr: pooldescription,
                contractname: contractname,
                clmamount: clmamount,
              },
            },
          ],
        };
        // The activeUser.signTransaction will propose the passed in transaction to the logged in Authenticator
        await activeUser.signTransaction(transaction, {
          broadcast: true,
          expireSeconds: 300,
        });


        sucesspoll();

      } catch (error) {

        actionpuccis(error);
        console.log(error.message);

      }
    } else {
      showModal();
    }
  };

  const modifypool = async () => {
    const {
      ual: { login, displayError, showModal },
    } = props;
    // Via static contextType = UALContext, access to the activeUser object on this.context is now available
    const {
      ual: { activeUser },
    } = props;

    const poolid = makeint();

    if (activeUser) {
      loadingpoll();
      try {
        const transaction = {
          actions: [
            {
              account: "consortiumlv",
              name: "modifypool",
              authorization: [
                {
                  actor: displayaccountname(), // use account that was logged in
                  permission: "active",
                },
              ],
              data: {
                creator: displayaccountname(),
                poolid: poolid,
                poolname: poolname,
                pooldescr: pooldescription,
                contractname: contractname,
                clmamount: clmamount,
              },
            },
          ],
        };
        // The activeUser.signTransaction will propose the passed in transaction to the logged in Authenticator
        await activeUser.signTransaction(transaction, {
          broadcast: true,
          expireSeconds: 300,
        });


        sucesspoll();

      } catch (error) {

        actionpuccis(error);
        console.log(error.message);

      }
    } else {
      showModal();
    }
  };


  const claim = async (poolid) => {
    const {
      ual: { login, displayError, showModal },
    } = props;
    // Via static contextType = UALContext, access to the activeUser object on this.context is now available
    const {
      ual: { activeUser },
    } = props;


    if (activeUser) {
      loadingpoll();
      try {
        const transaction = {
          actions: [
            {
              account: "consortiumlv",
              name: "claimtokens",
              authorization: [
                {
                  actor: displayaccountname(), // use account that was logged in
                  permission: "active",
                },
              ],
              data: {
                claimer: displayaccountname(),
                poolid: poolid,

              },
            },
          ],
        };
        //window.location.reload(false);
        // The activeUser.signTransaction will propose the passed in transaction to the logged in Authenticator
        await activeUser.signTransaction(transaction, {
          broadcast: true,
          expireSeconds: 300,
        });
        //alert("GREAT SUCCESS!")
        //window.location.reload(false);

        sucesssvote()

      } catch (error) {

        actionpuccis(error);
        console.log(error.message);

      }
    } else {
      showModal();
    }
  };



  const deletepool = async (poolid) => {
    const {
      ual: { login, displayError, showModal },
    } = props;
    // Via static contextType = UALContext, access to the activeUser object on this.context is now available
    const {
      ual: { activeUser },
    } = props;


    if (activeUser) {
      loadingpoll();
      try {
        const transaction = {
          actions: [
            {
              account: "consortiumlv",
              name: "deletepool",
              authorization: [
                {
                  actor: displayaccountname(), // use account that was logged in
                  permission: "active",
                },
              ],
              data: {
                creator: displayaccountname(),
                poolid: poolid,

              },
            },
          ],
        };
        //window.location.reload(false);
        // The activeUser.signTransaction will propose the passed in transaction to the logged in Authenticator
        await activeUser.signTransaction(transaction, {
          broadcast: true,
          expireSeconds: 300,
        });
        //alert("GREAT SUCCESS!")
        //window.location.reload(false);

        sucesssvote()

      } catch (error) {

        actionpuccis(error);
        console.log(error.message);

      }
    } else {
      showModal();
    }
  };



  const claimall = async () => {
    const {
      ual: { login, displayError, showModal },
    } = props;
    // Via static contextType = UALContext, access to the activeUser object on this.context is now available
    const {
      ual: { activeUser },
    } = props;

    const claimids = []
    pooldata.forEach((i) => {
      claimids.push(i.poolid)
    })


    if (activeUser) {
      loadingpoll();
      try {
        const transaction = {
          actions: [
            {
              account: "consortiumlv",
              name: "claimall",
              authorization: [
                {
                  actor: displayaccountname(), // use account that was logged in
                  permission: "active",
                },
              ],
              data: {
                claimer: displayaccountname(),
                poolid: claimids,

              },
            },
          ],
        };
        //window.location.reload(false);
        // The activeUser.signTransaction will propose the passed in transaction to the logged in Authenticator
        await activeUser.signTransaction(transaction, {
          broadcast: true,
          expireSeconds: 300,
        });
        //alert("GREAT SUCCESS!")
        //window.location.reload(false);

        sucesssvote()

      } catch (error) {

        actionpuccis(error);
        console.log(error.message);

      }
    } else {
      showModal();
    }
  };

  return (
    <div style={{ "font-family": "roboto" }}>
      <div class="desktopmenu">
        <div className={classes.root}>
          <AppBar
            position="fixed"
            color="transparent"
            style={{ "background-color": "white", height: "64px" }}
          >
            <Toolbar>
              <IconButton component={Link} to={"/"}>
                <img
                  src="/logo.png"
                  width="66"
                  class="d-inline-block align-top"
                  style={{
                    "margin-bottom": 0,
                    "margin-left": 2,
                    opacity: 0.7,
                  }}
                ></img>
              </IconButton>
              <Typography
                variant="h6"
                style={{
                  color: "black",
                  "text-decoration": "none",
                  "margin-top": "4px",
                  "font-weight": "600",
                  "margin-left": "3px",
                  fontFamily: "arial",
                  "font-size": "21px",
                  opacity: 0.7,
                  width: "200px",
                }}
                className={classes.title}
                component={Link}
                to={"/"}
              ></Typography>

              {logbutton()}
            </Toolbar>
          </AppBar>
          <AppBarOffset />
        </div>
      </div>
      <div class="app">
          {headercard()}
          {cards()}
        </div>
    </div>

  );
}

export default withUAL(Claim);

