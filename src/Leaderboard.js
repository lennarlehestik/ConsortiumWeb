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
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Swal from 'sweetalert2'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Link} from "react-router-dom";

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


export default function App() {
  const classes = useStyles();
  const [data, setData] = useState({"rows":[]});
  const [databalance, setDataBalance] = useState();
  const [questionsubmission, setQuestionSubmission] = useState({"question":""})
  const [questiondescription, setQuestionDescription] = useState({"description":""})
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


  useEffect(() => {
    fetch('https://api.kylin.alohaeos.com/v1/chain/get_table_rows', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        json: true,
        code: 'andrtestcons',
        table: 'topgovernors',
        scope: 'eyaltestcons',
        limit: 50,
    })
    })
    .then(response =>
        response.json().then(data => setData(data))
    )
    .then(restoreSession())
  }, data["rows"]);

  if(data.rows[0]){
  data.rows.sort((a, b) => (a.rewardsreceived < b.rewardsreceived) ? 1 : -1)
  }


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
        window.location.reload(false)
    })
  }

    // logout and remove session from storage
    const logout = () => {
        setSessionResult()
    }






  const getbalance = () => {
    if(databalance) {
      return(Math.floor(Number(databalance.rows[0].balance.split(" ")[0])))
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
      <Typography variant="h6" style={{"color":"#2A3747","text-decoration":"none"}} className={classes.title} component={Link} to={'/'}>
        Consortium
      </Typography>
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
        <Fab style={{"background-color":"#AFBBC9"}} onClick={handleShow} aria-label="add" className={classes.fabButton}>
          <AddIcon style={{"color":"white"}}/>
        </Fab>
        <div className={classes.grow} />
        <Button style={{"color":"#2A3747"}} color="inherit">{showusername()}</Button>
      </Toolbar>
    </AppBar>
    </div>

    <div class="app">

    <TableContainer component={Paper} style={{"margin-top":"10px"}}>
  <Table className={classes.table} size="small" aria-label="a dense table">
    <TableHead>
      <TableRow>
        <TableCell>Governor</TableCell>
        <TableCell align="right">Rewards</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {data.rows.map((u, i) => {
        return (
        <TableRow key={i}>
          <TableCell component="th" scope="row">
          {u.governor}
          </TableCell>
          <TableCell align="right">{u.rewardsreceived}</TableCell>
        </TableRow>
      )
    })}

    </TableBody>
  </Table>
</TableContainer>
    </div>
    </div>
  )
}
