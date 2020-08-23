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

  const classes = useStyles();
  const [data, setData] = useState({ rows: [] });
  const [databalance, setDataBalance] = useState();
  const [questionsubmission, setQuestionSubmission] = useState({
    question: "",
  });
  const [questiondescription, setQuestionDescription] = useState({
    description: "",
  });
  const [option1submission, setOption1Submission] = useState("");
  const [option2submission, setOption2Submission] = useState("");
  const [option3submission, setOption3Submission] = useState("");
  const [option4submission, setOption4Submission] = useState("");
  const [option5submission, setOption5Submission] = useState("");
  const [voteamount, setVoteAmount] = useState(1);
  const [sessionresult, setSessionResult] = useState("");
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

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

  useEffect(() => {
    if (sessionresult) {
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
          scope: sessionresult.auth.actor,
        }),
      }).then((response) =>
        response.json().then((databalance) => setDataBalance(databalance))
      );
    }
  }, databalance); //DONT FETCH IF WE HAVE databalance

  const getbalance = () => {
    if (databalance) {
      return Math.floor(Number(databalance.rows[0].balance.split(" ")[0]));
    }
  };
  const logbutton = () => {
    if (accountname) {
      //IF WE HAVE A SESSIONRESULT, SHOW LOGIN BUTTON
      return (
        <div>
          <Button color="inherit" onClick={logout}>
            Log out
          </Button>
          <Button color="inherit" id="logoutname">
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
    <div>
      <div class="desktopmenu">
        <div className={classes.root}>
          <AppBar
            position="fixed"
            color="transparent"
            style={{ "background-color": "white" }}
          >
            <Toolbar>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                style={{ color: "#2A3747", "text-decoration": "none" }}
                className={classes.title}
                component={Link}
                to={"/"}
              >
                Consortium
              </Typography>
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
          style={{ "background-color": "white" }}
        >
          <Toolbar>
            {logbutton()}
            <Fab
              style={{ "background-color": "#AFBBC9" }}
              onClick={handleShow}
              aria-label="add"
              className={classes.fabButton}
            >
              <AddIcon style={{ color: "white" }} />
            </Fab>
            <div className={classes.grow} />
            <Button style={{ color: "#2A3747" }} color="inherit">
              {showusername()}
            </Button>
          </Toolbar>
        </AppBar>
      </div>

      <div class="app">
        <TableContainer
          component={Paper}
          style={{ "margin-top": "10px", borderRadius: "15px" }}
        >
          <Table
            className={classes.table}
            size="small"
            aria-label="rewards"
          >
            <TableHead>
              <TableRow>
              <TableCell width="25px">#</TableCell>
                <TableCell>Governor</TableCell>
                <TableCell align="right">Rewards</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.rows.map((u, i) => {
                if(i<50){
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
