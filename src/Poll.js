import React, {useState, useEffect} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AnchorLink from 'anchor-link'
import AnchorLinkBrowserTransport from 'anchor-link-browser-transport'
import { Modal } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PeopleOutline from '@material-ui/icons/PeopleOutline'
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Swal from 'sweetalert2'
import Tooltip from '@material-ui/core/Tooltip';
import { useLocation } from 'react-router-dom'
import {Link} from "react-router-dom";
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';

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
    top: 'auto',
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
  offset: {
  ...theme.mixins.toolbar,
  flexGrow: 1
}
}));

function sumArray(arr) {
  return arr.reduce((sum, n) => sum + n);
}

function sortBySum(a, b) {
  return sumArray(b.totalvote) - sumArray(a.totalvote);
}

export default function App() {
  const classes = useStyles();
  const [data, setData] = useState({"rows":[]});
  const [databalance, setDataBalance] = useState();
  const [questionsubmission, setQuestionSubmission] = useState({"question":""})
  const [option1submission, setOption1Submission] = useState("")
  const [option2submission, setOption2Submission] = useState("")
  const [option3submission, setOption3Submission] = useState("")
  const [option4submission, setOption4Submission] = useState("")
  const [option5submission, setOption5Submission] = useState("")
  const [voteamount, setVoteAmount] = useState(1)
  const [sessionresult, setSessionResult] = useState("")
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const [votekey, setVoteKey] = useState()
  const [votepollkey, setVotePollKey] = useState()
  const AppBarOffset = () => {
    return <div className={classes.offset} />;
  }

  const location = useLocation();
  const split = location.pathname.split('/')[2]
  const tablebound = Number(split.replace('/',''))


  const stringmatches = () => {
    if(data.rows[0]){
    const urluniqueurl = location.pathname.split('/')[3]
    if(data.rows[0]["uniqueurl"] == urluniqueurl){
      return(
        data.rows.map((u, i) => {
            return (
              <div key={i}>
              <Card className={classes.root} style={{"margin-top":"7px", "padding":"10px", "padding-bottom":"20px"}}>
              <CardContent>
                <div style={{"margin-bottom":"10px", "color":"#697A90"}}><AccountCircle/>  {u.creator}</div>
                <div style={{"color":"#2A3747"}} class="question">{u.question}</div>
                <br />
                <a style={{"color":"#2A3747"}}>{polloptions(u.totalvote, u.answers, u.pollkey)}</a>
                <div style={{"color":"#2A3747"}} class="pollstats"> <Tooltip title="Total voters"><div style={{"float":"right"}}>&nbsp;&nbsp;&nbsp;<PeopleOutline /> {u.nrofvoters}</div></Tooltip><Tooltip title="Total tokens voted with"><div style={{"float":"right"}}><AccountBalanceWalletIcon /> {u.sumofallopt}</div></Tooltip></div>
                </CardContent>
                </Card>
              </div>
            )
          }))
        }
        else{return(<Card className={classes.root} style={{"margin-top":"7px", "padding":"10px", "padding-bottom":"20px"}}><CardContent><center><a class="question">Poll has expired or you have the wrong url.</a></center></CardContent></Card>)}
  }
  }

  useEffect(() => {
    const scope = location.pathname.split('/')[4]
    fetch('https://api.kylin.alohaeos.com/v1/chain/get_table_rows', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        json: true,
        code: 'andrtestcons',
        scope: scope,
        table: 'pollud',
        table_key: 'pollkey',
        lower_bound: tablebound,
        upper_bound: tablebound,
        limit: 1
    })
    })
    .then(response =>
        response.json().then(data => setData(data))
    )
    .then(restoreSession())
  }, data["rows"]);

  useEffect(() => {
    if(sessionresult){
      fetch('https://api.kylin.alohaeos.com/v1/chain/get_table_rows', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          json: true,
          code: 'eosio.token',
          table: 'accounts',
          scope: sessionresult.auth.actor,

      })
      })
      .then(response =>
          response.json().then(databalance => setDataBalance(databalance))
      )

      }
  }, databalance);


  data.rows.sort(sortBySum);
  /* ANCHOR CONNECTION */
  const transport = new AnchorLinkBrowserTransport()
  // initialize the link, this time we are using the TELOS chain
  const link = new AnchorLink({transport,
      chainId: '5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191',
      rpc: 'https://kylin-dsp-2.liquidapps.io'
  })

  const identifier = 'andrtestcons'
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
    })
  }

    // logout and remove session from storage
    const logout = () => {
        setSessionResult()
    }



  /* ASK TO SIGN AND BROADCAST TO CHAIN */
  const createpoll = () => {
    if (sessionresult){
      var optionslist = [];
      var voteslist = [];
      if (option1submission !== "") {
          optionslist.push(option1submission);
      }
      if (option2submission !== "") {
          optionslist.push(option2submission);
      }
      if (option3submission !== "") {
          optionslist.push(option3submission);
      }
      if (option4submission !== "") {
          optionslist.push(option4submission);
      }
      if (option5submission !== "") {
          optionslist.push(option5submission);
      }
      for (let i = 0; i < optionslist.length; i++) {
        voteslist.push(0)
      }
      const action = {
          account: 'andrtestcons',
          name: 'createpollz',
          authorization: [sessionresult.auth],
          data: {
            question: questionsubmission,
            answers: optionslist,
            totalvote: voteslist,
            community: "eyaltestcons",
            creator: sessionresult.auth.actor
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


  const vote = (option, pollkey) => {
    if (sessionresult){
    const optionnumber = Number(option) + 1
    const amount = Number(voteamount)
    const action = {
        account: 'andrtestcons',
        name: 'votez',
        authorization: [sessionresult.auth],
        data: {
          usersvote: amount,
          pollkey:pollkey,
          option:optionnumber,
          community: 'eyaltestcons',
          voter: sessionresult.auth.actor
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


  const percentage = (sum, item) => {
    if(item == 0){
      return 0
    }
    else{
      return(item / sum.reduce((a, b) => a + b, 0)*100)
    }
  }


  /* LOOP FOR POLL OPTIONS IN CARDS */
  const polloptions = (votes, answers, pollkey) => {
    return(
    Object.keys(votes).map(key =>
      <div class="polloption" onClick={() => votingmodal(key, pollkey)}>
        <div class="answer"><a>{answers[key]}</a> <a style={{"float":"right", "font-size":"12px"}}>{percentage(votes,votes[key]).toFixed(0)}%</a></div>
        <div class="progressbar"><div style={{"width":`${percentage(votes,votes[key]).toFixed(0)}%`}}/></div>
      </div>
    )
  )
  }
  const votingmodal = (key, pollkey) => {
    setVoteKey(key)
    setVotePollKey(pollkey)
    handleShow1()
  }

  const getbalance = () => {
    if(databalance) {
      return(Number(databalance.rows[0].balance[0].split(" ")))
    }
  }

  const logbutton = () =>{
    if(sessionresult){
      return(
        <div>
        <Button
        color="inherit"
        onClick={() => logout()}
        >Log out</Button>
        <Button color="inherit" id="logoutname">{sessionresult.auth.actor}</Button>
        </div>
      )
      }
      else{
        return(
          <Button
          color="inherit"
          onClick={() => login()}
          >Log in</Button>
        )
    }
  }

  const showusername = () => {
    if(sessionresult){
    return(sessionresult.auth.actor)
  }
  }

  return (
    <div>
    <div class="desktopmenu">
    <div className={classes.root}>
    <AppBar position="fixed" color="transparent" style={{"background-color":"white"}}>
    <Toolbar>
      <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" style={{"color":"#2A3747", "text-decoration":"none"}} className={classes.title} component={Link} to={'/'}>
        Consortium
      </Typography>
      <Button color="inherit" component={Link} to={'/Leaderboard'}>Leaderboard</Button>
      {logbutton()}
    </Toolbar>
    </AppBar>
    <AppBarOffset />
    </div>
    </div>

    <div class="mobilemenu">
    <AppBar position="fixed" color="primary" className={classes.appBar} color="transparent" style={{"background-color":"white"}}>
      <Toolbar>
        {logbutton()}
        <div className={classes.grow} />
        <Button style={{"color":"#2A3747"}} color="inherit">{showusername()}</Button>
      </Toolbar>
    </AppBar>
    </div>

    <div class="app">
    <div>
    <Modal show={show} onHide={handleClose} centered>
        <Modal.Body>
        <TextField
        style={{"width":"100%", "margin":"7px"}}
        label ={"Poll question"}
        onChange={text => setQuestionSubmission(text.target.value)}
        id="outlined-basic" variant="outlined"
         />
         <br />
         <TextField
         style={{"width":"100%", "margin":"7px"}}
         label ={"First option"}
         onChange={text => setOption1Submission(text.target.value)}
         id="outlined-basic" variant="outlined"
          />
          <br />
          <TextField
          style={{"width":"100%", "margin":"7px"}}
          label ={"Second option"}
          onChange={text => setOption2Submission(text.target.value)}
          id="outlined-basic" variant="outlined"
           />
           <br />
           <TextField
           style={{"width":"100%", "margin":"7px"}}
           label ={"Third option"}
           onChange={text => setOption3Submission(text.target.value)}
           id="outlined-basic" variant="outlined"
            />
            <br />
            <TextField
            style={{"width":"100%", "margin":"7px"}}
            label ={"Fourth option"}
            onChange={text => setOption4Submission(text.target.value)}
            id="outlined-basic" variant="outlined"
             />
             <br />
             <TextField
             style={{"width":"100%", "margin":"7px"}}
             label ={"Fifth option"}
             onChange={text => setOption5Submission(text.target.value)}
             id="outlined-basic" variant="outlined"
              />
              <br />

        <br />
        </Modal.Body>
    </Modal>

    <Modal show={show1} onHide={handleClose1} centered>
        <Modal.Body style={{"padding":"20px"}}>
        <Slider
          defaultValue={voteamount}
          valueLabelDisplay="auto"
          step={1}
          min={1}
          max={getbalance()}
          onChange={ (e, val) => setVoteAmount(val)}
          style={{"margin-bottom":"10px", "margin-top":"10px", "color":"#485A70"}}
        />
        <br />
        <center><a>You're voting with: {voteamount} EOS tokens.</a></center>
        <br/>
        <Button style={{"width":"100%"}} onClick={() => vote(votekey, votepollkey)}>Vote</Button>
        </Modal.Body>
    </Modal>

    </div>
    {stringmatches()}
    </div>
    </div>
  )
}
