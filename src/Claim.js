import React, { useState, useEffect } from "react";
import "./App.css";
import "./Claim.css"
import TextField from "@material-ui/core/TextField";
import ReactTooltip from "react-tooltip";
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
import Slider from "@material-ui/core/Slider";
import { makeStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { withUAL } from "ual-reactjs-renderer";
import { Modal } from "react-bootstrap";

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
  const [showadd, setShowAdd] = useState(false);
  const [showedit, setShowEdit] = useState(false);
  const [showcreate, setShowCreate] = useState(false);

  const [addsymbol, setAddSymbol] = useState("");
  const [adddecimals, setAddDecimals] = useState("");
  const [addcontractname, setAddContractname] = useState("");
  const [adduserinput, setAddUserInput] = useState(1);
  const [addpoolid, setAddPoolId] = useState("");
  const [addslidermax, setAddSliderMax] = useState(100);

  const [poolname, setPoolName] = useState("");
  const [pooldescription, setPoolDescription] = useState("");
  const [contractname, setContractName] = useState("");
  const [claimamount, setClaimAmount] = useState("");

  const [modifypoolname, setModifyPoolName] = useState("");
  const [modifypooldescription, setModifyPoolDescription] = useState("");
  const [modifycontractname, setModifyContractName] = useState("");
  const [modifyclaimamount, setModifyClaimAmount] = useState("");
  const [modifypoolid, setModifyPoolId] = useState("");

  const handleShowAdd = (symbol, contract, poolid) => {
    fetch("https://api.main.alohaeos.com:443/v1/chain/get_table_rows", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        json: true,
        code: contract,
        table: "accounts",
        scope: displayaccountname(),
        limit: 1,
      }),
    }).then((response) =>
      response.json().then((balance) => setAddSliderMax(Number(balance["rows"][0].balance.split(" ")[0])))
    );
    setShowAdd(true);
    setAddSymbol(symbol.split(" ")[1])
    setAddDecimals(symbol.split(" ")[0].split(".")[1].length)
    setAddContractname(contract)
    setAddPoolId(poolid)
  }
  const handleCloseAdd = () => {
    setShowAdd(false);
    setAddUserInput(1)
  };

  const handleShowEdit = (id) => {
    setShowEdit(true);
    setModifyPoolId(id)
  }
  const handleCloseEdit = () => {
    setShowEdit(false);
  };

  const handleShowCreate = () => {
    setShowCreate(true);
  }
  const handleCloseCreate = () => {
    setShowCreate(false);
  };


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
    return (
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
          style={{ "padding-bottom": "5px" }}
        >
          <Typography style={{ fontSize: "20px", "font-weight": "500" }}>
            Token pools
            </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            style={{ "margin-top": "6px" }}
          >
            Eden members are eligible to claim tokens from the pools below. Each member is able to claim once from each pool.
            </Typography>
          <div class="claimheaderbuttonrow">
            <BootstrapButton
              color="inherit"
              variant="outline-dark"
              style={{
                "font-weight": "bold",
                borderRadius: "15px",
                padding: "5px 20px 5px 20px",
                fontSize: "14px",
                marginRight: "5px"
              }}
              onClick={() => claimall()}
            >
              Claim all
              </BootstrapButton>
            <BootstrapButton
              onClick={() => handleShowCreate()}
              color="inherit"
              variant="outline-dark"
              style={{
                "font-weight": "bold",
                borderRadius: "15px",
                padding: "5px 20px 5px 20px",
                fontSize: "14px"
              }}
            >
              Create Pool
              </BootstrapButton>
          </div>
        </CardContent>
      </Card>
    )
  }

  const cards = () => {
    if (pooldata[0]) {
      console.log(pooldata)
      return Object.keys(pooldata).map(key =>
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
                padding: "5px 20px 5px 20px",
                fontSize: "14px",
              }}
              onClick={() => claim(pooldata[key].poolid)}
            >
              Claim
              </BootstrapButton>
            <div class="buttonsright">
              <AddBoxIcon onClick={() => handleShowAdd(pooldata[key].totalamount, pooldata[key].contractname, pooldata[key].poolid)} />
              <DeleteIcon onClick={() => deletepool(pooldata[key].poolid)} />
              <EditIcon onClick={() => handleShowEdit(pooldata[key].poolid)} />
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
      timer: 10000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: "success",
      title: "Transaction processed!",
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


  const creationsuccess = () => {
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
      title: "Pool successfully created!",
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
                clmamount: claimamount,
              },
            },
          ],
        };
        // The activeUser.signTransaction will propose the passed in transaction to the logged in Authenticator
        await activeUser.signTransaction(transaction, {
          broadcast: true,
          expireSeconds: 300,
        });


        creationsuccess();

      } catch (error) {

        actionpuccis(error);
        console.log(error.message);

      }
    } else {
      showModal();
    }
  };

  const transfer = async () => {
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
              account: addcontractname,
              name: "transfer",
              authorization: [
                {
                  actor: displayaccountname(), // use account that was logged in
                  permission: "active",
                },
              ],
              data: {
                to: "consortiumlv",
                from: displayaccountname(),
                quantity: adduserinput + "." + "0".repeat(adddecimals) + " " + addsymbol, //adduserinput + "." + adddecimals*"0" + " " + addsymbol,
                memo: addpoolid,
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
                poolid: modifypoolid,
                poolname: modifypoolname,
                pooldescr: modifypooldescription,
                contractname: modifycontractname,
                clmamount: modifyclaimamount,
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
      <Modal show={showadd} onHide={handleCloseAdd} centered>
        <Modal.Header closeButton>
        <Typography
          style={{
            fontSize: "22px",
            "font-weight": "bold",
            "margin-left": "7px",
            "margin-bottom": "5px",
          }}
          data-html="true"
          data-for="signalprogress"
          data-tip={
            "Add tokens to the pool."
          }
        >
          <ReactTooltip
            id="signalprogress"
            type="dark"
            effect="solid"
            backgroundColor="black"
            place="bottom"
          />
          Add to {addsymbol} pool.
          <FontAwesomeIcon
            icon={faInfoCircle}
            style={{
              height: "16px",
              width: "16px",
              color: "black",
              "margin-bottom": "6px",

              opacity: "0.7",
              "margin-left": "2px",
            }}
          />
        </Typography>
        </Modal.Header>
        <Modal.Body>
          <a>You are adding: {adduserinput} {addsymbol}.</a>
          <Slider
            defaultValue={1}
            aria-label="custom thumb label"
            step={1}
            min={1}
            max={addslidermax}
            onChangeCommitted={(e, val) => setAddUserInput(val)}
            style={{
              marginBottom: "10px",
              "margin-top": "10px",
              color: "black",
            }}
          />
            <BootstrapButton
              variant="dark"
              style={{
                "font-weight": "bold",
                borderRadius: "15px",
                height: "38px",
                fontSize: "15px",
                width: "97%",
                "margin-top": "10px",
              }}
              onClick={() => transfer()}
            >
              Add to pool
                </BootstrapButton>
        </Modal.Body>
      </Modal>

      <Modal show={showedit} onHide={handleCloseEdit} centered>
        <Modal.Header closeButton>
        <Typography
          style={{
            fontSize: "22px",
            "font-weight": "bold",
            "margin-left": "7px",
            "margin-bottom": "5px",
          }}
          data-html="true"
          data-for="signalprogress"
          data-tip={
            "Modify pool"
          }
        >
          <ReactTooltip
            id="signalprogress"
            type="dark"
            effect="solid"
            backgroundColor="black"
            place="bottom"
          />
          Modify pool
          <FontAwesomeIcon
            icon={faInfoCircle}
            style={{
              height: "16px",
              width: "16px",
              color: "black",
              "margin-bottom": "6px",

              opacity: "0.7",
              "margin-left": "2px",
            }}
          />
        </Typography>
        </Modal.Header>
        <Modal.Body>
          <a
            style={{
              "font-weight": "500",
            }}
            data-html="true"
            data-for="jobu"
            data-tip={"Please insert name of the pool"}
          >
            <TextField
              style={{ width: "97%", margin: "7px" }}
              label={"Name of the pool"}
              onBlur={(text) => setModifyPoolName(text.target.value)}
              defaultValue={""}
              id="outlined-basic"
              variant="outlined"
              autoComplete="off"
            />
            <ReactTooltip
              id="jobu"
              type="dark"
              effect="solid"
              backgroundColor="black"
              place="top"
            />
          </a>

          <a
            style={{
              "font-weight": "500",
            }}
            data-html="true"
            data-for="jobu4"
            data-tip={
              "Please insert pool description"
            }
          >
            <TextField
              style={{ width: "97%", margin: "7px" }}
              label={"Pool description"}
              onBlur={(text) => setModifyPoolDescription(text.target.value)}
              defaultValue={""}
              id="outlined-basic"
              variant="outlined"
              autoComplete="off"
            />
            <ReactTooltip
              id="jobu4"
              type="dark"
              effect="solid"
              backgroundColor="black"
              place="top"
            />
          </a>

          <a
            style={{
              "font-weight": "500",
            }}
            data-html="true"
            data-for="jobu3"
            data-tip={
              "Please insert the contract name"
            }
          >
            <TextField
              style={{ width: "97%", margin: "7px" }}
              label={"Contract name"}
              onBlur={(text) => setModifyContractName(text.target.value)}
              id="outlined-basic"
              defaultValue={""}
              variant="outlined"
              autoComplete="off"
            />
            <ReactTooltip
              id="jobu3"
              type="dark"
              effect="solid"
              backgroundColor="black"
              place="top"
            />
          </a>

          <a
            style={{
              "font-weight": "500",
            }}
            data-html="true"
            data-for="jobu2"
            data-tip={
              "Please insert the claim amount."
            }
          >
            <TextField
              style={{ width: "97%", margin: "7px" }}
              label={"Claim amount"}
              onBlur={(text) => setModifyClaimAmount(text.target.value)}
              defaultValue={""}
              id="outlined-basic"
              variant="outlined"
              autoComplete="off"
            />
          </a>
          <ReactTooltip
            id="jobu2"
            type="dark"
            effect="solid"
            backgroundColor="black"
            place="top"
          />
          <br />

          <center>
            <BootstrapButton
              variant="dark"
              style={{
                "font-weight": "bold",
                borderRadius: "15px",
                height: "38px",
                fontSize: "15px",
                width: "97%",
                "margin-top": "10px",
              }}
              onClick={() => modifypool()}
            >
              Modify pool
                </BootstrapButton>
          </center>
        </Modal.Body>
        <hr
          style={{
            width: "90%",
            "margin-top": "9px",
            "margin-bottom": "10px",
          }}
        />
        <center>
          {" "}
          <Typography
            style={{
              fontSize: "12px",
              "margin-bottom": "16px",
              "font-weight": "bold",
            }}
          >
            {" "}
            Pools stored on
                <a href="https://bloks.io/account/consortiumlv"> consortiumlv</a>
          </Typography>
        </center>
      </Modal>

      <Modal show={showcreate} onHide={handleCloseCreate} centered>
      <Modal.Header>
        <Typography
          style={{
            fontSize: "22px",
            "font-weight": "bold",
            "margin-left": "7px",
            "margin-bottom": "5px",
          }}
          data-html="true"
          data-for="comad"
          data-tip={
            "*Any EOS account holder can create a pool.  <br/><br /> *Minor manual configuration of smart contracts are needed, <br /> in case the token in the pool is new. <br/><br /> *There are no fees to create a pool."
          }
        >
          <ReactTooltip
            id="comad"
            type="dark"
            effect="solid"
            backgroundColor="black"
            place="bottom"
          />
         Create a pool
          <FontAwesomeIcon
            icon={faInfoCircle}
            style={{
              height: "16px",
              width: "16px",
              color: "black",
              "margin-bottom": "6px",

              opacity: "0.7",
              "margin-left": "2px",
            }}
          />
        </Typography>
        </Modal.Header>
        <Modal.Body>
          <a
            style={{
              "font-weight": "500",
            }}
            data-html="true"
            data-for="jobu"
            data-tip={"Please insert name of the pool"}
          >
            <TextField
              style={{ width: "97%", margin: "7px" }}
              label={"Name of the pool"}
              onBlur={(text) => setPoolName(text.target.value)}
              defaultValue={""}
              id="outlined-basic"
              variant="outlined"
              autoComplete="off"
            />
            <ReactTooltip
              id="jobu"
              type="dark"
              effect="solid"
              backgroundColor="black"
              place="top"
            />
          </a>

          <a
            style={{
              "font-weight": "500",
            }}
            data-html="true"
            data-for="jobu4"
            data-tip={
              "Please insert pool description"
            }
          >
            <TextField
              style={{ width: "97%", margin: "7px" }}
              label={"Pool description"}
              onBlur={(text) => setPoolDescription(text.target.value)}
              defaultValue={""}
              id="outlined-basic"
              variant="outlined"
              autoComplete="off"
            />
            <ReactTooltip
              id="jobu4"
              type="dark"
              effect="solid"
              backgroundColor="black"
              place="top"
            />
          </a>

          <a
            style={{
              "font-weight": "500",
            }}
            data-html="true"
            data-for="jobu3"
            data-tip={
              "Please insert the contract name associated with the tokens in the pool."
            }
          >
            <TextField
              style={{ width: "97%", margin: "7px" }}
              label={"Contract name"}
              onBlur={(text) => setContractName(text.target.value)}
              id="outlined-basic"
              defaultValue={""}
              variant="outlined"
              autoComplete="off"
            />
            <ReactTooltip
              id="jobu3"
              type="dark"
              effect="solid"
              backgroundColor="black"
              place="top"
            />
          </a>

          <a
            style={{
              "font-weight": "500",
            }}
            data-html="true"
            data-for="jobu2"
            data-tip={
              "Please insert amount that the Eden members will be able to claim (exact decimals eg. 1.0000 EOS)."
            }
          >
            <TextField
              style={{ width: "97%", margin: "7px" }}
              label={"Claim amount"}
              onBlur={(text) => setClaimAmount(text.target.value)}
              defaultValue={""}
              id="outlined-basic"
              variant="outlined"
              autoComplete="off"
            />
          </a>
          <ReactTooltip
            id="jobu2"
            type="dark"
            effect="solid"
            backgroundColor="black"
            place="top"
          />
          <br />

          <center>
            <BootstrapButton
              variant="dark"
              style={{
                "font-weight": "bold",
                borderRadius: "15px",
                height: "38px",
                fontSize: "15px",
                width: "97%",
                "margin-top": "10px",
              }}
              onClick={() => createpool()}
            >
              Create pool
                </BootstrapButton>
          </center>
        </Modal.Body>
        <hr
          style={{
            width: "90%",
            "margin-top": "9px",
            "margin-bottom": "10px",
          }}
        />
        <center>
          {" "}
          <Typography
            style={{
              fontSize: "12px",
              "margin-bottom": "16px",
              "font-weight": "bold",
            }}
          >
            {" "}
                Pools stored on
                <a href="https://bloks.io/account/consortiumlv"> consortiumlv</a>
          </Typography>
        </center>
      </Modal>
    </div>

  );
}

export default withUAL(Claim);

