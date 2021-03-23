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
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import PeopleOutline from "@material-ui/icons/PeopleOutline";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Swal from "sweetalert2";
import Tooltip from "@material-ui/core/Tooltip";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import ReactTooltip from "react-tooltip";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import HowToRegOutlinedIcon from "@material-ui/icons/HowToRegOutlined";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { Button as BootstrapButton } from "react-bootstrap";
import CardMedia from "@material-ui/core/CardMedia";
import { withUAL } from "ual-reactjs-renderer";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import ShareIcon from "@material-ui/icons/Share";
import ReactGA from "react-ga";
import * as clipboard from "clipboard-polyfill/text";
import AccountBalanceRoundedIcon from "@material-ui/icons/AccountBalanceRounded";
import OpenInBrowserRoundedIcon from "@material-ui/icons/OpenInBrowserRounded";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: "30%",
  },
  avatar: {
    backgroundColor: "#343A40",
    opacity: 0.7,
  },
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

function sumArray(arr) {
  return arr.reduce((sum, n) => sum + n);
}

function sortBySum(a, b) {
  return sumArray(b.totalvote) - sumArray(a.totalvote);
}

function App(props) {
  const {
    ual: { showModal, hideModal },
  } = props;
  const classes = useStyles();
  const [data, setData] = useState({ rows: [] });
  const [databalance, setDataBalance] = useState();
  const [questionsubmission, setQuestionSubmission] = useState({
    question: "",
  });
  const [nrofvotes, setNumberofVotes] = useState({ rows: [] });
  const [totalstaked, setTotalStaked] = useState({ rows: [] });
  const [stakingbalance, setStakingBalance] = useState({ rows: [] });
  const [mystake, setMyStake] = useState({ rows: [] });
  const [dataind, setMyindStake] = useState({ rows: [] });
  const [option1submission, setOption1Submission] = useState("");
  const [option2submission, setOption2Submission] = useState("");
  const [option3submission, setOption3Submission] = useState("");
  const [option4submission, setOption4Submission] = useState("");
  const [isOpened, setIsOpened] = useState(true);
  const [isOpenedmob, setIsOpenedmob] = useState(false);
  const [votedin, setVotedin] = useState({ rows: [] });

  const [dailyvoted, setDailyVoted] = useState({ rows: [] });
  const [votedata, setVoteData] = useState({ rows: [] });
  const [votedata1, setVoteData1] = useState({ rows: [] });
  const [votedata2, setVoteData2] = useState({ rows: [] });
  const [stakeamount, setStakeAmount] = useState(1);
  const [unstakeamount, setUnStakeAmount] = useState(1);
  const [option5submission, setOption5Submission] = useState("");
  const [voteamount, setVoteAmount] = useState(1);
  const [sessionresult, setSessionResult] = useState("");
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [communitydata, setCommunityData] = useState({ rows: [] });
  const [show2, setShow2] = useState(false);
  const [accountname, setAccountName] = useState("");
  const [questiondescription, setQuestionDescription] = useState("");
  const [votinglist, setVotingList] = useState(["", ""]);
  const [totalcircu, setTotalCircu] = useState({ rows: [] });

  const handleShow = () => setShow(true);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const handleShow2 = () => setShow2(true);
  const handleClose2 = () => setShow2(false);

  const [votekey, setVoteKey] = useState();
  const [votepollkey, setVotePollKey] = useState();
  const AppBarOffset = () => {
    return <div className={classes.offset} />;
  };

  function toggle() {
    setIsOpened((wasOpened) => !wasOpened);
  }

  function togglemob() {
    setIsOpenedmob((wasOpened) => !wasOpened);
  }

  const handleClose = () => {
    setShow(false);
    setVotingList(["", ""]);
    setQuestionSubmission("");
    setQuestionDescription("");
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
      title: "Opening wallet to delete the poll",
    });
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
      title: "Successfully staked!",
    });
  };

  const sucessunstake = () => {
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
      title: "Successfully unstaked!",
    });
  };


  const sucessvote = () => {
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
      title: "Successfully voted!",
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
      title: "Opening wallet...",
    });
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

  const logmeout = () => {
    logout();
    window.location.reload(false);
  };

  const location = useLocation();
  const split = location.pathname.split("/")[2];
  const tablebound = Number(split.replace("/", ""));
  const scope = location.pathname.split("/")[4];

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

  const gettimediff = (creationdate) => {
    //PASS IN THE POLL CREATION TIMESTAMP FROM THE TABLE
    const curr = new Date().getTime(); //GET CURRENT TIME
    //return moment(creationdate + "Z").to(moment(curr));

    //if (curr + "Z" > moment(creationdate + "Z").add(72, "hours")) {


    return (
      "created " +
      moment(creationdate + "Z")
        .fromNow()
    )

    //return "expires " + moment(creationdate).toNow();

    //return moment(curr).to(moment(creationdate + "Z"));

    //return moment.duration(curr.diff(creationdate)).humanize();
    //return moment.duration(curr.diff(creationdate));
    //FIND THE DIFFERENCE BETWEEN THE TWO TIMESTAMPS, Z JUST MAKES IT RECOGNIZEABLE UTC
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
  }, communitydata["rows"]);

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
        table: "kysimused",
        scope: scope,
        limit: 50,
        table_key: "pollkey",
        lower_bound: 0,
        upper_bound: 1000000,
      }),
    })
      .then((response) => response.json().then((data) => setData(data)))
      .then(stringmatches());
    //.then(restoreSession())
  }, data["rows"]);

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

  const checkifvoted = (pollid) => {
    var exists = votedin.rows.some((item) => item.pollkey === pollid);
    return votedin.rows.some((item) => item.pollkey.toString() == pollid);
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

  const stringmatches = () => {
    if (data.rows[0]) {
      const urluniqueurl = location.pathname.split("/")[3];
      const data1 = data.rows.filter(
        ({ uniqueurl }) => uniqueurl === urluniqueurl
      );
      console.log(data1);
      if (data1[0]) {
        if (data1[0]["uniqueurl"] == urluniqueurl) {
          return data1.map((u, i) => {
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
                          <ShareIcon style={{ opacity: 0.8 }} />
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
                      {" "}
                      <div
                        style={{ float: "right" }}
                        data-html="true"
                        data-for="pede1"
                        data-tip={"Number of votes"}
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
                            color: checkifvoted(u.pollkey) ? "#47b04c" : "",
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
          });
        }
      } else {
        return (
          <Card
            className={classes.root}
            style={{
              "margin-top": "7px",
              padding: "10px",
              "padding-bottom": "20px",
            }}
          >
            <CardContent>
              <center>
                <a class="question">
                  <a
                    href="https://pollhistory.consortium.vote/"
                    target="_blank"
                  >
                    Poll has expired
                  </a>{" "}
                  or you have the wrong url.
                </a>
              </center>
            </CardContent>
          </Card>
        );
      }
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
    const scope = location.pathname.split("/")[4];
    fetch("https://api.main.alohaeos.com:443/v1/chain/get_table_rows", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        json: true,
        code: "consortiumlv",
        scope: scope,
        table: "kysimused",
        table_key: "pollkey",
        lower_bound: tablebound,
        upper_bound: tablebound,
        limit: 1,
      }),
    })
      .then((response) => response.json().then((data) => setData(data)))
      .then(restoreSession());
  }, data["rows"]);

  useEffect(() => {
    if (sessionresult) {
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
          scope: sessionresult.auth.actor,
        }),
      }).then((response) =>
        response.json().then((databalance) => setDataBalance(databalance))
      );
    }
  }, databalance);

  //data.rows.sort(sortBySum);

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

  /* ANCHOR CONNECTION */
  const transport = new AnchorLinkBrowserTransport();
  // initialize the link, this time we are using the TELOS chain
  const link = new AnchorLink({
    transport,
    chainId: "5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191",
    rpc: "https://kylin-dsp-2.liquidapps.io",
  });

  const identifier = "consortiumlv";
  let session;
  const restoreSession = () => {
    link.restoreSession(identifier).then((result) => {
      setSessionResult(result);
    });
  };

  // login and store session if sucessful
  const login = () => {
    link.login(identifier).then((result) => {
      session = result.session;
      setSessionResult(session);
    });
  };

  // logout and remove session from storage

  const tokenurl = () => {
    if (communitydata.rows[0]) {
      var commdata = communitydata.rows.filter(function (e) {
        return e.community == scope;
      });
      return commdata[0].tokenurl;
    }
  };

  /* ASK TO SIGN AND BROADCAST TO CHAIN */

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
              name: "deletepoll",
              authorization: [
                {
                  actor: displayaccountname(), // use account that was logged in
                  permission: "active",
                },
              ],
              data: {
                pollkey: pollkey,
                creator: displayaccountname(),
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

        actionpuccis(error);
        console.log(error.message);

      }
    } else {
      showModal();
    }
  };

  const vote = async (option, pollkey) => {
    const {
      ual: { login, displayError, showModal },
    } = props;
    // Via static contextType = UALContext, access to the activeUser object on this.context is now available
    const {
      ual: { activeUser },
    } = props;
    if (activeUser) {
      loadingvote();
      try {
        const optionnumber = Number(option) + 1;
        const amount = Number(voteamount);
        const uniquename = makeid();
        const uniquenamests = makeid();
        const uniquenamevtb = makeid();
        const uniquenameindvt = makeid();

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
        //window.location.reload(false);
        sucessvote();

        ReactGA.event({
          category: "Chain acion",
          action: "User voted in individual poll.",
        });
      } catch (error) {

        actionpuccis(error);
        console.log(error.message);

      }
    } else {
      showModal();
    }
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
            style={{
              float: "right",
              fontSize: "14px",
              "font-weight": "bold",
            }}
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

  const tokensymbol = () => {
    if (communitydata.rows[0]) {
      var commdata = communitydata.rows.filter(function (e) {
        return e.community == scope;
      });
      return commdata[0].tokensymbol;
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
            defaultValue={voteamount}
            ValueLabelComponent={ValueLabelComponent}
            aria-label="custom thumb label"
            step={1}
            min={0}
            max={maxstakevalue}
            onChange={(e, val) => setStakeAmount(val)} //SETSTAKEAMOUNT INSTEAD!
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
            onChange={(e, val) => setUnStakeAmount(val)} //SETSTAKEAMOUNT INSTEAD!
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
            onChange={(e, val) => setStakeAmount(val)} //SETSTAKEAMOUNT INSTEAD!
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
            onChange={(e, val) => setUnStakeAmount(val)} //SETSTAKEAMOUNT INSTEAD!
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

        sucessstake();
        //lita()
      } catch (error) {

        actionpuccis(error);
        console.log(error.message);

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
        //window.location.reload(false);
        sucessunstake();

      } catch (error) {

        actionpuccis(error);
        console.log(error.message);

      }
    } else {
      showModal();
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

  const getvote = () => {
    //READS YOUR TOKEN BALANCE FOR VOTING
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

    if (!votedata.rows[0] && scope == "conscommcons") {
      //IF WE ARE ON EOS PAGE, DO THE FOLLOWING FETCH
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
      }).then((response) => response.json().then((data) => setVoteData(data)));
    }
    if (!votedata.rows[0] && scope == "daddcommcons") {
      //IF WE ARE ON EOS PAGE, DO THE FOLLOWING FETCH
      fetch("https://api.main.alohaeos.com:443/v1/chain/get_table_rows", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          json: true,
          code: "dadgovernanc",
          table: "stake2",
          scope: "dadgovernanc",
          lower_bound: displayaccountname(),
          upper_bound: displayaccountname(),
        }),
      }).then((response) => response.json().then((data) => setVoteData(data)));
    }

    if (!votedata.rows[0] && scope == "yd2x1lcglqlx") {
      //IF WE ARE ON EOS PAGE, DO THE FOLLOWING FETCH
      fetch("https://api.main.alohaeos.com:443/v1/chain/get_table_rows", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          json: true,
          code: "eosdactokens",
          table: "stakes",
          scope: "metadac",
          lower_bound: displayaccountname(),
          upper_bound: displayaccountname(),
        }),
      }).then((response) => response.json().then((data) => setVoteData(data)));
    }

    if (!votedata.rows[0] && scope == "umyon4jynaoc") {
      //IF WE ARE ON EOS PAGE, DO THE FOLLOWING FETCH
      fetch("https://api.main.alohaeos.com:443/v1/chain/get_table_rows", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          json: true,
          code: "emanateoneos",
          table: "accounts",
          scope: displayaccountname(),
        }),
      }).then((response) => response.json().then((data) => setVoteData(data)));
    }

    if (!votedata.rows[0] && scope == "c1zhia3anpum") {
      //IF WE ARE ON EOS PAGE, DO THE FOLLOWING FETCH
      fetch("https://api.main.alohaeos.com:443/v1/chain/get_table_rows", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          json: true,
          code: "thebeantoken",
          table: "accounts",
          scope: displayaccountname(),
        }),
      }).then((response) => response.json().then((data) => setVoteData(data)));
    }



    if (!votedata.rows[0] && scope == "zlmdhu2blclw") {
      //IF WE ARE ON EOS PAGE, DO THE FOLLOWING FETCH
      fetch("https://api.main.alohaeos.com:443/v1/chain/get_table_rows", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          json: true,
          code: "cet.f",
          table: "accounts",
          scope: displayaccountname(),
          lower_bound: "CETF",
          upper_bound: "CETF",
        }),
      }).then((response) => response.json().then((data) => setVoteData(data)));
    }


  };

  /*
  if (data.rows[0]) {
    data.rows.sort((a, b) => (a.rewardsreceived < b.rewardsreceived ? 1 : -1));
  }

  data.rows.sort(sortBySum);
  */

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

  const getbalance = () => {
    if (tokensymbol() != "DACDAC") {
      if (dailyvoted.rows[0]) {
        const firstvotetime = new Date(
          dailyvoted.rows[0].first_vote_time + "Z"
        );
        const current = new Date();
        const difference = (firstvotetime - current) / 1000 / 3600 + 24;
        if (difference > 0) {
          if (votedata.rows[0]) {
            balance = Math.floor(
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
          //const bal = balance - daily;

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

          if (votedata.rows[0]) {
            const bal = balance + cpu + net + rex;
            //const bal = balance;

            return bal;
          } else {
            return 0;
          }
        }
      } else {
        if (votedata.rows[0]) {
          balance = Math.floor(Number(votedata.rows[0].balance.split(" ")[0]));
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
        if (votedata.rows[0]) {
          const bal = balance + cpu + net + rex;
          //const bal = balance;
          return bal;
        } else {
          return 0;
        }
      }
    } else {

      if (dailyvoted.rows[0]) {
        const firstvotetime = new Date(
          dailyvoted.rows[0].first_vote_time + "Z"
        );
        const current = new Date();
        const difference = (firstvotetime - current) / 1000 / 3600 + 24;
        if (difference > 0) {
          if (votedata.rows[0]) {
            balance = Math.floor(
              Number(votedata.rows[0].stake.split(" ")[0])
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
          //const bal = balance - daily;

          return bal;
        }
        if (difference < 0) {
          if (votedata.rows[0]) {
            var balance = Math.floor(
              Number(votedata.rows[0].stake.split(" ")[0])
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

          if (votedata.rows[0]) {
            const bal = balance + cpu + net + rex;
            //const bal = balance;

            return bal;
          } else {
            return 0;
          }
        }
      } else {
        if (votedata.rows[0]) {
          balance = Math.floor(Number(votedata.rows[0].stake.split(" ")[0]));
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
        if (votedata.rows[0]) {
          const bal = balance + cpu + net + rex;
          //const bal = balance;
          return bal;
        } else {
          return 0;
        }
      }
    }
  };
  /*
 
  const getbalance = () => {
    if (dailyvoted.rows[0]) {
      const firstvotetime = new Date(dailyvoted.rows[0].first_vote_time + "Z");
      const current = new Date();
      const difference = (firstvotetime - current) / 1000 / 3600 + 0.0833333;
      if (difference > 0) {
        let balance = 0;
 
        if (votedata.rows[0]) {
          balance = Math.floor(Number(votedata.rows[0].balance.split(" ")[0]));
        }
        let cpu = 0;
        let net = 0;
        if (votedata1.rows[0]) {
          cpu = Math.floor(Number(votedata1.rows[0].cpu_weight.split(" ")[0]));
          net = Math.floor(Number(votedata1.rows[0].net_weight.split(" ")[0]));
        } /*
        let rex = 0;
        if (votedata2.rows[0]) {
          rex = Math.floor(Number(votedata2.rows[0].vote_stake.split(" ")[0]));
        }
        
        let daily = 0;
        if (dailyvoted.rows[0]) {
          daily = Math.floor(Number(dailyvoted.rows[0].dailyvoted));
        }
        const bal = balance + cpu + net - daily;
        return bal;
      }
      if (difference < 0) {
        let balance = 0;
 
        if (votedata.rows[0]) {
          balance = Math.floor(Number(votedata.rows[0].balance.split(" ")[0]));
        }
        let cpu = 0;
        let net = 0;
        if (votedata1.rows[0]) {
          cpu = Math.floor(Number(votedata1.rows[0].cpu_weight.split(" ")[0]));
          net = Math.floor(Number(votedata1.rows[0].net_weight.split(" ")[0]));
        } /*
        let rex = 0;
        if (votedata2.rows[0]) {
          rex = Math.floor(Number(votedata2.rows[0].vote_stake.split(" ")[0]));
        }
        
 
        const bal = balance + cpu + net;
        return bal;
      }
    } else {
      let balance = 0;
      if (votedata.rows[0]) {
        balance = Math.floor(Number(votedata.rows[0].balance.split(" ")[0]));
      }
      let cpu = 0;
      let net = 0;
      if (votedata1.rows[0]) {
        cpu = Math.floor(Number(votedata1.rows[0].cpu_weight.split(" ")[0]));
        net = Math.floor(Number(votedata1.rows[0].net_weight.split(" ")[0]));
      } /*
      let rex = 0;
      if (votedata2.rows[0]) {
        rex = Math.floor(Number(votedata2.rows[0].vote_stake.split(" ")[0]));
      }
      
      let daily = 0;
      if (dailyvoted.rows[0]) {
        daily = Math.floor(Number(dailyvoted.rows[0].dailyvoted));
      }
      const bal = balance + cpu + net - daily;
      return bal;
    }
  };
*/

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
                <a class="identfier" style={{ "color": "black" }}>
                  <b>{displayaccountname()}</b>
                </a>
              </div>
              <hr />
              <div class="line" style={{ "font-weight": "600" }}>
                <a class="identfier" style={{ "color": "black" }}>Balance:</a>
                <a class="value" style={{ "color": "black" }}>{getmybalance()} GOVRN</a>
              </div>
              <hr />
              <div class="line">
                <a class="identfier" style={{ "color": "black" }}>Voting power:</a>
                <a class="value" style={{ "color": "black" }}>
                  {getbalance()} {tokensymbol()}
                </a>
              </div>
              <div class="line">
                <a class="identfier" style={{ "color": "black" }}>Voting power reset:</a>
                <a class="value" style={{ "color": "black" }}>{countitdown()}</a>
              </div>
              <hr />
              <div class="line">
                <a class="identfier" style={{ "color": "black" }}>Vote rewards left:</a>
                <a class="value" style={{ "color": "black" }}>{rewardsleft()}</a>
              </div>
              <div class="line">
                <a class="identfier" style={{ "color": "black" }}>Vote rewards reset:</a>
                <a class="value" style={{ "color": "black" }}>{countitdownvotes()}</a>
              </div>
              <hr />
              <div class="line">
                <a class="identfier" style={{ "color": "black" }}>Voting reward:</a>
                <a class="value" style={{ "color": "black" }}>
                  {voterewards(gettotalstaked(), parseInt(stakedforcom()))}{" "}
                  GOVRN
                </a>
              </div>
              <div class="line">
                <a class="identfier" style={{ "color": "black" }}>Poll reward:</a>
                <a class="value" style={{ "color": "black" }}>
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
                    "color": "black",
                  }}
                >
                  Poll reward threshold:
                </a>
                <a
                  style={{
                    "margin-left": "4px",
                    float: "right",
                    "color": "black",
                  }}
                >
                  {stakeformatter(getrewardthreshold())} {tokensymbol()}
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
                <a class="identfier" style={{ "color": "black" }}>
                  <b>{displayaccountname()}</b>
                </a>
              </div>
              <hr />
              <div class="line" style={{ "font-weight": "600" }}>
                <a class="identfier" style={{ "color": "black" }}>Balance:</a>
                <a class="value" style={{ "color": "black" }}>{getmybalance()} GOVRN</a>
              </div>
              <hr />
              <div class="line">
                <a class="identfier" style={{ "color": "black" }}>Voting power:</a>
                <a class="value" style={{ "color": "black" }}>
                  {getbalance()} {tokensymbol()}
                </a>
              </div>
              <div class="line">
                <a class="identfier" style={{ "color": "black" }}>Voting power reset:</a>
                <a class="value" style={{ "color": "black" }}>{countitdown()}</a>
              </div>
              <hr />
              <div class="line">
                <a class="identfier" style={{ "color": "black" }}>Vote rewards left:</a>
                <a class="value" style={{ "color": "black" }}>{rewardsleft()}</a>
              </div>
              <div class="line">
                <a class="identfier" style={{ "color": "black" }}>Vote rewards reset:</a>
                <a class="value" style={{ "color": "black" }}>{countitdownvotes()}</a>
              </div>
              <hr />
              <div class="line">
                <a class="identfier" style={{ "color": "black" }}>Voting reward:</a>
                <a class="value" style={{ "color": "black" }}>
                  {voterewards(gettotalstaked(), parseInt(stakedforcom()))}{" "}
                  GOVRN
                </a>
              </div>
              <div class="line">
                <a class="identfier" style={{ "color": "black" }}>Poll reward:</a>
                <a class="value" style={{ "color": "black" }}>
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
                    "color": "black"
                  }}
                >
                  Poll reward threshold:
                </a>
                <a
                  style={{
                    "margin-left": "23px",
                    "color": "black"
                  }}
                >
                  {stakeformatter(getrewardthreshold())} {tokensymbol()}
                </a>

                <a
                  class="value"
                  data-html="true"
                  data-for="uus"
                  data-tip={
                    "*number of tokens used in your poll have to be equal <br/> or higher than the Poll reward threshold in order to receive the Poll reward.<br/> (Poll reward threshold = 0.1 * All time most popular poll of your community)"
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

  const showusername = () => {
    if (sessionresult) {
      return sessionresult.auth.actor;
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
            marginBottom: "10px",
            "margin-top": "10px",
            "padding-bottom": "10px",
            borderRadius: "20px",
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
                src={tokenurl()}
                width="30px"
                height="30px"
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
                href={
                  window.location.origin +
                  "/community/" +
                  scope +
                  "/Leaderboard"
                }
              >
                Most Active
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
              href={
                window.location.origin + "/community/" + scope + "/Leaderboard"
              }
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
            <Modal.Body>
              <TextField
                style={{ width: "100%", margin: "7px" }}
                label={"Poll question"}
                onChange={(text) => setQuestionSubmission(text.target.value)}
                id="outlined-basic"
                variant="outlined"
              />
              <br />
              <TextField
                style={{ width: "100%", margin: "7px" }}
                label={"First option"}
                onChange={(text) => setOption1Submission(text.target.value)}
                id="outlined-basic"
                variant="outlined"
              />
              <br />
              <TextField
                style={{ width: "100%", margin: "7px" }}
                label={"Second option"}
                onChange={(text) => setOption2Submission(text.target.value)}
                id="outlined-basic"
                variant="outlined"
              />
              <br />
              <TextField
                style={{ width: "100%", margin: "7px" }}
                label={"Third option"}
                onChange={(text) => setOption3Submission(text.target.value)}
                id="outlined-basic"
                variant="outlined"
              />
              <br />
              <TextField
                style={{ width: "100%", margin: "7px" }}
                label={"Fourth option"}
                onChange={(text) => setOption4Submission(text.target.value)}
                id="outlined-basic"
                variant="outlined"
              />
              <br />
              <TextField
                style={{ width: "100%", margin: "7px" }}
                label={"Fifth option"}
                onChange={(text) => setOption5Submission(text.target.value)}
                id="outlined-basic"
                variant="outlined"
              />
              <br />

              <br />
            </Modal.Body>
          </Modal>

          <Modal show={show1} onHide={handleClose1} centered>
            <Modal.Header>
              <Typography
                style={{
                  fontSize: "22px",
                  "font-weight": "bold",
                  "margin-left": "7px",
                }}
                data-html="true"
                data-for="signalprogress"
                data-tip={
                  "*first 3 daily votes are rewarded <br/><br /> *based on Quadratic Voting principles<br /> a) adjusted voting power equalling to square root of the tokens voted with <br />  b) daily limit on voting power equalling to token holdings"
                }
              >
                <ReactTooltip
                  id="signalprogress"
                  type="dark"
                  effect="solid"
                  backgroundColor="black"
                  place="bottom"
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
                min={1}
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
                <a style={{ "font-weight": "500" }}>
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
            <Modal.Header>
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
                  place="bottom"
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
        </div>
        <div>{topcard()}</div>
        {stringmatches()}
      </div>
    </div>
  );
}
export default withUAL(App);
