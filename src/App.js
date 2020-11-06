import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AnchorLink from "anchor-link";
import AnchorLinkBrowserTransport from "anchor-link-browser-transport";
import { Modal } from "react-bootstrap";
import ReactTooltip from "react-tooltip";
import { Button as BootstrapButton } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import Slider from "@material-ui/core/Slider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab";
import MenuIcon from "@material-ui/icons/Menu";
import PeopleOutline from "@material-ui/icons/PeopleOutline";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Swal from "sweetalert2";
import Tooltip from "@material-ui/core/Tooltip";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import OpenInBrowserRoundedIcon from "@material-ui/icons/OpenInBrowserRounded";
import ShareIcon from "@material-ui/icons/Share";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import moment from "moment";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withUAL } from "ual-reactjs-renderer";
import SwapHorizOutlinedIcon from "@material-ui/icons/SwapHorizOutlined";
import HowToRegOutlinedIcon from "@material-ui/icons/HowToRegOutlined";
import AccountBalanceRoundedIcon from "@material-ui/icons/AccountBalanceRounded";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import ReactGA from "react-ga";
import * as clipboard from "clipboard-polyfill/text";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { JsonRpc } from "eosjs/dist/eosjs-jsonrpc";
import { Api } from "eosjs/dist/eosjs-api";
//import { CosignAuthorityProvider } from "./CosignAuthorityProvider.js";

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
  media: {
    height: 0,
    paddingTop: "30%", // 16:9
  },
  grow: {
    flexGrow: 1,
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
  avatar: {
    backgroundColor: "#343A40",
    opacity: 0.7,
  },
}));

function sumArray(arr) {
  return arr.reduce((sum, n) => sum + n);
}

function sortBySum(a, b) {
  return sumArray(b.totalvote) - sumArray(a.totalvote);
}

function makeint() {
  var result = "";
  /*
  var characters = "1234567890";
  var charactersLength = characters.length;
  for (var i = 0; i < 7; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  */

  result = Math.floor(Math.random() * 999999);
  return result;

  document.getElementById("eos").textContent = result;
}

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

function App(props) {
  const {
    ual: { showModal, hideModal },
  } = props;

  const classes = useStyles();
  const [data, setData] = useState({ rows: [] });
  const [isOpened, setIsOpened] = useState(true);
  const [isOpenedmob, setIsOpenedmob] = useState(false);

  const [votedata, setVoteData] = useState({ rows: [] });
  const [votedata1, setVoteData1] = useState({ rows: [] });
  const [votedata2, setVoteData2] = useState({ rows: [] });

  const [communitydata, setCommunityData] = useState({ rows: [] });
  const [databalance, setDataBalance] = useState();
  const [questionsubmission, setQuestionSubmission] = useState("");
  const [dailyvoted, setDailyVoted] = useState({ rows: [] });
  const [nrofvotes, setNumberofVotes] = useState({ rows: [] });

  const [mystake, setMyStake] = useState({ rows: [] });
  const [dataind, setMyindStake] = useState({ rows: [] });
  const [totalstaked, setTotalStaked] = useState({ rows: [] });
  const [votedin, setVotedin] = useState({ rows: [] });

  const [stakingbalance, setStakingBalance] = useState({ rows: [] });
  const [questiondescription, setQuestionDescription] = useState("");
  const [voteamount, setVoteAmount] = useState(1);
  const [stakeamount, setStakeAmount] = useState(1);
  const [unstakeamount, setUnStakeAmount] = useState(1);

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);

  const [accountname, setAccountName] = useState("");

  const [totalcircu, setTotalCircu] = useState({ rows: [] });

  const {
    ual: { logout },
  } = props;

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
  const [votinglist, setVotingList] = useState(["", ""]);

  const handleClose = () => {
    setShow(false);
    setVotingList(["", ""]);
    setQuestionSubmission("");
    setQuestionDescription("");
  };

  const logmeout = () => {
    logout();
    window.location.reload(false);
  };

  function toggle() {
    setIsOpened((wasOpened) => !wasOpened);
  }

  function togglemob() {
    setIsOpenedmob((wasOpened) => !wasOpened);
  }

  const sortingalgo = (arr) => {
    arr.rows.sort((a, b) => (a.sumofallopt < b.sumofallopt ? 1 : -1));
    setData(arr);
  };

  const tyra = () => {
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
      response.json().then((communitydata) => setCommunityData(communitydata))
    );
    //.then(restoreSession())
  };

  const lita = () => {
    var intervalid = setInterval(() => {
      tyra();
    }, 3000);

    setTimeout(() => {
      clearInterval(intervalid);
    }, 45000);
  };

  const gettotalcircu = () => {
    if (totalcircu.rows[0]) {
      return Math.floor(Number(totalcircu.rows[0].supply.split(" ")[0]));
    }
  };

  const sucessstake = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 6000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: "success",
      title: "Successfully increased voting and polling rewards",
    });
  };

  const actionpuccis = (err) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "bottom-end",
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

  const tokensymbol = () => {
    if (communitydata.rows[0]) {
      var commdata = communitydata.rows.filter(function (e) {
        return e.community == scope;
      });
      return commdata[0].tokensymbol;
    }
  };

  const tokenurl = () => {
    if (communitydata.rows[0]) {
      var commdata = communitydata.rows.filter(function (e) {
        return e.community == scope;
      });
      return commdata[0].tokenurl;
    }
  };

  const loadingscatter = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 10000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: "info",
      title: "Loading wallet...",
    });
  };

  const loadingvote = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 65000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: "info",
      title: "Preparing oracle request to validate your token balance.",
    });
  };

  const loadingpoll = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: "bottom-end",
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
      title: "Preparing oracle request to validate your token balance.",
    });
  };

  const loadingsdelpol = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 10000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: "info",
      title: "Opening wallet to delete the poll and calculate reward",
    });
  };

  const handleShow = () => setShow(true);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const [votekey, setVoteKey] = useState();
  const [votepollkey, setVotePollKey] = useState();
  const AppBarOffset = () => {
    return <div className={classes.offset} />;
  };

  const location = useLocation();
  const scope = location.pathname.split("/")[2];

  const filtermypolls = () => {
    if (accountname) {
      if (data.rows[0]) {
        var datatofilter = data.rows;
        var datafiltered = datatofilter.filter(
          (a) => a.creator == displayaccountname()
        );
        setData({ rows: datafiltered });
      }
    } else {
      showModal();
    }
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
        table: "stat",
        scope: "GOVRN",
        limit: 1,
      }),
    }).then((response) =>
      response.json().then((totalcircu) => setTotalCircu(totalcircu))
    );
  }, totalcircu["rows"][0]);

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
        table: "totalstk",
        scope: "consortiumlv",
        limit: 1,
      }),
    }).then((response) =>
      response.json().then((totalstaked) => setTotalStaked(totalstaked))
    );
  }, totalstaked["rows"]);

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
      response.json().then((communitydata) => setCommunityData(communitydata))
    );
    //.then(restoreSession())
  }, communitydata["rows"]);

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

  const topcard = () => {
    //CONTENTS OF THE CARD ON TOP OF THE COMMUNITY PAGE
    var commdata = communitydata.rows.filter(function (e) {
      return e.community == scope;
    });

    if (commdata[0]) {
      var num = parseFloat(
        (commdata[0].totaltokensvoted / commdata[0].totalcirculation) * 100
      );
      var comactivity = num.toFixed(2);
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
            image={commdata[0].backgroundurl}
            title="Community image"
          />
          <CardContent
            style={{ "padding-bottom": "5px", "margin-right": "20px" }}
          >
            <Typography style={{ fontSize: "20px", "font-weight": "500" }}>
              {commdata[0].communityname}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              style={{ "margin-top": "6px" }}
            >
              {commdata[0].description}
            </Typography>
          </CardContent>
          <div
            style={{
              color: "#485A70",
              "margin-right": "7px",
              "margin-left": "7px",
              "margin-top": "20px",
            }}
          >
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              style={{ float: "left" }}
            >
              <BootstrapButton
                class="coloredbutton"
                onClick={handleShow2}
                variant="outline-dark"
                style={{
                  "font-weight": "bold",
                  borderRadius: "15px",
                  width: "80px",
                  height: "33px",
                  "margin-left": "7px",
                  fontSize: "14px",
                }}
              >
                Stake
              </BootstrapButton>
            </Typography>
            <div
              style={{
                "margin-right": "0px",
                "margin-top": "10px",
                float: "right",
              }}
            >
              <img
                src={commdata[0].tokenurl}
                width="24px"
                height="24px"
                marginRight="0px"
              />
              <a
                style={{ "font-size": "15px", "font-weight": "600" }}
                data-html="true"
                data-for="pede"
                data-tip={
                  "Voting activity (%) = Total tokens voted (" +
                  commdata[0].tokensymbol +
                  ") / Total circulation (" +
                  commdata[0].tokensymbol +
                  ")"
                }
              >
                <ReactTooltip
                  id="pede"
                  type="dark"
                  effect="solid"
                  backgroundColor="black"
                  place="left"
                />
                &nbsp;{comactivity}%
                <FontAwesomeIcon
                  icon={faInfoCircle}
                  style={{
                    height: "14px",
                    width: "14px",
                    color: "black",
                    "margin-bottom": "6px",
                    opacity: "0.7",
                    "margin-left": "2px",
                  }}
                />
                &nbsp;
              </a>
              <PeopleOutline style={{ "margin-left": "6px" }} />
              <a
                style={{
                  "font-size": "15px",
                  "font-weight": "600",
                  "margin-right": "7px",
                }}
                data-html="true"
                data-for="pede"
                data-tip={"Total number of voters"}
              >
                <ReactTooltip
                  id="pede"
                  type="dark"
                  effect="solid"
                  backgroundColor="black"
                  place="left"
                />{" "}
                {commdata[0].totalvoters}
                <FontAwesomeIcon
                  icon={faInfoCircle}
                  style={{
                    height: "14px",
                    width: "14px",
                    color: "black",
                    "margin-bottom": "6px",
                    opacity: "0.7",
                    "margin-left": "2px",
                  }}
                />
              </a>
            </div>
          </div>
        </Card>
      );
    }
  };

  const stake = () => {
    if (votedata.rows[0]) {
      return <a>{votedata.rows[0].totalstaked}</a>;
    }
  };

  useEffect(() => {
    ReactGA.initialize("UA-160289361-1");
    ReactGA.pageview(window.location);
    console.log("pede");

    fetch("https://api.main.alohaeos.com:443/v1/chain/get_table_rows", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        json: true,
        code: "consortiumlv",
        table: "kysimused",
        scope: scope,
        limit: 50,
        table_key: "pollkey",
        lower_bound: 0,
        upper_bound: 1000000,
      }),
    }).then((response) => response.json().then((data) => sortingalgo(data)));

    //.then(restoreSession())
  }, data["rows"]);

  const getvotedin = () => {
    fetch("https://api.main.alohaeos.com:443/v1/chain/get_table_rows", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        json: true,
        code: "consortiumlv",
        table: "theusrpoll",
        scope: displayaccountname(),
        limit: 1000,
      }),
    }).then((response) =>
      response.json().then((votedinn) => setVotedin(votedinn))
    );
  };

  useEffect(() => {
    if (activeUser) {
      fetch("https://api.main.alohaeos.com:443/v1/chain/get_table_rows", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          json: true,
          code: "eosio.token",
          table: "accounts",
          scope: displayaccountname(),
        }),
      })
        .then((response) =>
          response.json().then((databalance) => setDataBalance(databalance))
        )
        .then(getvote())
        .then(getvotedin())
        .then(getdailyvoted())
        .then(getnrofvotes())
        .then(getstake());
    }
  }, databalance);

  const getdailyvoted = () => {
    fetch("https://api.main.alohaeos.com:443/v1/chain/get_table_rows", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        json: true,
        code: "consortiumlv",
        table: "voterstatzi",
        scope: scope,
        key_type: "name",
        index_position: 1,
        lower_bound: displayaccountname(),
        upper_bound: displayaccountname(),
      }),
    }).then((response) =>
      response.json().then((dailyvoted) => setDailyVoted(dailyvoted))
    );
  };

  const countitdown = () => {
    if (dailyvoted.rows[0]) {
      const firstvotetime = new Date(dailyvoted.rows[0].first_vote_time + "Z");
      const current = new Date();
      const difference = (firstvotetime - current) / 1000 / 3600 + 24;
      if (difference > 1) {
        return Math.floor(difference) + " h";
      } else if (difference < 1 && difference > 0) {
        return Math.floor(difference * 60) + " min";
      } else if (difference < 0) {
        return "0h";
      }
    } else {
      return "0h";
    }
  };

  const getnrofvotes = () => {
    fetch("https://api.main.alohaeos.com:443/v1/chain/get_table_rows", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        json: true,
        code: "consortiumlv",
        table: "paljuvoted",
        scope: "consortiumlv",
        key_type: "name",
        index_position: 1,
        lower_bound: displayaccountname(),
        upper_bound: displayaccountname(),
      }),
    }).then((response) =>
      response.json().then((nrofvotes) => setNumberofVotes(nrofvotes))
    );
  };

  const countitdownvotes = () => {
    if (nrofvotes.rows[0]) {
      const firstvotetime = new Date(nrofvotes.rows[0].timefirstvote + "Z");
      const current = new Date();
      const difference = (firstvotetime - current) / 1000 / 3600 + 24;
      if (difference > 1) {
        return Math.floor(difference) + " h";
      } else if (difference < 1 && difference > 0) {
        return Math.floor(difference * 60) + " min";
      } else if (difference < 0) {
        return "0h";
      }
    } else {
      return "0h";
    }
  };

  const rewardsleft = () => {
    if (nrofvotes.rows[0]) {
      const nrofvote = nrofvotes.rows[0].nrofvotes;
      const rewardsleft = 3 - nrofvote;
      const firstvotetime = new Date(nrofvotes.rows[0].timefirstvote + "Z");
      const current = new Date();
      const difference = (firstvotetime - current) / 1000 / 3600 + 24;
      if (difference < 0) {
        return "3";
      } else {
        if (rewardsleft > 0) {
          return rewardsleft;
        } else {
          return "0";
        }
      }
    } else {
      return "3";
    }
  };

  const pollcostarv = () => {
    if (totalcircu.rows[0]) {
      return 400000 / halvingdivider();
    }
  };

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

  const pollrewards = (fullstake, communitystake) => {
    return parseInt(
      (Math.pow(communitystake / fullstake, 1 / 3) * 8225000 + 1175000) /
        halvingdivider()
    ); //LISA KUUP JUUR communitystake/fullstake sellele
  };

  const voterewards = (fullstake, communitystake) => {
    return parseInt(
      (Math.pow(communitystake / fullstake, 1 / 3) * 315000 + 45000) /
        halvingdivider()
    ); //LISA KUUP JUUR communitystake/fullstake sellele
  };

  const gettotalstaked = () => {
    if (totalstaked.rows[0]) {
      return Math.floor(Number(totalstaked.rows[0].totalstaked.split(" ")[0]));
    }
  };

  const stakedforcom = () => {
    if (communitydata.rows[0]) {
      var commdata = communitydata.rows.filter(function (e) {
        return e.community == scope;
      });
      return commdata[0].staked;
    }
  };

  const getstake = () => {
    //DOES ALL THE FETCHING FOR THE STAKE MODAL
    fetch("https://api.main.alohaeos.com:443/v1/chain/get_table_rows", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        json: true,
        code: "consortiumlv",
        table: "accounts",
        scope: displayaccountname(),
      }),
    }).then((response) =>
      response.json().then((data) => setStakingBalance(data))
    );

    fetch("https://api.main.alohaeos.com:443/v1/chain/get_table_rows", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        json: true,
        code: "consortiumlv",
        table: "indtotalstkh",
        scope: "consortiumlv",
        key_type: "name",
        index_position: 1,
        lower_bound: displayaccountname(),
        upper_bound: displayaccountname(),
      }),
    }).then((response) => response.json().then((data) => setMyStake(data)));

    fetch("https://api.main.alohaeos.com:443/v1/chain/get_table_rows", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        json: true,
        code: "consortiumlv",
        table: "personstaked",
        scope: scope,
        key_type: "name",
        index_position: 1,
        lower_bound: displayaccountname(),
        upper_bound: displayaccountname(),
      }),
    }).then((response) =>
      response.json().then((dataind) => setMyindStake(dataind))
    );
  };

  const getmybalance = () => {
    if (stakingbalance.rows[0]) {
      return Math.floor(Number(stakingbalance.rows[0].balance.split(" ")[0]));
    } else {
      return 0;
    }
  };

  const getmystake = () => {
    if (mystake.rows[0]) {
      return Math.floor(Number(mystake.rows[0].totalstaked.split(" ")[0]));
    } else {
      return 0;
    }
  };

  const getmyindstake = () => {
    if (dataind.rows[0]) {
      return Math.floor(Number(dataind.rows[0].staked.split(" ")[0]));
    } else {
      return 0;
    }
  };

  function ValueLabelComponent(props) {
    //CUSTOM TOOLTIP COMPONENT FOR ALL SLIDERS
    const { children, open, value } = props;

    return (
      <Tooltip
        open={open}
        enterTouchDelay={0}
        placement="top"
        title={isNaN(value) ? 0 : value}
      >
        {children}
      </Tooltip>
    );
  }

  //CONTENTS OF THE STAKE MODAL
  const displaystake = () => {
    const {
      ual: { login, displayError, showModal },
    } = props;
    if (stakingbalance.rows[0]) {
      const maxstakevalue =
        Math.floor(Number(stakingbalance.rows[0].balance.split(" ")[0])) -
        getmystake();

      return (
        <div>
          <Slider
            defaultValue={1}
            ValueLabelComponent={ValueLabelComponent}
            aria-label="custom thumb label"
            step={1}
            min={0}
            max={maxstakevalue}
            onChangeCommitted={(e, val) => setStakeAmount(val)} //SETSTAKEAMOUNT INSTEAD!
            style={{
              marginBottom: "10px",
              "margin-top": "10px",
              color: "black",
            }}
          />
          <a style={{ "font-weight": "500" }}>
            {" "}
            Available to stake: {maxstakevalue} GOVRN
          </a>{" "}
          <br />
          <a style={{ "font-weight": "500" }}>
            You are staking: {stakeamount} GOVRN
          </a>{" "}
          <br />
          <br />
          <BootstrapButton
            onClick={() => stakeaction()}
            variant="dark"
            style={{
              "font-weight": "bold",
              borderRadius: "15px",
              fontSize: "15px",
            }}
          >
            Stake
          </BootstrapButton>
          <hr />
          <Slider
            defaultValue={voteamount}
            ValueLabelComponent={ValueLabelComponent}
            aria-label="custom thumb label"
            step={1}
            min={0}
            max={getmyindstake()}
            onChangeCommitted={(e, val) => setUnStakeAmount(val)} //SETSTAKEAMOUNT INSTEAD!
            style={{
              marginBottom: "10px",
              "margin-top": "10px",
              color: "black",
            }}
          />
          <a style={{ "font-weight": "500" }}>
            Currently staked: {getmyindstake()} GOVRN
          </a>{" "}
          <br />
          <a style={{ "font-weight": "500" }}>
            You are unstaking: {unstakeamount} GOVRN
          </a>{" "}
          <br />
          <br />
          <BootstrapButton
            onClick={() => unstakeaction()}
            variant="dark"
            style={{
              "font-weight": "bold",
              borderRadius: "15px",
              fontSize: "15px",
            }}
          >
            Unstake
          </BootstrapButton>
        </div>
      );
    } else {
      return (
        <div>
          <Slider
            defaultValue={voteamount}
            ValueLabelComponent={ValueLabelComponent}
            aria-label="custom thumb label"
            step={1}
            min={0}
            max={0}
            onChangeCommitted={(e, val) => setStakeAmount(val)} //SETSTAKEAMOUNT INSTEAD!
            style={{
              marginBottom: "10px",
              "margin-top": "10px",
              color: "black",
            }}
          />
          <a style={{ "font-weight": "500" }}>Available to stake: 0 GOVRN</a>{" "}
          <br />
          <a style={{ "font-weight": "500" }}>You are staking: 0 GOVRN</a>{" "}
          <br />
          <br />
          <BootstrapButton
            onClick={() => showModal()}
            variant="dark"
            style={{
              "font-weight": "bold",
              borderRadius: "15px",
              fontSize: "15px",
            }}
          >
            Stake
          </BootstrapButton>
          <hr />
          <Slider
            defaultValue={voteamount}
            ValueLabelComponent={ValueLabelComponent}
            aria-label="custom thumb label"
            step={1}
            min={0}
            max={0}
            onChangeCommitted={(e, val) => setUnStakeAmount(val)} //SETSTAKEAMOUNT INSTEAD!
            style={{
              marginBottom: "10px",
              "margin-top": "10px",
              color: "black",
            }}
          />
          <a style={{ "font-weight": "500" }}>Currently staked: 0 GOVRN</a>{" "}
          <br />
          <a style={{ "font-weight": "500" }}>
            You are unstaking: 0 GOVRN
          </a>{" "}
          <br />
          <br />
          <BootstrapButton
            onClick={() => showModal()}
            variant="dark"
            style={{
              "font-weight": "bold",
              borderRadius: "15px",
              fontSize: "15px",
            }}
          >
            Unstake
          </BootstrapButton>
        </div>
      );
    }
  };

  const stakeaction = async () => {
    const {
      ual: { login, displayError },
    } = props;
    // Via static contextType = UALContext, access to the activeUser object on this.context is now available
    const {
      ual: { activeUser },
    } = props;
    if (activeUser) {
      loadingscatter();
      try {
        const transaction = {
          actions: [
            {
              account: "consortiumlv",
              name: "stakeforcomm",
              authorization: [
                {
                  actor: displayaccountname(), // use account that was logged in
                  permission: "active",
                },
              ],
              data: {
                staker: displayaccountname(),
                community: scope,
                quantity: parseFloat(stakeamount).toFixed(4) + " GOVRN",
              },
            },
          ],
        };
        // The activeUser.signTransaction will propose the passed in transaction to the logged in Authenticator
        await activeUser.signTransaction(transaction, {
          broadcast: true,
          expireSeconds: 300,
        });
        window.location.reload(false);

        ReactGA.event({
          category: "Chain acion",
          action: "User staked.",
        });

        sucessstake();
        //lita()
      } catch (error) {
        //if (error.message.startsWith("TypeError: Cannot") == true) {
        if (
          error.message ==
          "TypeError: Cannot read property 'message' of undefined"
        ) {
          actionpuccis(
            "Mainnet is busy, please try again or borrow more CPU to avoid this error."
          );
          console.log(error.message);
        } else if (
          error.message.startsWith(
            "the transaction was unable to complete by deadline"
          ) == true
        ) {
          console.log(error.message);

          actionpuccis(
            "Mainnet is busy, please try again or borrow more CPU to avoid this error."
          );
        } else if (
          error.message.startsWith("transaction declares authority" == true)
        ) {
          console.log(error.message);

          actionpuccis("Please try restarting or reinstalling your wallet");
        } else if (error.message == "Unable to sign the given transaction") {
          actionpuccis(
            "Please use Anchor to receive specific error. Most likely your account needs more CPU."
          );
          console.log(error.message);
        } else {
          actionpuccis(error);
          console.log(error.message);
        }
      }
    } else {
      showModal();
    }
  };

  /*
  const stakeaction = () => { // CALL THIS IF YOU WANT TO STAKE
    if (sessionresult){
    const action = {
          account: 'consortiumlv',
          name: 'stakeforcomm',
          authorization: [sessionresult.auth],
          data: {

            staker: displayaccountname(),
            community: scope,
            quantity: parseFloat(stakeamount).toFixed(4) + " GOVRN"
          }
        }
    link.transact({action}).then(() => window.location.reload(false))
  }<Route path
  }
*/

  const unstakeaction = async () => {
    const {
      ual: { login, displayError, showModal },
    } = props;
    // Via static contextType = UALContext, access to the activeUser object on this.context is now available
    const {
      ual: { activeUser },
    } = props;
    if (activeUser) {
      loadingscatter();
      try {
        const transaction = {
          actions: [
            {
              account: "consortiumlv",
              name: "unstkfromcom",
              authorization: [
                {
                  actor: displayaccountname(), // use account that was logged in
                  permission: "active",
                },
              ],
              data: {
                staker: displayaccountname(),
                community: scope,
                quantity: parseFloat(unstakeamount).toFixed(4) + " GOVRN",
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
      } catch (error) {
        //if (error.message.startsWith("TypeError: Cannot") == true) {
        if (
          error.message ==
          "TypeError: Cannot read property 'message' of undefined"
        ) {
          actionpuccis(
            //"Mainnet is busy, please try again or borrow more CPU to avoid this error."
            "If you have enough CPU, please try voting again, sometimes oracles get lost."
          );
          console.log(error.message);
        } else if (
          error.message.startsWith(
            "the transaction was unable to complete by deadline"
          ) == true
        ) {
          console.log(error.message);

          actionpuccis(
            "If you have enough CPU, please try voting again, sometimes oracles get lost."
          );
        } else if (
          error.message.startsWith("transaction declares authority" == true)
        ) {
          console.log(error.message);

          actionpuccis("Please try restarting or reinstalling your wallet");
        } else if (error.message == "Unable to sign the given transaction") {
          actionpuccis(
            "Please use Anchor to receive specific error. If you have enough CPU, try voting again, sometimes oracles get lost."
          );
          console.log(error.message);
        } else {
          actionpuccis(error);
          console.log(error.message);
        }
      }
    } else {
      showModal();
    }
  };

  /*
  const unstakeaction = () => { // CALL THIS IF YOU WANT TO UNSTAKE
    console.log(mystake)
    if (sessionresult){
      const action = {
                account: 'consortiumlv',
                name: 'unstkfromcom',
                authorization: [sessionresult.auth],
                data: {

                  staker: displayaccountname(),
                  community: scope,
                  quantity: parseFloat(unstakeamount).toFixed(4) + " GOVRN"

                }
        }
    link.transact({action}).then(() => window.location.reload(false))
  }
  }
*/

  const getvote = () => {
    //READS YOUR TOKEN BALANCE FOR VOTING
    //if (!votedata.rows[0] && scope == "viggcommcons") {
    if (!votedata.rows[0] && scope == "viggcommcons") {
      //IF WE ARE ON VIGOR PAGE, DO THE FOLLOWING FETCH
      fetch("https://api.main.alohaeos.com:443/v1/chain/get_table_rows", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          json: true,
          code: "vig111111111",
          table: "accounts",
          scope: displayaccountname(),
        }),
      }).then((response) => response.json().then((data) => setVoteData(data)));
    }
    if (!votedata.rows[0] && scope == "eosscommcons") {
      //IF WE ARE ON EOS PAGE, DO THE FOLLOWING FETCH
      fetch("https://api.main.alohaeos.com:443/v1/chain/get_table_rows", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          json: true,
          code: "eosio.token",
          table: "accounts",
          scope: displayaccountname(),
        }),
      }).then((response) => response.json().then((data) => setVoteData(data)));
    }

    if (!votedata.rows[0] && scope == "krowcommcons") {
      //IF WE ARE ON EOS PAGE, DO THE FOLLOWING FETCH
      fetch("https://api.main.alohaeos.com:443/v1/chain/get_table_rows", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          json: true,
          code: "krowndactokn",
          table: "accounts",
          scope: displayaccountname(),
        }),
      }).then((response) => response.json().then((data) => setVoteData(data)));
    }

    if (!votedata.rows[0] && scope == "boidcommcons") {
      //IF WE ARE ON EOS PAGE, DO THE FOLLOWING FETCH
      fetch("https://api.main.alohaeos.com:443/v1/chain/get_table_rows", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          json: true,
          code: "boidcomtoken",
          table: "accounts",
          scope: displayaccountname(),
        }),
      }).then((response) => response.json().then((data) => setVoteData(data)));
    }

    /*
      fetch("https://api.main.alohaeos.com:443/v1/chain/get_table_rows", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          json: true,
          code: "eosio",
          table: "delband",
          scope: displayaccountname(),
        }),
      }).then((response) => response.json().then((data) => setVoteData1(data)));
      
      fetch("https://api.main.alohaeos.com:443/v1/chain/get_table_rows", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          json: true,
          code: "eosio",
          table: "rexbal",
          scope: "eosio",
          lower_bound: displayaccountname(),
          upper_bound: displayaccountname(),
        }),
      }).then((response) => response.json().then((data) => setVoteData2(data)));
      */
  };

  /* ANCHOR CONNECTION
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
        setSessionResult(session) //PUT THE ACCOUNT IN STATE
        window.location.reload(false) //RELOAD THE PAGE
    })
  }


    const logoutt = () => {
        setSessionResult() //REMOVES SESSIONRESULT FROM STORAGE, THEREFORE LOGGING YOU OUT.
    }
const { convertLegacyPublicKeys } = require("eosjs/dist/eosjs-numeric");
  const rpc = new JsonRpc("https://api.main.alohaeos.com:443");

  class CosignAuthorityProvider {
    async getRequiredKeys(args) {
      const { transaction } = args;
      // Iterate over the actions and authorizations
      transaction.actions.forEach((action, ti) => {
        action.authorization.forEach((auth, ai) => {
          // If the authorization matches the expected cosigner
          // then remove it from the transaction while checking
          // for what public keys are required
          if (auth.actor === "greymassfuel" && auth.permission === "cosign") {
            delete transaction.actions[ti].authorization.splice(ai, 1);
          }
        });
      });
      // the rpc below should be an already configured JsonRPC client from eosjs
      return convertLegacyPublicKeys(
        (
          await rpc.fetch("/v1/chain/get_required_keys", {
            transaction,
            available_keys: args.availableKeys,
          })
        ).required_keys
      );
    }
  }


authorization: [
                {
                  actor: "greymassfuel",
                  permission: "cosign",
                },
              ],
              account: "greymassnoop",
              name: "noop",
              data: {},
            },
            {



 const rpc = new JsonRpc("https://api.main.alohaeos.com:443", { fetch });

        const api = new Api({
          //authorityProvider: new CosignAuthorityProvider(),
          rpc,
          textDecoder: new TextDecoder(),
          textEncoder: new TextEncoder(),
        });




*/
  const checkifvoted = (pollid) => {
    var exists = votedin.rows.some((item) => item.pollkey === pollid);
    return votedin.rows.some((item) => item.pollkey.toString() == pollid);
  };

  const createpoll = async () => {
    const {
      ual: { login, displayError, showModal },
    } = props;
    // Via static contextType = UALContext, access to the activeUser object on this.context is now available
    const {
      ual: { activeUser },
    } = props;

    var answers = votinglist.filter(Boolean);
    var voteslist = [];
    for (let i = 0; i < answers.length; i++) {
      voteslist.push(0);
    }
    const uniqueurl = Math.random()
      .toString(36)
      .replace(/[^a-z0-9]+/g, "")
      .substr(0, 15);
    const uniquename = makeid();

    const pollkeyz = makeint();

    if (activeUser) {
      loadingpoll();
      try {
        const transaction = {
          actions: [
            {
              account: "consortiumlv",
              name: "createpollz",
              authorization: [
                {
                  actor: displayaccountname(), // use account that was logged in
                  permission: "active",
                },
              ],
              data: {
                question: questionsubmission,
                answers: votinglist,
                totalvote: voteslist,
                community: scope,
                creator: displayaccountname(),
                description: questiondescription,
                uniqueurl: uniqueurl,
                schedname: uniquename,
                pollkey: pollkeyz,
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
          action: "User created a poll.",
        });
      } catch (error) {
        //if (error.message.startsWith("TypeError: Cannot") == true) {
        if (
          error.message ==
          "TypeError: Cannot read property 'message' of undefined"
        ) {
          actionpuccis(
            //"Mainnet is busy, please try again or borrow more CPU to avoid this error."
            "If you have enough CPU, please try creating poll again, sometimes oracles get lost."
          );
          console.log(error.message);
        } else if (
          error.message.startsWith(
            "the transaction was unable to complete by deadline"
          ) == true
        ) {
          console.log(error.message);

          actionpuccis(
            "If you have enough CPU, please try creating poll again, sometimes oracles get lost."
          );
        } else if (
          error.message.startsWith("transaction declares authority" == true)
        ) {
          console.log(error.message);

          actionpuccis("Please try restarting or reinstalling your wallet");
        } else if (error.message == "Unable to sign the given transaction") {
          actionpuccis(
            "Please use Anchor to receive specific error. If you have enough CPU, try creating poll again, sometimes oracles get lost."
          );
          console.log(error.message);
        } else {
          actionpuccis(error);
          console.log(error.message);
        }
      }
    } else {
      showModal();
    }
  };

  /* ASK TO SIGN AND BROADCAST TO CHAIN
  const createpoll = () => {
    if (sessionresult){
      var answers = votinglist.filter(Boolean)
      var voteslist = [];
      for (let i = 0; i < answers.length; i++) {
        voteslist.push(0)
      }
      const uniqueurl = Math.random().toString(36).replace(/[^a-z0-9]+/g, '').substr(0, 15)
      const uniquename = makeid()
      const action = {
          account: 'consortiumlv',
          name: 'createpollz',
          authorization: [sessionresult.auth],
          data: {
            question: questionsubmission,
            answers: votinglist,
            totalvote: voteslist,
            community: scope,
            creator: displayaccountname(),
            description: questiondescription,
            uniqueurl: uniqueurl,
            schedname: uniquename,
          }
      }

      link.transact({action}).then(() => window.location.reload(false))
    }
    else{
      Swal.fire({
        title: '<strong>Please log in with Anchor</strong>',
        icon: 'info',
        html:
          'You can get the Anchor wallet ' +
          '<a target="_blank" href="https://greymass.com/anchor/">here.</a> ',

      })
    }
  }
*/

  const vote = async (option, pollkey) => {
    const {
      ual: { login, displayError, showModal },
    } = props;
    // Via static contextType = UALContext, access to the activeUser object on this.context is now available
    const {
      ual: { activeUser },
    } = props;

    const optionnumber = Number(option) + 1;
    const amount = Number(voteamount);
    const uniquename = makeid();
    const uniquenamests = makeid();
    const uniquenamevtb = makeid();
    const uniquenameindvt = makeid();

    if (activeUser) {
      loadingvote();
      try {
        const transaction = {
          actions: [
            {
              account: "consortiumlv",
              name: "votez",
              authorization: [
                {
                  actor: displayaccountname(), // use account that was logged in
                  permission: "active",
                },
              ],
              data: {
                usersvote: amount,
                pollkey: pollkey,
                option: optionnumber,
                community: scope,
                voter: displayaccountname(),
                //schedname: uniquename,
                schednamests: uniquenamests,
                schednamevtb: uniquenamevtb,
                schedindvt: uniquenameindvt,
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
        window.location.reload(false);
        ReactGA.event({
          category: "Chain acion",
          action: "User voted.",
        });
      } catch (error) {
        //if (error.message.startsWith("TypeError: Cannot") == true) {
        if (
          error.message ==
          "TypeError: Cannot read property 'message' of undefined"
        ) {
          actionpuccis(
            //"Mainnet is busy, please try again or borrow more CPU to avoid this error."
            "If you have enough CPU, please try voting again, sometimes oracles get lost."
          );
          console.log(error.message);
        } else if (
          error.message.startsWith(
            "the transaction was unable to complete by deadline"
          ) == true
        ) {
          console.log(error.message);

          actionpuccis(
            "If you have enough CPU, please try voting again, sometimes oracles get lost."
          );
        } else if (
          error.message.startsWith("transaction declares authority" == true)
        ) {
          console.log(error.message);

          actionpuccis("Please try restarting or reinstalling your wallet");
        } else if (error.message == "Unable to sign the given transaction") {
          actionpuccis(
            "Please use Anchor to receive specific error. If you have enough CPU, try voting again, sometimes oracles get lost."
          );
          console.log(error.message);
        } else {
          actionpuccis(error);
          console.log(error.message);
        }
      }
    } else {
      showModal();
    }
  };

  /*
  const vote = (option, pollkey) => {
    if (sessionresult){
    const optionnumber = Number(option) + 1
    const amount = Number(voteamount)
    const uniquename = makeid()
    const action = {
        account: 'consortiumlv',
        name: 'votez',
        authorization: [sessionresult.auth],
        data: {
          usersvote: amount,
          pollkey:pollkey,
          option:optionnumber,
          community: scope,
          voter: displayaccountname(),
          schedname: uniquename,

        }
    }
    link.transact({action}).then(() => window.location.reload(false))
    }
    else{
      Swal.fire({
        title: '<strong>Please log in with Anchor</strong>',
        icon: 'info',
        html:
          'You can get the Anchor wallet ' +
          '<a target="_blank" href="https://greymass.com/anchor/">here.</a> ',

      })
    }
  }const getpollurl = (pollkey,uniqueurl) => {
    const url = window.location.origin+"/poll/"+pollkey+"/"+uniqueurl+"/"+scope;
    Swal.fire({
      title: "<strong>Here's the link to the poll:</strong>",
      html:
        `<a target="_blank" href="${url}">${url}</a> `,

    })
  }


Swal.fire({
    position: 'bottom-end',
    icon: 'success',
    title: 'Copied',
    showConfirmButton: false,
    timer: 700
  })

  */

  //const finishpoll = (pollkey) => {

  const finishpoll = async (pollkey) => {
    const {
      ual: { login, displayError, showModal },
    } = props;
    // Via static contextType = UALContext, access to the activeUser object on this.context is now available
    const {
      ual: { activeUser },
    } = props;
    if (activeUser) {
      loadingsdelpol();
      try {
        const transaction = {
          actions: [
            {
              account: "consortiumlv",
              name: "finishpoll",
              authorization: [
                {
                  actor: displayaccountname(), // use account that was logged in
                  permission: "active",
                },
              ],
              data: {
                pollkey: pollkey,
                //creator: displayaccountname(),
                community: scope,
              },
            },
          ],
        };
        // The activeUser.signTransaction will propose the passed in transaction to the logged in Authenticator
        await activeUser.signTransaction(transaction, {
          expireSeconds: 300,
          blocksBehind: 3,
          broadcast: true,
        });

        //alert("GREAT SUCCESS!")
        window.location.reload(false);

        ReactGA.event({
          category: "Chain acion",
          action: "User deleted a poll.",
        });
      } catch (error) {
        //if (error.message.startsWith("TypeError: Cannot") == true) {
        if (
          error.message ==
          "TypeError: Cannot read property 'message' of undefined"
        ) {
          actionpuccis(
            "Mainnet is busy, please try again or borrow more CPU to avoid this error."
          );
          console.log(error.message);
        } else if (
          error.message.startsWith(
            "the transaction was unable to complete by deadline"
          ) == true
        ) {
          console.log(error.message);

          actionpuccis(
            "Mainnet is busy, please try again or borrow more CPU to avoid this error."
          );
        } else if (
          error.message.startsWith("transaction declares authority" == true)
        ) {
          console.log(error.message);

          actionpuccis("Please try restarting or reinstalling your wallet");
        } else if (error.message == "Unable to sign the given transaction") {
          actionpuccis(
            "Please use Anchor to receive specific error. Most likely your account needs more CPU."
          );
          console.log(error.message);
        } else {
          actionpuccis(error);
          console.log(error.message);
        }
      }
    } else {
      showModal();
    }
  };

  const getpollurl = (pollkey, uniqueurl) => {
    const url =
      window.location.origin +
      "/poll/" +
      pollkey +
      "/" +
      uniqueurl +
      "/" +
      scope;
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
      title: "Poll link copied to clipboard",
    });
  };

  const percentage = (sum, item) => {
    if (item == 0) {
      return 0;
    } else {
      return (item / sum.reduce((a, b) => a + b, 0)) * 100;
    }
  };

  /* LOOP FOR POLL OPTIONS IN CARDS */
  const polloptions = (votes, answers, pollkey) => {
    return Object.keys(votes).map((key) => (
      <div class="polloption" onClick={() => votingmodal(key, pollkey)}>
        <div class="answer">
          <a>{answers[key]}</a>{" "}
          <a
            style={{ float: "right", fontSize: "14px", "font-weight": "bold" }}
          >
            {percentage(votes, votes[key]).toFixed(0)}%
          </a>
        </div>
        <div class="progressbar">
          <div
            style={{
              width: `${percentage(votes, votes[key]).toFixed(0)}%`,
            }}
          />
        </div>
      </div>
    ));
  };
  const votingmodal = (key, pollkey) => {
    setVoteKey(key);
    setVotePollKey(pollkey);
    handleShow1();
  };

  const getbalance = () => {
    if (dailyvoted.rows[0]) {
      const firstvotetime = new Date(dailyvoted.rows[0].first_vote_time + "Z");
      const current = new Date();
      const difference = (firstvotetime - current) / 1000 / 3600 + 24;
      if (difference > 0) {
        if (votedata.rows[0]) {
          balance = Math.floor(Number(votedata.rows[0].balance.split(" ")[0]));
        }
        /*
        let cpu = 0;
        let net = 0;
        if (votedata1.rows[0]) {
          cpu = Math.floor(Number(votedata1.rows[0].cpu_weight.split(" ")[0]));
          net = Math.floor(Number(votedata1.rows[0].net_weight.split(" ")[0]));
        }

        let rex = 0;
        if (votedata2.rows[0]) {
          rex = Math.floor(Number(votedata2.rows[0].vote_stake.split(" ")[0]));
        }
        */
        let daily = 0;
        if (dailyvoted.rows[0]) {
          daily = Math.floor(Number(dailyvoted.rows[0].dailyvoted));
        }
        //const bal = balance + cpu + net - daily;
        const bal = balance - daily;

        return bal;
      }
      if (difference < 0) {
        if (votedata.rows[0]) {
          var balance = Math.floor(
            Number(votedata.rows[0].balance.split(" ")[0])
          );
        }
        /*
        let cpu = 0;
        let net = 0;
        if (votedata1.rows[0]) {
          cpu = Math.floor(Number(votedata1.rows[0].cpu_weight.split(" ")[0]));
          net = Math.floor(Number(votedata1.rows[0].net_weight.split(" ")[0]));
        }

        let rex = 0;
        if (votedata2.rows[0]) {
          rex = Math.floor(Number(votedata2.rows[0].vote_stake.split(" ")[0]));
        }
        */
        if (votedata.rows[0]) {
          //const bal = balance + cpu + net;
          const bal = balance;

          return bal;
        } else {
          return 0;
        }
      }
    } else {
      if (votedata.rows[0]) {
        balance = Math.floor(Number(votedata.rows[0].balance.split(" ")[0]));
      }
      /*
      let cpu = 0;
      let net = 0;
      if (votedata1.rows[0]) {
        cpu = Math.floor(Number(votedata1.rows[0].cpu_weight.split(" ")[0]));
        net = Math.floor(Number(votedata1.rows[0].net_weight.split(" ")[0]));
      }

      let rex = 0;
      if (votedata2.rows[0]) {
        rex = Math.floor(Number(votedata2.rows[0].vote_stake.split(" ")[0]));
      }
      */
      let daily = 0;
      if (dailyvoted.rows[0]) {
        daily = Math.floor(Number(dailyvoted.rows[0].dailyvoted));
      }
      if (votedata.rows[0]) {
        //const bal = balance + cpu + net;
        const bal = balance;
        return bal;
      } else {
        return 0;
      }
    }
  };

  const getrewardthreshold = () => {
    if (communitydata.rows[0]) {
      var commdata = communitydata.rows.filter(function (e) {
        return e.community == scope;
      });
      return parseInt(commdata[0].toppoll * 0.1);
    }
  };

  const logbutton = () => {
    if (accountname) {
      //IF WE HAVE A SESSIONRESULT, SHOW LOGIN BUTTON
      return (
        <div>
          {isOpened && (
            <div
              id="drop"
              class="dropdown-content"
              style={{ "font-family": "roboto" }}
            >
              <div class="line">
                <a class="identfier">
                  <b>{displayaccountname()}</b>
                </a>
              </div>
              <hr />
              <div class="line" style={{ "font-weight": "600" }}>
                <a class="identfier">Balance:</a>
                <a class="value">{getmybalance()} GOVRN</a>
              </div>
              <hr />
              <div class="line">
                <a class="identfier">Voting power:</a>
                <a class="value">
                  {getbalance()} {tokensymbol()}
                </a>
              </div>
              <div class="line">
                <a class="identfier">Voting power reset:</a>
                <a class="value">{countitdown()}</a>
              </div>
              <hr />
              <div class="line">
                <a class="identfier">Vote rewards left:</a>
                <a class="value">{rewardsleft()}</a>
              </div>
              <div class="line">
                <a class="identfier">Vote rewards reset:</a>
                <a class="value">{countitdownvotes()}</a>
              </div>
              <hr />
              <div class="line">
                <a class="identfier">Voting reward:</a>
                <a class="value">
                  {voterewards(gettotalstaked(), parseInt(stakedforcom()))}{" "}
                  GOVRN
                </a>
              </div>
              <div class="line">
                <a class="identfier">Poll reward:</a>
                <a class="value">
                  {pollrewards(gettotalstaked(), parseInt(stakedforcom()))}{" "}
                  GOVRN
                </a>
              </div>
              <hr />
              <div class="line">
                <a
                  class="identfier"
                  style={{
                    "margin-top": "10px",
                  }}
                >
                  Poll reward threshold:
                </a>
                <a
                  style={{
                    "margin-left": "15px",
                  }}
                >
                  {stakeformatter(getrewardthreshold())} {tokensymbol()}
                </a>

                <a
                  class="value"
                  data-html="true"
                  data-for="uus"
                  data-tip={
                    "*number of tokens used in your poll have to be equal <br/> or higher than the Poll reward threshold in order to receive the Poll reward<br/> (Poll reward threshold = 0.1 * All time most popular poll of your community)"
                  }
                  style={{
                    fontWeight: "bold",
                  }}
                >
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
                      fontWeight: "bold",
                    }}
                  />
                  <ReactTooltip
                    id="uus"
                    type="dark"
                    effect="solid"
                    backgroundColor="black"
                    place="left"
                    style={{
                      fontWeight: "bold",
                    }}
                  />{" "}
                </a>
              </div>
            </div>
          )}

          <Button
            color="inherit"
            onClick={() => logmeout()}
            style={{ "border-radius": "50px" }}
          >
            Log out
          </Button>
          <Button
            onClick={toggle}
            color="inherit"
            id="logoutname"
            style={{ "border-radius": "50px" }}
          >
            {displayaccountname()}
          </Button>
        </div>
        /*
<div class="dropdown">
  <button class="button">Menu item</button>
  <div id="drop" class="dropdown-content">
    <div class ="line">
      <a class="identfier"><b>lennyaccount</b></a>
    </div>
    <div class ="line">
      <a class="identfier">Balance</a>
      <a class="value">45 GOVRN</a>
    </div>
    <div class ="line">
      <a class="identfier">Voting power</a>
      <a class="value">45 ATMOS</a>
    </div>
    <div class ="line">
      <a class="identfier">Voting power reset</a>
      <a class="value">5 hrs</a>
    </div>
  </div>
</div>
*/
      );
    } else {
      //IF THERE IS NO SESSIONRESULT WE SHOW LOGIN BUTTON
      return (
        <Button
          color="inherit"
          onClick={showModal}
          style={{ borderRadius: "15px" }}
        >
          Log in
        </Button>
      );
    }
  };

  const logbuttonmob = () => {
    if (accountname) {
      //IF WE HAVE A SESSIONRESULT, SHOW LOGIN BUTTON
      return (
        <div>
          {isOpenedmob && (
            <div
              id="drop"
              class="dropdown-contentmob"
              style={{ "font-family": "roboto" }}
            >
              <div class="line">
                <a class="identfier">
                  <b>{displayaccountname()}</b>
                </a>
              </div>
              <hr />
              <div class="line" style={{ "font-weight": "600" }}>
                <a class="identfier">Balance:</a>
                <a class="value">{getmybalance()} GOVRN</a>
              </div>
              <hr />
              <div class="line">
                <a class="identfier">Voting power:</a>
                <a class="value">
                  {getbalance()} {tokensymbol()}
                </a>
              </div>
              <div class="line">
                <a class="identfier">Voting power reset:</a>
                <a class="value">{countitdown()}</a>
              </div>
              <hr />
              <div class="line">
                <a class="identfier">Vote rewards left:</a>
                <a class="value">{rewardsleft()}</a>
              </div>
              <div class="line">
                <a class="identfier">Vote rewards reset:</a>
                <a class="value">{countitdownvotes()}</a>
              </div>
              <hr />
              <div class="line">
                <a class="identfier">Voting reward:</a>
                <a class="value">
                  {voterewards(gettotalstaked(), parseInt(stakedforcom()))}{" "}
                  GOVRN
                </a>
              </div>
              <div class="line">
                <a class="identfier">Poll reward:</a>
                <a class="value">
                  {pollrewards(gettotalstaked(), parseInt(stakedforcom()))}{" "}
                  GOVRN
                </a>
              </div>
              <hr />
              <div class="line">
                <a
                  class="identfier"
                  style={{
                    "margin-top": "10px",
                  }}
                >
                  Poll reward threshold:
                </a>
                <a
                  style={{
                    "margin-left": "23px",
                  }}
                >
                  {stakeformatter(getrewardthreshold())} {tokensymbol()}
                </a>

                <a
                  class="value"
                  data-html="true"
                  data-for="uus"
                  data-tip={
                    "*number of tokens used in your poll have to be equal <br/> or higher than the Poll reward threshold in order to receive the Poll reward<br/> (Poll reward threshold = 0.1 * All time most popular poll of your community)"
                  }
                  style={{
                    fontWeight: "bold",
                  }}
                >
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

                      fontWeight: "bold",
                    }}
                  />
                  <ReactTooltip
                    id="uus"
                    type="dark"
                    effect="solid"
                    backgroundColor="black"
                    place="left"
                    style={{
                      fontWeight: "bold",
                    }}
                  />{" "}
                </a>
              </div>
            </div>
          )}
          <Button
            color="inherit"
            onClick={() => logmeout()}
            style={{ "border-radius": "50px", "margin-right": "auto" }}
          >
            Log out
          </Button>
        </div>
        /*
<div class="dropdown">
  <button class="button">Menu item</button>
  <div id="drop" class="dropdown-content">
    <div class ="line">
      <a class="identfier"><b>lennyaccount</b></a>
    </div>
    <div class ="line">
      <a class="identfier">Balance</a>
      <a class="value">45 GOVRN</a>
    </div>
    <div class ="line">
      <a class="identfier">Voting power</a>
      <a class="value">45 ATMOS</a>
    </div>
    <div class ="line">
      <a class="identfier">Voting power reset</a>
      <a class="value">5 hrs</a>
    </div>
  </div>
</div>
*/
      );
    } else {
      //IF THERE IS NO SESSIONRESULT WE SHOW LOGIN BUTTON
      return (
        <Button
          color="inherit"
          onClick={showModal}
          style={{
            borderRadius: "50px",
            "margin-right": "auto",
          }}
        >
          Log in
        </Button>
      );
    }
  };

  const showusername = () => {
    if (activeUser) {
      return displayaccountname();
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
          data-for="signalprogress"
          data-tip={
            "*your poll will be active for 7 days <br/><br /> *if your poll reaches the Poll reward threshold,<br /> at the end of the 7th day you can get rewarded<br/> in GOVRN tokens <br/><br /> *tokens used to create the poll get <br /> get burned decreasing the Total Circulation"
          }
        >
          <ReactTooltip
            id="signalprogress"
            type="dark"
            effect="solid"
            backgroundColor="black"
            place="right"
          />
          Poll creation
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
          Creation cost: {cost} GOVRN
        </a>
      </div>
    );
  };

  const votingfield = (text, i) => {
    votinglist[i] = text;
  };

  const addvotingfield = () => {
    // FUNCTION THAT GETS CALLED WHEN YOU ADD ANOTHER POLL OPTION FIELD
    if (votinglist.length < 5) {
      //IF WE HAVE LESS THAN 5 POLL OPTIONS
      setVotingList([...votinglist, ""]); //ADD ANOTHER POLL OPTION TO THE END OF THE ARRAY
    }
  };

  const gettimediff = (creationdate) => {
    //PASS IN THE POLL CREATION TIMESTAMP FROM THE TABLE
    const curr = new Date().getTime(); //GET CURRENT TIME
    //return moment(creationdate + "Z").to(moment(curr));

    //if (curr + "Z" > moment(creationdate + "Z").add(72, "hours")) {

    if (
      moment().diff(moment(creationdate + "Z").add(168, "hours"), "minutes") > 0
    ) {
      return (
        "expired " +
        moment(creationdate + "Z")
          .add(168, "hours")
          .fromNow()
      );
    } else {
      return (
        "expires " +
        moment(creationdate + "Z")
          .add(168, "hours")
          .fromNow()
      );
    }

    //creationdate.add(3, "days");
    //return moment(creationdate)
    // .to(moment(curr + "Z"));
    /*
    const d1 = moment(curr).to(moment(creationdate + "Z"));

    const d2 = moment.duration(3, "days");

    const d3 = d2.subtract(d1);

    return d3;



return moment(curr).to(moment(creationdate + "Z"))


const firstvotetime = creationdate + "Z";
    const current = new Date();
    const difference = (firstvotetime - current) / 1000 / 3600 + 72;
    if (difference > 1) {
      return Math.floor(difference) + " h";
    } else if (difference < 1 && difference > 0) {
      return Math.floor(difference * 60) + " min";
    } else if (difference < 0) {
      return "0h";
    }

    */

    // return moment(curr).to(moment(creationdate + "Z"));

    /*
    const da = moment.duration(3, 'd');


    const z = moment(creationdate);
    const y = moment(creationdate).add(72, "hours");

    const diffInDays = z.diff(y, "hours");

    return "expires " + diffInDays;

    */

    //return "expires " + moment(creationdate).add(75, "hours").fromNow();

    // "in 4 years"

    //return "expires " + moment(creationdate).toNow();

    //return moment(curr).to(moment(creationdate + "Z"));

    //return moment.duration(curr.diff(creationdate)).humanize();
    //return moment.duration(curr.diff(creationdate));
    //FIND THE DIFFERENCE BETWEEN THE TWO TIMESTAMPS, Z JUST MAKES IT RECOGNIZEABLE UTC
  };
  //<Button color="inherit" onClick={() => onLike()}>Transsex</Button>

  //SIIIN SAAD NÜÜD COMMDATAT KASUTADA, MIS ON ÕIGE COMMUNITY JAOKS

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
              <Button
                style={{ color: "inherit", "border-radius": "50px" }}
                href={`${window.location}/Leaderboard`}
              >
                Governor board
              </Button>

              {logbutton()}
            </Toolbar>
          </AppBar>
          <AppBarOffset />
        </div>
      </div>

      <div class="mobilemenu">
        <AppBar
          position="fixed"
          color="primary"
          className={classes.appBar}
          color="transparent"
          style={{ "background-color": "white", height: "55px" }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              style={{
                "margin-left": "auto",
                "margin-right": "auto",
                opacity: "0.8",
              }}
              component={Link}
              to={"/"}
            >
              <AccountBalanceRoundedIcon style={{ fontSize: 27 }} />
            </IconButton>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              style={{
                "margin-left": "auto",
                "margin-right": "auto",
                opacity: "0.8",
              }}
              //component={Link}
              //to={`${window.location}/Leaderboard`}
              href={`${window.location}/Leaderboard`}
            >
              <img src="/wreathp.png" width="35"></img>
            </IconButton>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="open drawer"
              style={{
                "margin-left": "auto",
                "margin-right": "auto",
                opacity: "0.8",
              }}
              onClick={togglemob}
            >
              <OpenInBrowserRoundedIcon style={{ fontSize: 29 }} />
            </IconButton>
            {logbuttonmob()}
          </Toolbar>
        </AppBar>
      </div>

      <div class="app">
        <div>
          <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>{pollcost(pollcostarv())}</Modal.Header>
            <Modal.Body>
              <TextField
                style={{ width: "97%", margin: "7px" }}
                label={"Poll question"}
                onBlur={(text) => setQuestionSubmission(text.target.value)}
                id="outlined-basic"
                variant="outlined"
              />
              <TextField
                style={{ width: "97%", margin: "7px" }}
                label={"Poll description"}
                onBlur={(text) => setQuestionDescription(text.target.value)}
                id="outlined-basic"
                variant="outlined"
              />
              <br />
              {votinglist.map((u, i) => {
                return (
                  <TextField
                    style={{ width: "97%", margin: "7px" }}
                    label={"Answer option " + (i + 1)}
                    onBlur={(text) => votingfield(text.target.value, i)}
                    id="outlined-basic"
                    variant="outlined"
                  />
                );
              })}
              <center>
                <BootstrapButton
                  variant="outline-dark"
                  style={{
                    "font-weight": "bold",
                    borderRadius: "15px",
                    height: "38px",
                    fontSize: "15px",
                    width: "97%",
                    "margin-top": "10px",
                  }}
                  onClick={() => addvotingfield()}
                >
                  Add option
                </BootstrapButton>
                <br />

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
                  onClick={() => createpoll()}
                >
                  Create poll
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
                Polls are stored fully
                <a href="https://bloks.io/account/consortiumlv"> on-chain</a>
              </Typography>
            </center>
          </Modal>

          <Modal show={show1} onHide={handleClose1} centered>
            <Modal.Header closeButton>
              <Typography
                style={{
                  fontSize: "22px",
                  "font-weight": "bold",
                  "margin-left": "7px",
                }}
                data-html="true"
                data-for="signalprogress"
                data-tip={
                  "*first 3 daily votes are rewarded <br/> (three per all communities, not per community) <br/><br /> *based on Quadratic Voting principles<br /> a) adjusted voting power equalling to square root of the tokens voted with <br />  b) daily limit on voting power equalling to token holdings"
                }
              >
                <ReactTooltip
                  id="signalprogress"
                  type="dark"
                  effect="solid"
                  backgroundColor="black"
                  place="right"
                />
                Voting
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
            <Modal.Body style={{ padding: "20px" }}>
              <Slider
                defaultValue={voteamount}
                ValueLabelComponent={ValueLabelComponent}
                aria-label="custom thumb label"
                step={1}
                min={0}
                max={getbalance()}
                onChangeCommitted={(e, val) =>
                  isNaN(val) ? setVoteAmount(0) : setVoteAmount(val)
                }
                style={{
                  marginBottom: "10px",
                  "margin-top": "10px",
                  color: "black",
                }}
              />
              <br />

              <center>
                <a style={{ "font-weight": "500", "font-family": "roboto" }}>
                  You're voting with: {voteamount} {tokensymbol()}{" "}
                </a>
              </center>
              <br />
              <center>
                {" "}
                <BootstrapButton
                  variant="dark"
                  style={{
                    width: "30%",
                    "font-weight": "bold",
                    borderRadius: "15px",
                    align: "center",
                  }}
                  onClick={() => vote(votekey, votepollkey)}
                >
                  Vote
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
                Votes are stored fully
                <a href="https://bloks.io/account/consortiumlv"> on-chain</a>
              </Typography>
            </center>
          </Modal>

          <Modal show={show2} onHide={handleClose2} centered>
            <Modal.Header closeButton>
              <Typography
                style={{
                  fontSize: "22px",
                  "font-weight": "bold",
                  "margin-left": "7px",
                }}
                data-html="true"
                data-for="signalprogress"
                data-tip={
                  "*the more GOVRN tokens staked the higher the <br/> Vote and Poll rewards are for your community"
                }
              >
                <ReactTooltip
                  id="signalprogress"
                  type="dark"
                  effect="solid"
                  backgroundColor="black"
                  place="right"
                />
                Staking
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
            <Modal.Body style={{ padding: "20px" }}>
              <a>{displaystake()}</a>
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
                No time delay for unstaking
              </Typography>
            </center>
          </Modal>

          <div>
            {topcard()}
            <Card
              className={classes.root}
              style={{
                "margin-top": "7px",
                "padding-left": "25px",
                padding: "7px",
                borderRadius: "15px",
              }}
            >
              <Button
                style={{
                  color: "gray",
                  "margin-left": "6px",
                  fontSize: "13px",
                  borderRadius: "15px",
                }}
                onClick={() => filtermypolls()}
              >
                My polls
              </Button>
              <a
                style={{
                  color: "gray",
                  "padding-top": "3px",
                }}
              >
                |
              </a>
              <Button
                style={{
                  color: "gray",
                  "margin-right": "0px",
                  fontSize: "13px",
                  borderRadius: "15px",
                }}
                onClick={() => window.location.reload(false)}
              >
                Top polls
              </Button>{" "}
              <BootstrapButton
                color="inherit"
                onClick={handleShow}
                variant="outline-dark"
                style={{
                  "font-weight": "bold",
                  borderRadius: "15px",
                  width: "120px",
                  height: "35px",
                  "margin-right": "9px",
                  fontSize: "14px",
                  float: "right",
                }}
              >
                Create poll
              </BootstrapButton>
            </Card>
          </div>
        </div>

        {data.rows.map((u, i) => {
          return (
            <div key={i}>
              <Card
                className={classes.root}
                style={{
                  "margin-top": "7px",
                  padding: "10px",
                  "padding-bottom": "20px",
                  borderRadius: "20px",
                  fontFamily: "roboto",
                }}
              >
                <CardHeader
                  style={{ "padding-bottom": "10px" }}
                  avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                      {u.creator.charAt(0).toUpperCase()}
                    </Avatar>
                  }
                  action={
                    <div>
                      <IconButton
                        aria-label="settings"
                        data-html="true"
                        data-for="pede3"
                        onClick={() => getpollurl(u.pollkey, u.uniqueurl)}
                      >
                        <ShareIcon
                          style={{
                            opacity: 0.8,
                            width: "23px",
                            height: "23px",
                          }}
                        />
                        <ReactTooltip
                          id="pede3"
                          type="dark"
                          effect="solid"
                          backgroundColor="black"
                          place="bottom"
                        />
                      </IconButton>

                      <IconButton
                        aria-label="settings"
                        data-html="true"
                        data-for="pede3"
                        onClick={() => finishpoll(u.pollkey)}
                      >
                        <HighlightOffIcon
                          style={{
                            opacity: 0.8,
                            width: "25px",
                            height: "25px",
                          }}
                        />
                        <ReactTooltip
                          id="pede3"
                          type="dark"
                          effect="solid"
                          backgroundColor="black"
                          place="bottom"
                        />
                      </IconButton>
                    </div>
                  }
                  title={u.creator}
                  subheader={gettimediff(u.timecreated)}
                />

                <CardContent style={{ paddingTop: "8px" }}>
                  <Typography
                    style={{
                      color: "rgba(0, 0, 0, 0.87)",
                      "font-weight": "400",
                    }}
                    class="question"
                    target="_blank"
                    component={Link}
                    to={`/poll/${u.pollkey}/${u.uniqueurl}/${scope}`}
                  >
                    {u.question}
                  </Typography>
                  <div
                    style={{
                      color: "rgba(0, 0, 0, 0.54)",
                      "font-size": "15px",
                      "margin-top": "8px",
                      "margin-bottom": "19px",
                    }}
                  >
                    {u.description}
                  </div>
                  <a
                    style={{
                      color: "rgba(0, 0, 0, 0.74)",
                      "font-size": "16px",
                    }}
                  >
                    {polloptions(u.totalvote, u.answers, u.pollkey)}
                  </a>
                  <div style={{ color: "#485A70" }} class="pollstats">
                    <div
                      style={{ float: "left" }}
                      data-html="true"
                      data-for="pede1"
                      data-tip={"Number of voters"}
                    ></div>{" "}
                    <div
                      style={{ float: "right" }}
                      data-html="true"
                      data-for="pede1"
                      data-tip={"Number of voters"}
                    >
                      <ReactTooltip
                        id="pede1"
                        type="dark"
                        effect="solid"
                        backgroundColor="black"
                        place="bottom"
                      />
                      &nbsp;&nbsp;&nbsp;
                      <HowToRegOutlinedIcon
                        style={{
                          color: checkifvoted(u.pollkey) ? "#388c3c" : "",
                        }}
                      />{" "}
                      {u.nrofvoters}
                    </div>
                    <div
                      style={{ float: "right" }}
                      data-html="true"
                      data-for="pede2"
                      data-tip={"Total tokens voted with"}
                    >
                      <ReactTooltip
                        id="pede2"
                        type="dark"
                        effect="solid"
                        backgroundColor="black"
                        place="bottom"
                      />
                      <img src={tokenurl()} height="24px" />
                      &nbsp;
                      {stakeformatter(u.sumofallopt)} {tokensymbol()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default withUAL(App);
