import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AnchorLink from "anchor-link";
import AnchorLinkBrowserTransport from "anchor-link-browser-transport";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { withUAL } from "ual-reactjs-renderer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";
import ShareIcon from "@material-ui/icons/Share";
import ReactTooltip from "react-tooltip";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import ReactGA from "react-ga";
import * as clipboard from "clipboard-polyfill/text";
import { Modal } from "react-bootstrap";
import Input, { InputLabel, InputAdornment } from "@material-ui/core/Input";

import {
  faTelegram,
  faTwitter,
  faGithub,
  faMedium,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { Button as BootstrapButton } from "react-bootstrap";

//STYLES FOR EVERYTHING

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
  bottomBar: {
    bottom: "auto",
  },
  grow: {
    flexGrow: 1,
  },
  avatar: {
    backgroundColor: "#00003C",
  },
  media: {
    height: 0,
    paddingTop: "25%", // 16:9
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

function App(props) {
  const {
    ual: { showModal, hideModal, logout },
  } = props;

  const classes = useStyles();
  const [data, setData] = useState({ rows: [] });
  const [searchvalue, setSearch] = useState();
  const [totalstaked, setTotalStaked] = useState({ rows: [] });
  const [isOpened, setIsOpened] = useState(true);
  const [totalcircu, setTotalCircu] = useState({ rows: [] });
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [communitysubmission, setCommunitySubmission] = useState("");
  const [descriptionsubmission, setDescriptionSubmission] = useState("");
  const [symbolsubmission, setSymbolSubmission] = useState("");
  const [backgroundsubmission, setBackgroundSubmission] = useState("");
  const [supplysubmission, setSupplySubmission] = useState("");
  const [logosubmission, setLogoSubmission] = useState("");

  const AppBarOffset = () => {
    return <div className={classes.offset} />;
  };
  const [accountname, setAccountName] = useState("");
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

  function toggle() {
    setIsOpened((wasOpened) => !wasOpened);
  }

  const logmeout = () => {
    logout();
    window.location.reload(false);
  };

  const stakeformatter = (stakenumber) => {
    if (stakenumber < 1000) {
      return stakenumber;
    }
    if (stakenumber > 1000 && stakenumber < 1000000) {
      return (stakenumber / 1000).toFixed(0) + "k";
    }
    if (stakenumber > 1000000) {
      return (stakenumber / 1000000).toFixed(1) + "m";
    }
  };

  const gettotalcircu = () => {
    if (totalcircu.rows[0]) {
      return Math.floor(Number(totalcircu.rows[0].supply.split(" ")[0]));
    }
  };

  const handleClose = () => {
    setShow(false);
    setCommunitySubmission("");
    setDescriptionSubmission("");
    setSymbolSubmission("");
    setBackgroundSubmission("");
    setSupplySubmission("");
    setLogoSubmission("");
  };

  const handleShow = () => setShow(true);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const tonexthalving = (totalcirc) => {
    if (totalcirc < 100000000) {
      return 100000000 - totalcirc;
    } else if (totalcirc >> 100000000 && totalcirc < 125000000) {
      return 125000000 - totalcirc;
    } else if (totalcirc >> 125000000 && totalcirc < 150000000) {
      return 150000000 - totalcirc;
    } else if (totalcirc >> 150000000 && totalcirc < 175000000) {
      return 175000000 - totalcirc;
    } else if (totalcirc >> 175000000 && totalcirc < 200000000) {
      return 200000000 - totalcirc;
    } else if (totalcirc >> 200000000 && totalcirc < 225000000) {
      return 250000000 - totalcirc;
    } else if (totalcirc >> 225000000 && totalcirc < 250000000) {
      return 275000000 - totalcirc;
    } else if (totalcirc >> 250000000 && totalcirc < 275000000) {
      return 300000000 - totalcirc;
    } else if (totalcirc >> 275000000 && totalcirc < 300000000) {
      return 325000000 - totalcirc;
    } else if (totalcirc >> 300000000 && totalcirc < 325000000) {
      return 350000000 - totalcirc;
    } else if (totalcirc >> 325000000 && totalcirc < 350000000) {
      return 375000000 - totalcirc;
    }
  };

  function makeid() {
    var result = "";
    var characters = "abcdefghijklmnopqrstuvwxyz1234";
    var charactersLength = characters.length;
    for (var i = 0; i < 12; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;

    document.getElementById("eos").textContent = result;
  }

  const halvingdivider = () => {
    if (totalcircu.rows[0]) {
      return parseInt(
        Math.pow(
          2,
          parseInt(
            Math.floor(Number(totalcircu.rows[0].supply.split(" ")[0])) /
            25000000
          )
        )
      );
    }
  };

  const halvings = (totalcirc) => {
    if (totalcirc < 100000000) {
      return 0;
    } else if (totalcirc >> 100000000 && totalcirc < 125000000) {
      return 0;
    } else if (totalcirc >> 125000000 && totalcirc < 150000000) {
      return 1;
    } else if (totalcirc >> 150000000 && totalcirc < 175000000) {
      return 2;
    } else if (totalcirc >> 175000000 && totalcirc < 200000000) {
      return 3;
    } else if (totalcirc >> 200000000 && totalcirc < 225000000) {
      return 4;
    } else if (totalcirc >> 225000000 && totalcirc < 250000000) {
      return 5;
    } else if (totalcirc >> 250000000 && totalcirc < 275000000) {
      return 6;
    } else if (totalcirc >> 275000000 && totalcirc < 300000000) {
      return 7;
    } else if (totalcirc >> 300000000 && totalcirc < 325000000) {
      return 8;
    } else if (totalcirc >> 325000000 && totalcirc < 350000000) {
      return 9;
    }
  };
  //"http://api.eosn.io/v1/chain/get_table_rowzzzzzzzzzz"
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
        table: "stat",
        scope: "GOVRN",
        limit: 1,
      }),
    }).then((response) =>
      response.json().then((totalcircu) => setTotalCircu(totalcircu))
    );
  }, totalcircu["rows"][0]);
  function sumArray(arr) {
    return arr.reduce((sum, n) => sum + n);
  }
  const commsortingalgo = (arr) => {
    arr.rows.sort((a, b) =>
      parseInt(a.staked.slice(0, -6) < parseInt(b.staked.slice(0, -6)) ? 1 : -1)
    );
    setData(arr);
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
        table: "commdata",
        scope: "consortiumlv",
        limit: 50,
      }),
    }).then((response) =>
      response.json().then((datar) => commsortingalgo(datar))
    );
    //.then(restoreSession())
  }, data["rows"][0]);

  const getcommunityurl = (community) => {
    const url = window.location.origin + "/community/" + community;
    clipboard.writeText(url);

    const Toast = Swal.mixin({
      toast: true,
      position: "middle",

      showConfirmButton: false,
      timer: 1300,
      timerProgressBar: false,
      onOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "success",
      title: "Community link copied to clipboard",
    });
  };

  useEffect(() => {
    ReactGA.initialize("UA-160289361-1");
    ReactGA.pageview(window.location);

    fetch("https://api.main.alohaeos.com:443/v1/chain/get_table_rows", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        json: true,
        code: "consortiumlv",
        table: "totalstk",
        scope: "consortiumlv",
        limit: 1,
      }),
    }).then((response) =>
      response.json().then((totalstaked) => setTotalStaked(totalstaked))
    );
  }, totalstaked["rows"][0]);

  const actionpuccis = (err) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "middle",
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

  const loadingpoll = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: "middle",
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
      title: "Opening wallet to confirm addition of a community.",
    });
  };

  const addcommunity = async () => {
    const {
      ual: { login, displayError, showModal },
    } = props;
    // Via static contextType = UALContext, access to the activeUser object on this.context is now available
    const {
      ual: { activeUser },
    } = props;

    const uniquename = makeid();

    if (activeUser) {
      loadingpoll();
      try {
        const transaction = {
          actions: [
            {
              //account: "consortiumtt",
              //name: "addcommuus",
              account: "consortiumlv",
              name: "addcommuus",
              authorization: [
                {
                  actor: displayaccountname(), // use account that was logged in
                  permission: "active",
                },
              ],
              data: {
                communityname: communitysubmission,
                community: uniquename,
                description: descriptionsubmission,
                backgroundurl: backgroundsubmission,
                tokenurl: logosubmission,
                tokensymbol: symbolsubmission,
                fetch1: ["empty"],
                fetch2: ["empty"],
                fetch3: ["empty"],
                creator: displayaccountname(),
                totalcirculation: supplysubmission,
              },
            },
          ],
        };
        // The activeUser.signTransaction will propose the passed in transaction to the logged in Authenticator
        await activeUser.signTransaction(transaction, {
          broadcast: true,
          expireSeconds: 300,
        });
        //alert("GREAT SUCCESS!")
        window.location.reload(false);
        ReactGA.event({
          category: "Chain acion",
          action: "User added comm.",
        });
      } catch (error) {

        actionpuccis(error);
        console.log(error.message);

      }
    } else {
      showModal();
    }
  };

  /* ANCHOR CONNECTION */

  /*
  const transport = new AnchorLinkBrowserTransport()
  // initialize the link, this time we are using the TELOS chain
  const link = new AnchorLink({transport,
      chainId: '5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191',
      rpc: 'https://kylin-dsp-2.liquidapps.io'
  })

  const identifier = 'consortiumlv'
  let session;
  const restoreSession = () => {
    link.restoreSession(identifier).then((result) => {
        setSessionResult(result)
    })
  }


  // login and store session if sucessful
  const login = () => {
    link.login(identifier).then((result) => {
        session = result.session
        setSessionResult(session)
        window.location.reload(false)
    })
  }

    // logout and remove session from storage
    const logout = () => {
        setSessionResult()
    }
*/

  const logbutton = () => {
    if (accountname) {
      //IF WE HAVE A SESSIONRESULT, SHOW LOGIN BUTTON
      return (
        <div>
          <Button
            color="inherit"
            onClick={() => logmeout()}
            style={{ "border-radius": "15px" }}
          >
            Log out
          </Button>
          <Button
            color="inherit"
            id="logoutname"
            style={{ "border-radius": "15px" }}
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

  const pollcost = (cost) => {
    return (
      <div>
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
            "* After you add the community it will immediately appear on the frontpage of Consortium.  <br/><br /> * The more GOVRN is staked for the community the higher the priority for configuration. <br /> For instance, if Ethereum communities will have the most GOVRN staked, that will serve <br /> as a signal for Consortium DAC that this chain should be supported next. <br/><br /> *Any social organization can acquire GOVRN and stake it for their community to signal <br/> willingness to have mutual project with Consortium DAC."
          }
        >
          <ReactTooltip
            id="comad"
            type="dark"
            effect="solid"
            backgroundColor="black"
            place="bottom"
          />
          Community addition
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
        <a
          style={{
            "font-weight": "500",
            opacity: "0.5",
            "margin-left": "7px",
          }}
        >
          {" "}
          Addition cost: {cost} GOVRN
        </a>
        <br />

        <a
          style={{
            "font-weight": "500",
            opacity: "0.5",
            "margin-left": "7px",
          }}
        >
          Affiliate reward: 2%
        </a>
        <ReactTooltip
          id="afrew"
          type="dark"
          effect="solid"
          backgroundColor="black"
          place="bottom"
        />
        <FontAwesomeIcon
          icon={faInfoCircle}
          style={{
            height: "16px",
            width: "16px",
            color: "black",
            "margin-bottom": "6px",

            opacity: "0.6",
            "margin-left": "2px",
            "font-weight": "600",
          }}
          data-html="true"
          data-for="afrew"
          data-tip={
            "Affiliate reward is transferred automatically to the account that added the community. <br/><br /> Reward amount (GOVRN) = All the Vote and Poll rewards community generates * Affiliate reward (%)."
          }
        />
      </div>
    );
  };

  const showusername = () => {
    if (activeUser) {
      return displayaccountname();
    }
  };

  const gettotalstaked = () => {
    if (totalstaked.rows[0]) {
      return Math.floor(Number(totalstaked.rows[0].totalstaked.split(" ")[0]));
    }
  };

  const pollrewards = (fullstake, communitystake) => {
    return parseInt(
      //(Math.pow(communitystake / fullstake, 1 / 3) * 8225000 + 1175000) /
      (Math.pow(communitystake / fullstake, 1 / 3) * 102812 + 14687) /
      //(Math.pow(communitystake / fullstake, 1 / 3) * 1 + 1) /
      halvingdivider()
    ); //LISA KUUP JUUR communitystake/fullstake sellele
  };

  const voterewards = (fullstake, communitystake) => {
    return parseFloat(
      //(Math.pow(communitystake / fullstake, 1 / 3) * 315000 + 45000) /
      (Math.pow(communitystake / fullstake, 1 / 3) * 472 + 67) /
      halvingdivider()
    ).toFixed(4); //LISA KUUP JUUR communitystake/fullstake sellele
  };


  //var str1 = ".png ";
  //var str2 = {u.communityname.substring(0, 90)};    return(<a>{totalstaked.rows[0].totalstaked}</a>)

  //var res = str1.concat(str2);
  //#2A3747"

  const pollcostarv = () => {
    if (totalcircu.rows[0]) {
      return 800000 / halvingdivider();
    }
  };

  return (
    <div class="frontpagefull">
      <div class="desktopmenu">
        <div className={classes.root}>
          <AppBar
            position="fixed"
            color="transparent"
            style={{
              "background-color": "white",
              height: "64px",
            }}
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

              <Button
                style={{ color: "inherit", "border-radius": "50px" }}
                href={`${window.location.origin}/claim`}
              >
                CLAIM TOKENS
              </Button>

              <Button
                style={{ color: "inherit", "border-radius": "50px" }}
                //onClick={() => addcommunity()}  <Modal.Header closeButton>{pollcost(pollcostarv())}</Modal.Header>
                onClick={handleShow}
              >
                Add community
              </Button>

              {logbutton()}
            </Toolbar>
          </AppBar>
          <AppBarOffset />
        </div>
      </div>

      <div class="frontapp">
        <div></div>

        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>{pollcost(pollcostarv())}</Modal.Header>
          <Modal.Body>
            <a
              style={{
                "font-weight": "500",
              }}
              data-html="true"
              data-for="jobu"
              data-tip={"Please insert name of the community"}
            >
              <TextField
                style={{ width: "97%", margin: "7px" }}
                label={"Community name"}
                onBlur={(text) => setCommunitySubmission(text.target.value)}
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
                "Please insert community description that will partly appear on the frontpage and the community page"
              }
            >
              <TextField
                style={{ width: "97%", margin: "7px" }}
                label={"Community description"}
                onBlur={(text) => setDescriptionSubmission(text.target.value)}
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
                "Please insert the symbol of the token that will be used for voting"
              }
            >
              <TextField
                style={{ width: "97%", margin: "7px" }}
                label={"Token symbol"}
                onBlur={(text) => setSymbolSubmission(text.target.value)}
                id="outlined-basic"
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
                "Please provide URL for the community image. The correct resolution is 1500x450. We ourselves use pinata.cloud to upload the images to IPFS."
              }
            >
              <TextField
                style={{ width: "97%", margin: "7px" }}
                label={"Community background image"}
                onBlur={(text) => setBackgroundSubmission(text.target.value)}
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

            <a
              style={{
                "font-weight": "500",
              }}
              data-html="true"
              data-for="jobu22"
              data-tip={
                "Please provide URL for the token logo. You can download the image from Newdex or Defibox and use pinata.cloud to upload the image to IPFS."
              }
            >
              <TextField
                style={{ width: "97%", margin: "7px" }}
                label={"Token logo"}
                onBlur={(text) => setLogoSubmission(text.target.value)}
                id="outlined-basic"
                variant="outlined"
                autoComplete="off"
              />
              <ReactTooltip
                id="jobu22"
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
              data-for="jobu1"
              data-tip={
                "Please insert the total circulating supply of the token that will be used for voting"
              }
            >
              <TextField
                style={{ width: "97%", margin: "7px" }}
                label={"Total circulating supply"}
                onBlur={(text) => setSupplySubmission(text.target.value)}
                id="outlined-basic"
                variant="outlined"
                autoComplete="off"
              />
              <ReactTooltip
                id="jobu1"
                type="dark"
                effect="solid"
                backgroundColor="black"
                place="top"
              />
            </a>
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
                onClick={() => addcommunity()}
              >
                Add community
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
              Community data is stored fully
              <a href="https://bloks.io/account/consortiumlv"> on-chain</a>
            </Typography>
          </center>
        </Modal>

        <div
          className={classes.root}
          style={{
            "margin-bottom": "10px",
            "margin-top": "10px",
            display: "flex",
            "padding-left": "14px",
            "padding-right": "14px",
          }}
        >
          <Autocomplete
            id="Community search"
            options={data.rows}
            getOptionLabel={(option) => option.communityname}
            onChange={(event, value) =>
              value ? setSearch(value.community) : setSearch("")
            }
            style={{ width: "100%" }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Community name"
                variant="outlined"
                className="inputRounded"
                style={{
                  backgroundColor: "white",
                  borderRadius: "15px",
                }}
              />
            )}
          />
          <BootstrapButton
            href={
              typeof searchvalue == "undefined"
                ? "/"
                : `${window.location}community/${searchvalue}`
            }
            variant="dark"
            color="inherit"
            textAlign="right"
            style={{
              "margin-left": "5px",
              borderRadius: "15px",
              fontSize: "15px",
              "font-weight": "bold",
              "padding-top": "15px",
              opacity: "0.9",
            }}
          >
            <a style={{ "margin-top": "20px" }}>Search</a>
          </BootstrapButton>
        </div>
        <div class="claimbuttonwrapper">
          <BootstrapButton
            variant="dark"
            color="inherit"
            textAlign="right"
            style={{
              borderRadius: "15px",
              fontSize: "15px",
              "font-weight": "bold",
              "padding": "15px",
              "width": "100%",
              opacity: "0.9",
            }}
            id="claimbutton"

            //style={{ color: "inherit", "border-radius": "50px" }}
            href={`${window.location.origin}/claim`}
          >
            CLAIM TOKENS
          </BootstrapButton>
        </div>

        <div class="parent">

          {data.rows.map((u, i) => {
            return (
              <div class="frontpagecard">
                <div class="col">
                  <Card
                    className={classes.root}
                    style={{
                      borderRadius: "15px",
                    }}
                  >
                    <CardHeader
                      avatar={
                        <img
                          src={u.tokenurl}
                          width="36px"
                          height="36px"
                          marginRight="0px"
                        ></img>
                      }
                      action={
                        <IconButton
                          aria-label="settings"
                          onClick={() => getcommunityurl(u.community)}
                        >
                          <ShareIcon style={{ opacity: 0.8 }} />
                        </IconButton>
                      }
                      title={u.communityname}
                      subheader={u.tokensymbol}
                    />

                    <a href={`${window.location}community/${u.community}`}>
                      <CardMedia
                        className={classes.media}
                        image={u.backgroundurl}
                        title="Community image"
                      />
                    </a>

                    <CardContent style={{ "padding-bottom": "14px" }}>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        style={{ "margin-bottom": "10px", height: "50px" }}
                      >
                        {u.description.substring(0, 90)}
                        {u.description.length > 90 ? " ..." : ""}
                      </Typography>
                      <div>
                        <hr />
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                          style={{ "font-weight": "700" }}
                        >
                          Total staked:{" "}
                          <a style={{ float: "right" }}>
                            {stakeformatter(parseFloat(u.staked))} GOVRN
                          </a>
                        </Typography>

                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          Voting reward:
                          <a style={{ float: "right" }}>
                            {voterewards(gettotalstaked(), parseInt(u.staked))}{" "}
                            GOVRN
                          </a>
                        </Typography>

                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          Poll reward:
                          <a style={{ float: "right" }}>
                            {pollrewards(gettotalstaked(), parseInt(u.staked))}{" "}
                            GOVRN
                          </a>
                        </Typography>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              //        Total staked: {stakeformatter(parseFloat(u.staked))} GOVRN
            );
          })}
        </div>
      </div>

      <div class="bottommenu">
        <AppBar
          position="fixed"
          className={classes.appBar}
          color="transparent"
          style={{ "background-color": "white", height: "65px" }}
        >
          {isOpened && (
            <div
              id="drop"
              class="dropdown-content2"
              style={{
                "font-family": "Roboto",
                "padding-top": "16x",
                fontSize: "14px",
              }}
            >
              <div class="line" style={{ "padding-top": "7px" }} style={{ "color": "black" }}>
                <a
                  class="identfier"
                  style={{
                    "vertical-align": "top",
                  }}
                  style={{ "color": "black" }}
                >
                  Halving events:
                </a>
                <a
                  class="value"
                  style={{
                    fontWeight: "bold",
                    "vertical-align": "top",
                    "color": "black",
                  }}
                  data-html="true"
                  data-for="pede"
                  data-tip={
                    "*each halving divides the poll and vote rewards by 2<br/><br /> *halving occurs each time additional 25m GOVRN are issued<br /><br /> *in total there will be 9 halvings until the total supply of GOVRN tokens reaches 350m."
                  }
                >
                  <ReactTooltip
                    id="pede"
                    type="dark"
                    effect="solid"
                    backgroundColor="black"
                    place="top"
                  />{" "}
                  {halvings(gettotalcircu())}
                  <FontAwesomeIcon
                    icon={faInfoCircle}
                    style={{
                      height: "14px",
                      width: "14px",
                      color: "black",
                      opacity: "0.7",
                      "margin-left": "2px",
                      "vertical-align": "top",
                      "margin-top": "-4px",
                    }}
                  />
                </a>
              </div>
              <hr />
              <div class="line" style={{ "padding-bottom": "7px" }}>
                <a class="identfier" style={{ "color": "black" }}>To mine until next halving:</a>
                <a
                  class="value"
                  style={{
                    "font-weight": "",
                  }} style={{ "color": "black" }}
                >
                  <b>{stakeformatter(tonexthalving(gettotalcircu()))} GOVRN</b>
                </a>
              </div>
            </div>
          )}
          <div class="navbar">
            <div class="imagesleft">
              <a href="https://newdex.io/trade/consortiumlv-govrn-eos">
                <img
                  src="newdex.png"
                  style={{
                    height: "36px",
                    "margin-top": "7px",
                    opacity: "0.7",
                  }}
                  alt="newdex"
                ></img>
              </a>
              <a href="https://xnation.io/eos?base=bntbntbntbnt-BNT&quote=consortiumlv-GOVRN">
                <img
                  src="bancorgoluboi.png"
                  style={{
                    height: "36px",
                    "margin-top": "7px",
                    "margin-left": "30px",
                    opacity: "0.7",
                  }}
                  alt="bancor"
                ></img>
              </a>
              <a href="https://alcor.exchange/markets/GOVRN-consortiumlv">
                <img
                  src="alcor.png"
                  style={{
                    height: "36px",
                    "margin-top": "7px",
                    "margin-left": "28px",
                    opacity: "0.7",
                  }}
                  alt="alcor"
                ></img>
              </a>
              <a href="https://defibox.io/pool-market-details/231">
                <img
                  src="boxblack.png"
                  style={{
                    height: "42px",
                    "margin-top": "7px",
                    "margin-left": "30px",
                    opacity: "0.7",
                  }}
                  alt="box"
                ></img>
              </a>

              <br></br>
            </div>

            <div class="imagesright">
              <a href={"https://medium.com/@consortiumdac"}>
                <FontAwesomeIcon
                  icon={faMedium}
                  style={{
                    height: "36px",
                    width: "36px",
                    color: "black",
                    "margin-right": "15px",
                    "margin-left": "15px",
                    "margin-top": "7px",
                    opacity: "0.7",
                  }}
                />
              </a>
              <a href={"https://t.me/consortiumdac"}>
                <FontAwesomeIcon
                  icon={faTelegram}
                  style={{
                    height: "36px",
                    width: "36px",
                    color: "black",
                    "margin-right": "30px",
                    "margin-left": "15px",
                    "margin-top": "7px",
                    opacity: "0.7",
                  }}
                />
              </a>
              <a href={"https://twitter.com/consortiumdac"}>
                <FontAwesomeIcon
                  icon={faTwitter}
                  style={{
                    height: "36px",
                    width: "36px",
                    color: "black",
                    "margin-right": "28px",
                    "margin-top": "7px",
                    opacity: "0.7",
                  }}
                />
              </a>
              <a href={"https://github.com/n0umen0n/ConsortiumSC"}>
                <FontAwesomeIcon
                  icon={faGithub}
                  style={{
                    height: "36px",
                    width: "36px",
                    color: "black",
                    "margin-top": "7px",
                    opacity: "0.7",
                  }}
                />
              </a>
              <br></br>
            </div>
          </div>
        </AppBar>
      </div>
    </div>

    /*      //<div style={{"float": "left", "display": "block", "display": "inline-block"}}>      //</div>


<div style={{"float": "left", "display": "block", "display": "inline-block", "margin-top":"7px", "margin-right":"15px"}}>
       <a style={{"font-size":12, "margin-left":"48px"}}>Exchanges</a>
       </div>

<div style={{"float": "right", "display": "block", "display": "inline-block", "margin-top":"7px"}}>
          <a style={{"font-size":12, "margin-right":"35px"}}>Community</a>
          </div>
          */
  );
}

export default withUAL(App);
