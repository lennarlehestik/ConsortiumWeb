import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./History.css";
import { useLocation } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
global.fetch = require("node-fetch");

const { createDfuseClient } = require("@dfuse/client");

const client = createDfuseClient({
  apiKey: "web_980c76a681533405e40137b9d04a7a27",
  network: "eos.dfuse.eosnation.io",
});


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

function App() {
  const classes = useStyles();
  const AppBarOffset = () => {
    return <div className={classes.offset} />;
  };
  const location = useLocation();
  const scope = location.pathname.split("/")[2];
  console.log(scope);
  var list = {};
  const [datar, setDatar] = useState({});
  const [data, setdata] = useState("");
  const [commoption, setcommoption] = useState("eosscommcons");
  const [deleteoption, setdeleteoption] = useState("xschedule");
  const [loading, setLoading] = useState("loading");
  const [lowBlockNum, setLowBlockNum] = useState(-15000000);
  const [highBlockNum, setHighBlockNum] = useState(-1);

  function nFormatter(num) {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "G";
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return num;
  }

  useEffect(() => {
    setLoading("loading")
    if (scope) {
      const operation = `subscription($cursor: String!) {
        searchTransactionsBackward(query:"receiver:consortiumlv action:finishpoll db.table:kysimused" lowBlockNum: ${lowBlockNum}, highBlockNum: ${highBlockNum}, cursor: $cursor) {
          cursor
          trace { id matchingActions { json, dbOps(code: "consortiumlv", table:"kysimused"){operation, oldJSON {object error}} } }
        }
      }`;
      const operation2 = `subscription($cursor: String!) {
        searchTransactionsBackward(query:"receiver:consortiumlv action:xschedule db.table:kysimused" lowBlockNum: ${lowBlockNum}, highBlockNum: ${highBlockNum}, cursor: $cursor) {
          cursor
          trace { id matchingActions { json, dbOps(code: "consortiumlv", table:"kysimused"){operation, oldJSON {object error}} } }
        }
      }`;
      async function main() {
        const stream = await client.graphql(operation, (message) => {
          if (message.type === "data") {
            const {
              cursor,
              trace: { id, matchingActions },
            } = message.data.searchTransactionsBackward;
            matchingActions.forEach(({ dbOps }) => {
              if (
                Date.parse(dbOps[0].oldJSON.object.timecreated) >
                Date.parse("2020-10-13T11:18:32") &&
                dbOps[0].oldJSON.object.community == scope
              ) {
                list[`${dbOps[0].oldJSON.object.uniqueurl}`] = [
                  `${dbOps[0].oldJSON.object.community}`,
                  `${dbOps[0].oldJSON.object.question}`,
                  `${dbOps[0].oldJSON.object.description}`,
                  dbOps[0].oldJSON.object.answers,
                  dbOps[0].oldJSON.object.totalvote,
                  `${dbOps[0].oldJSON.object.sumofallopt}`,
                ];
              }
            });
          }
          if (message.type === "error") {
            console.log("An error occurred", message.errors, message.terminal);
          }
          if (message.type === "complete") {
            console.log("Completed");
          }
        });
        await stream.join();
        setDatar({ ...list });
        console.log(list);
        const stream2 = await client.graphql(operation2, (message) => {
          if (message.type === "data") {
            const {
              cursor,
              trace: { id, matchingActions },
            } = message.data.searchTransactionsBackward;
            matchingActions.forEach(({ dbOps }) => {
              if (
                Date.parse(dbOps[0].oldJSON.object.timecreated) >
                Date.parse("2020-10-13T11:18:32") &&
                dbOps[0].oldJSON.object.community == scope
              ) {
                list[`${dbOps[0].oldJSON.object.uniqueurl}`] = [
                  `${dbOps[0].oldJSON.object.community}`,
                  `${dbOps[0].oldJSON.object.question}`,
                  `${dbOps[0].oldJSON.object.description}`,
                  dbOps[0].oldJSON.object.answers,
                  dbOps[0].oldJSON.object.totalvote,
                  `${dbOps[0].oldJSON.object.sumofallopt}`,
                ];
              }
            });
          }
          if (message.type === "error") {
            console.log("An error occurred", message.errors, message.terminal);
          }
          if (message.type === "complete") {
            console.log("Completed");
          }
        });
        await stream2.join()
        await client.release();
        setLoading("notloading")
        setDatar({ ...list });
        console.log(list);
      }

      main().catch((error) => error?.message == "blocked: document quota exceeded" ? setLoading("error") : console.log(error?.message));
    }
  }, [lowBlockNum]);

  const goBack = () => {
    setLowBlockNum(lowBlockNum - 15000000)
    setHighBlockNum(highBlockNum - 15000000)

  }
  // CODE:END:quickstarts_javascript_node_eos_section4

  return (
    <div className="App">

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
            <Typography
              variant="h6"
              style={{
                color: "black",
                "text-decoration": "none",
                "font-size": "14px"
              }}
              className={classes.title}
            >Showing {Math.abs(highBlockNum).toLocaleString()} to {Math.abs(lowBlockNum).toLocaleString()} blocks back.</Typography>

            <Button
              style={{ color: "inherit", "border-radius": "50px" }}
              onClick={() => goBack()}
            >
              Next blocks
            </Button>
          </Toolbar>
        </AppBar>
        <AppBarOffset />
      </div>

      {loading == "notloading" ?
        <header className="history-header">
          <div style={{ "text-align": "left", "line-height": "30px" }}>
            {Object.keys(datar).map(function (key) {
              let sum = datar[key][4].reduce((a, b) => a + b, 0);
              return (
                <div
                  class="card"
                  style={{
                    "border-radius": "15px",
                    padding: "20px",
                    "margin-top": "10px",
                    "margin-bottom": "10px",
                    "max-width": "500px",
                    "background-color": "#FFFFFF",
                  }}
                >
                  <a
                    style={{ "text-decoration": "none", color: "black" }}
                    value={key}
                  >
                    {
                      <div>
                        <a style={{ "font-weight": "600", "font-size": "16px" }}>
                          {datar[key][1]}
                        </a>
                        <br />
                        <a>{datar[key][2]}</a>
                        {Object.keys(datar[key][3]).map(function (subkey) {
                          return (
                            <div class="item">
                              <a>
                                {datar[key][3][subkey]} (
                              {((datar[key][4][subkey] / sum) * 100).toFixed(2)}
                              %) <br />
                                <div id="progressbar">
                                  <div
                                    style={{
                                      width: `${
                                        (datar[key][4][subkey] / sum) * 100
                                        }%`,
                                    }}
                                  />
                                </div>
                              </a>
                            </div>
                          );
                        })}
                        <div style={{ width: "100%", "text-align": "right" }}>
                          {nFormatter(datar[key][5])} tokens
                      </div>
                      </div>
                    }
                  </a>
                </div>
              );
            })}
          </div>
        </header>
        : loading == "loading" ? <div class="loading1"><CircularProgress /></div>
          : <div class="loading" style={{ "text-align": "center" }}><b>Sorry! <br />We reached our dFuse quota. Please try again in 30 minutes.</b></div>
      }
    </div>
  );
}

export default App;
