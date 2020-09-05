import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AnchorLink from "anchor-link";
import AnchorLinkBrowserTransport from "anchor-link-browser-transport";
import { Modal } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import Slider from "@material-ui/core/Slider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab";
import MenuIcon from "@material-ui/icons/Menu";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Swal from "sweetalert2";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { withUAL } from "ual-reactjs-renderer";
import Avatar from "@material-ui/core/Avatar";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import * as clipboard from "clipboard-polyfill/text";
import AccountBalanceRoundedIcon from "@material-ui/icons/AccountBalanceRounded";
import OpenInBrowserRoundedIcon from "@material-ui/icons/OpenInBrowserRounded";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from "react-tooltip";

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

  const logmeout = () => {
    logout();
    window.location.reload(false);
  };

  const classes = useStyles();
  const [data, setData] = useState({ rows: [] });
  const [databalance, setDataBalance] = useState();

  const [nrofvotes, setNumberofVotes] = useState({ rows: [] });
  const [totalstaked, setTotalStaked] = useState({ rows: [] });
  const [communitydata, setCommunityData] = useState({ rows: [] });
  const [dailyvoted, setDailyVoted] = useState({ rows: [] });
  const [votedata, setVoteData] = useState({ rows: [] });
  const [votedata1, setVoteData1] = useState({ rows: [] });
  const [votedata2, setVoteData2] = useState({ rows: [] });

  const [mystake, setMyStake] = useState({ rows: [] });
  const [dataind, setMyindStake] = useState({ rows: [] });

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [isOpenedmob, setIsOpenedmob] = useState(false);
  const [stakingbalance, setStakingBalance] = useState({ rows: [] });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const [votekey, setVoteKey] = useState();
  const [votepollkey, setVotePollKey] = useState();
  const AppBarOffset = () => {
    return <div className={classes.offset} />;
  };
  const location = useLocation();
  const scope = location.pathname.split("/")[2];

  const getrewardthreshold = () => {
    if (communitydata.rows[0]) {
      var commdata = communitydata.rows.filter(function (e) {
        return e.community == scope;
      });
      return parseInt(commdata[0].toppoll * 0.2);
    }
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
                    "*number of tokens used in your poll have to be equal <br/> or higher than the Poll reward threshold in order to receive the Poll reward<br/> (Poll reward threshold = 0.2 * Most Popular Poll of your Community)"
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

  const getstake = () => {
    //DOES ALL THE FETCHING FOR THE STAKE MODAL
    fetch("https://api.kylin.alohaeos.com/v1/chain/get_table_rows", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        json: true,
        code: "andrtestcons",
        table: "accounts",
        scope: displayaccountname(),
      }),
    }).then((response) =>
      response.json().then((data) => setStakingBalance(data))
    );

    fetch("https://api.kylin.alohaeos.com/v1/chain/get_table_rows", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        json: true,
        code: "andrtestcons",
        table: "indtotalstkh",
        scope: "andrtestcons",
        key_type: "name",
        index_position: 1,
        lower_bound: displayaccountname(),
        upper_bound: displayaccountname(),
      }),
    }).then((response) => response.json().then((data) => setMyStake(data)));

    fetch("https://api.kylin.alohaeos.com/v1/chain/get_table_rows", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        json: true,
        code: "andrtestcons",
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

  const getvote = () => {
    //READS YOUR TOKEN BALANCE FOR VOTING
    if (!votedata.rows[0] && scope == "viggtestcons") {
      //IF WE ARE ON VIGOR PAGE, DO THE FOLLOWING FETCH
      fetch("https://api.kylin.alohaeos.com/v1/chain/get_table_rows", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          json: true,
          code: "andrtestcons",
          table: "accounts",
          scope: displayaccountname(),
        }),
      }).then((response) => response.json().then((data) => setVoteData(data)));
    }
    if (!votedata.rows[0] && scope == "eosstestcons") {
      //IF WE ARE ON EOS PAGE, DO THE FOLLOWING FETCH
      fetch("https://api.kylin.alohaeos.com/v1/chain/get_table_rows", {
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

      fetch("https://api.kylin.alohaeos.com/v1/chain/get_table_rows", {
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

      fetch("https://api.kylin.alohaeos.com/v1/chain/get_table_rows", {
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
    }
  };

  const getnrofvotes = () => {
    fetch("https://api.kylin.alohaeos.com/v1/chain/get_table_rows", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        json: true,
        code: "andrtestcons",
        table: "paljuvoted",
        scope: "andrtestcons",
        key_type: "name",
        index_position: 1,
        lower_bound: displayaccountname(),
        upper_bound: displayaccountname(),
      }),
    }).then((response) =>
      response.json().then((nrofvotes) => setNumberofVotes(nrofvotes))
    );
  };

  useEffect(() => {
    fetch("https://api.kylin.alohaeos.com/v1/chain/get_table_rows", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        json: true,
        code: "andrtestcons",
        table: "totalstk",
        scope: "andrtestcons",
        limit: 1,
      }),
    }).then((response) =>
      response.json().then((totalstaked) => setTotalStaked(totalstaked))
    );
  }, totalstaked["rows"]);

  useEffect(() => {
    if (activeUser) {
      fetch("https://api.kylin.alohaeos.com/v1/chain/get_table_rows", {
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
        .then(getdailyvoted())
        .then(getnrofvotes())
        .then(getstake());
    }
  }, databalance);

  const getdailyvoted = () => {
    fetch("https://api.kylin.alohaeos.com/v1/chain/get_table_rows", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        json: true,
        code: "andrtestcons",
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

  useEffect(() => {
    fetch("https://api.kylin.alohaeos.com/v1/chain/get_table_rows", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        json: true,
        code: "andrtestcons",
        table: "commdata",
        scope: "andrtestcons",
        limit: 50,
      }),
    }).then((response) =>
      response.json().then((communitydata) => setCommunityData(communitydata))
    );
    //.then(restoreSession())
  }, communitydata["rows"]);

  useEffect(() => {
    fetch("https://api.kylin.alohaeos.com/v1/chain/get_table_rows", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        json: true,
        code: "andrtestcons",
        table: "parimad",
        scope: scope,
        limit: 5000,
      }),
    }).then((response) => response.json().then((data) => setData(data)));
    //.then(restoreSession())
  }, data["rows"]); //DONT FETCH IF WE HAVE DATA ROWS

  if (data.rows[0]) {
    data.rows.sort((a, b) =>
      Number(a.rewardsreceived.split(" ")[0]) <
      Number(b.rewardsreceived.split(" ")[0])
        ? 1
        : -1
    ); //CUT GOVRN OFF, MAKE IT A NR, AND THEN SORT
  }

  const getbalance = () => {
    if (dailyvoted.rows[0]) {
      const firstvotetime = new Date(dailyvoted.rows[0].first_vote_time + "Z");
      const current = new Date();
      const difference = (firstvotetime - current) / 1000 / 3600 + 0.0833333;
      if (difference > 0) {
        if (votedata.rows[0]) {
          var balance = Math.floor(
            Number(votedata.rows[0].balance.split(" ")[0])
          );
        }
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
        let daily = 0;
        if (dailyvoted.rows[0]) {
          daily = Math.floor(Number(dailyvoted.rows[0].dailyvoted));
        }
        const bal = balance + cpu + net + rex - daily;
        return bal;
      }
      if (difference < 0) {
        if (votedata.rows[0]) {
          var balance = Math.floor(
            Number(votedata.rows[0].balance.split(" ")[0])
          );
        }
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

        const bal = balance + cpu + net + rex;
        return bal;
      }
    } else {
      if (votedata.rows[0]) {
        var balance = Math.floor(
          Number(votedata.rows[0].balance.split(" ")[0])
        );
      }
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
      let daily = 0;
      if (dailyvoted.rows[0]) {
        daily = Math.floor(Number(dailyvoted.rows[0].dailyvoted));
      }
      const bal = balance + cpu + net + rex - daily;
      return bal;
    }
  };

  const getmybalance = () => {
    if (stakingbalance.rows[0]) {
      return Math.floor(Number(stakingbalance.rows[0].balance.split(" ")[0]));
    } else {
      return 0;
    }
  };

  const rewardsleft = () => {
    if (nrofvotes.rows[0]) {
      const nrofvote = nrofvotes.rows[0].nrofvotes;
      const rewardsleft = 3 - nrofvote;
      const firstvotetime = new Date(nrofvotes.rows[0].timefirstvote + "Z");
      const current = new Date();
      const difference = (firstvotetime - current) / 1000 / 3600 + 0.0833333;
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

  function togglemob() {
    setIsOpenedmob((wasOpened) => !wasOpened);
  }

  const pollrewards = (fullstake, communitystake) => {
    return parseInt(
      (Math.pow(communitystake / fullstake, 1 / 3) * 70000 + 10000) / 8
    ); //LISA KUUP JUUR communitystake/fullstake sellele
  };

  const voterewards = (fullstake, communitystake) => {
    return parseInt(
      (Math.pow(communitystake / fullstake, 1 / 3) * 8500 + 2500) / 8
    ); //LISA KUUP JUUR communitystake/fullstake sellele
  };
  const countitdownvotes = () => {
    if (nrofvotes.rows[0]) {
      const firstvotetime = new Date(nrofvotes.rows[0].timefirstvote + "Z");
      const current = new Date();
      const difference = (firstvotetime - current) / 1000 / 3600 + 0.0833333;
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

  const countitdown = () => {
    if (dailyvoted.rows[0]) {
      const firstvotetime = new Date(dailyvoted.rows[0].first_vote_time + "Z");
      const current = new Date();
      const difference = (firstvotetime - current) / 1000 / 3600 + 0.0833333;
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

  const tokensymbol = () => {
    if (communitydata.rows[0]) {
      var commdata = communitydata.rows.filter(function (e) {
        return e.community == scope;
      });
      return commdata[0].tokensymbol;
    }
  };

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

  const showusername = () => {
    if (activeUser) {
      return displayaccountname();
    }
  };

  return (
    <div style={{ "font-family": "roboto" }}>
      <div class="desktopmenu">
        <div className={classes.root}>
          <AppBar
            position="fixed"
            color="transparent"
            style={{ "background-color": "white" }}
          >
            <Toolbar>
              <IconButton
                component={Link}
                to={"/"}
                style={{ "background-color": "white" }}
              >
                <img
                  src="/logo.png"
                  width="66"
                  class="d-inline-block align-top"
                  style={{ "margin-bottom": 2, opacity: 0.7 }}
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
              href={`${window.location}`}
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
        <TableContainer
          component={Paper}
          style={{ "margin-top": "10px", borderRadius: "15px" }}
        >
          <Table className={classes.table} size="small" aria-label="rewards">
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }} width="25px">
                  #
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>GOVERNOR</TableCell>
                <TableCell style={{ fontWeight: "bold" }} align="right">
                  REWARDS
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.rows.map((u, i) => {
                if (i < 50) {
                  return (
                    <TableRow key={i}>
                      <TableCell component="th" scope="row">
                        {i + 1}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {u.governor}
                      </TableCell>

                      <TableCell align="right">
                        {parseInt(u.rewardsreceived) + " GOVRN"}
                      </TableCell>
                    </TableRow>
                  );
                }
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default withUAL(App);

//<Avatar aria-label="recipe" className={classes.avatar} style={{"margin-right":"100px"}}>
//u.governor.charAt(0).toUpperCase()}
//</Avatar>
