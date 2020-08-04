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
import PeopleOutline from '@material-ui/icons/PeopleOutline'
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Swal from 'sweetalert2'
import Tooltip from '@material-ui/core/Tooltip';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import {Link} from "react-router-dom";
import { useLocation } from 'react-router-dom'
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import moment from 'moment';

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
    top: 'auto',
    bottom: 0,
  },
  media: {
    height: 0,
    paddingTop: '30%', // 16:9
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
  },
  avatar: {
  backgroundColor: "#697A90",
  },
}));

function sumArray(arr) {
  return arr.reduce((sum, n) => sum + n);
}

function sortBySum(a, b) {
  return sumArray(b.totalvote) - sumArray(a.totalvote);
}




function makeid() {
  var result = '';
  var characters = 'abcdefghijklmnopqrstuvwxyz1234';
  var charactersLength = characters.length;
  for ( var i = 0; i < 12; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

return result;


  document.getElementById("eos").textContent= result;
}

export default function App() {
  const classes = useStyles();
  const [data, setData] = useState({"rows":[]});
  const [votedata, setVoteData] = useState({"rows":[]});
  const [communitydata, setCommunityData] = useState({"rows":[]});
  const [databalance, setDataBalance] = useState();
  const [questionsubmission, setQuestionSubmission] = useState("")
  const [dailyvoted, setDailyVoted] = useState({"rows":[]})
  const [maxstake, setMaxStake] = useState({"rows":[]})
  const [mystake, setMyStake] = useState({"rows":[]})
  const [stakingbalance, setStakingBalance] = useState({"rows":[]})
  const [questiondescription, setQuestionDescription] = useState("")
  const [voteamount, setVoteAmount] = useState(1)
  const [stakeamount, setStakeAmount] = useState(1)
  const [unstakeamount, setUnStakeAmount] = useState(1)
  const [sessionresult, setSessionResult] = useState("")
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);

  const [votinglist, setVotingList] = useState(["",""]);

  const handleClose = () => {
    setShow(false);
    setVotingList(["",""]);
    setQuestionSubmission("");
    setQuestionDescription("")
  }
  const handleShow = () => setShow(true);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const [votekey, setVoteKey] = useState()
  const [votepollkey, setVotePollKey] = useState()
  const AppBarOffset = () => {
    return <div className={classes.offset} />;
  }

  const location = useLocation();
  const scope = location.pathname.split('/')[2]

  const filtermypolls = () => {
    if(data.rows[0]){
    var datatofilter = data.rows
    var datafiltered = datatofilter.filter(a=>a.creator==sessionresult.auth.actor);
    setData({"rows":datafiltered})
    console.log(datafiltered)
    }
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
        table: 'commdata',
        scope: 'andrtestcons',
        limit: 50,
    })
    })
    .then(response =>
        response.json().then(communitydata => setCommunityData(communitydata))
    )
    .then(restoreSession())
  }, communitydata["rows"]);

  const topcard = () => { //CONTENTS OF THE CARD ON TOP OF THE COMMUNITY PAGE
    var commdata = communitydata.rows.filter(function(e) {
      return e.community == scope;
    });
    if(commdata[0]){
    return(
      <Card className={classes.root} style={{"marginBottom":"10px", "margin-top":"10px"}}>
      <CardMedia
        className={classes.media}
        image={commdata[0].backgroundurl}
        title="Community image"
      />
      <CardContent style={{"padding-bottom":"5px", "margin-right":"20px"}}>
      <Typography style={{"fontSize":"18px"}}>
      {commdata[0].communityname}
      </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {commdata[0].description}
        </Typography>
      </CardContent>
      <div style={{color:"#485A70", "margin-right":"20px", "margin-left":"7px"}}>
      <Typography variant="body2" color="textSecondary" component="p" style={{"float":"left"}}>
        <Button onClick={handleShow2}>Stake</Button>
      </Typography>
      <div style={{"float":"right"}}>
      <Tooltip title="Total tokens used for voting"><AccountBalanceWalletIcon /></Tooltip> &nbsp;{commdata[0].totaltokensvoted} &nbsp;<Tooltip title="Total voters"><PeopleOutline /></Tooltip>&nbsp;{commdata[0].totalvoters}
      </div>
      </div>
    </Card>
    )
  }
  }

  const stake = () => {
    if(votedata.rows[0]){
      return(<a>{votedata.rows[0].totalstaked}</a>)
    }
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
        table: 'kysimused',
        scope: scope,
        limit: 50,
        table_key: 'pollkey',
        lower_bound:0,
        upper_bound:10000
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
      .then(getvote())
      .then(getdailyvoted())
      .then(getstake())
      }
  }, databalance);

 const getdailyvoted = () => {
      fetch('https://api.kylin.alohaeos.com/v1/chain/get_table_rows', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          json: true,
          code: 'andrtestcons',
          table:  'voterstatzo',
          scope: scope,
          key_type: 'name',
          index_position: 1,
          lower_bound: sessionresult.auth.actor,


      })
      })
      .then(response =>
          response.json().then(dailyvoted => setDailyVoted(dailyvoted))
      )


}

const getstake = () => { //DOES ALL THE FETCHING FOR THE STAKE MODAL
  fetch('https://api.kylin.alohaeos.com/v1/chain/get_table_rows', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
            json: true,
            code: 'andrtestcons',
            table: 'accounts',
            scope: sessionresult.auth.actor,

  })
  })
  .then(response =>
      response.json().then(data => setStakingBalance(data))
  )
  fetch('https://api.kylin.alohaeos.com/v1/chain/get_table_rows', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
            json: true,
            code: 'andrtestcons',
            table:  'indtotalstkh',
            scope: 'andrtestcons',
            key_type: 'name',
            index_position: 1,
            lower_bound: sessionresult.auth.actor, //CHANGE THIS!!!!!!!!!!!!!!!!!!!!!
  })
  })
  .then(response =>
      response.json().then(data => setMaxStake(data))
    )
    fetch('https://api.kylin.alohaeos.com/v1/chain/get_table_rows', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
              json: true,
              code: 'andrtestcons',
              table:  'indtotalstkh',
              scope: 'andrtestcons',
              key_type: 'name',
              index_position: 1,
              lower_bound: sessionresult.auth.actor,
              upper_bound: sessionresult.auth.actor,
    })
    })
    .then(response =>
        response.json().then(data => setMyStake(data))
    )
}

const getmaxstake = () => {
  if(maxstake.rows[0]){
    return Math.floor(Number(maxstake.rows[0].totalstaked.split(" ")[0]));
  }
  else {
    return 0;
  }
}

const getmystake = () => {
  if(mystake.rows[0]){
    return Math.floor(Number(mystake.rows[0].totalstaked.split(" ")[0]));
  }
  else {
    return 0;
  }
}

function ValueLabelComponent(props) { //CUSTOM TOOLTIP COMPONENT FOR ALL SLIDERS
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

//CONTENTS OF THE STAKE MODAL
  const displaystake = () => {
    if(stakingbalance.rows[0]) {
      const maxstakevalue = Math.floor(Number(stakingbalance.rows[0].balance.split(" ")[0])) - getmaxstake()
      return(
        <div>
        <Slider
          defaultValue={voteamount}
          ValueLabelComponent={ValueLabelComponent}
          aria-label="custom thumb label"
          step={1}
          min={0}
          max={maxstakevalue}
          onChange={ (e, val) => setStakeAmount(val)} //SETSTAKEAMOUNT INSTEAD!
          style={{"marginBottom":"10px", "margin-top":"10px", "color":"#485A70"}}
        />
        <a>You can stake with: {maxstakevalue}</a> <br/>
        <a>You are staking with: {stakeamount}</a> <br/>
        <Button onClick={() => stakeaction()}>Stake</Button>
        <hr/>
        <Slider
          defaultValue={voteamount}
          ValueLabelComponent={ValueLabelComponent}
          aria-label="custom thumb label"
          step={1}
          min={0}
          max={getmystake()}
          onChange={ (e, val) => setUnStakeAmount(val)} //SETSTAKEAMOUNT INSTEAD!
          style={{"marginBottom":"10px", "margin-top":"10px", "color":"#485A70"}}
        />
        <a>You have staked: {getmystake()}</a> <br/>
        <a>You are unstaking: {unstakeamount}</a> <br/>
        <Button onClick={() => unstakeaction()}>Unstake</Button>
        </div>
      )
    }
  }

  const stakeaction = () => { // CALL THIS IF YOU WANT TO STAKE
    if (sessionresult){
    const action = {
          account: 'andrtestcons',
          name: 'stakeforcomm',
          authorization: [sessionresult.auth],
          data: {

            staker: sessionresult.auth.actor,
            community: scope,
            quantity: parseFloat(stakeamount).toFixed(4) + " GOVRN"
          }
        }
    link.transact({action}).then(() => window.location.reload(false))
  }
  }

  const unstakeaction = () => { // CALL THIS IF YOU WANT TO UNSTAKE
    console.log(mystake)
    if (sessionresult){
      const action = {
                account: 'andrtestcons',
                name: 'unstkfromcom',
                authorization: [sessionresult.auth],
                data: {

                  staker: sessionresult.auth.actor,
                  community: scope,
                  quantity: parseFloat(unstakeamount).toFixed(4) + " GOVRN"

                }
        }
    link.transact({action}).then(() => window.location.reload(false))
  }
  }




 const getvote = () => { //READS YOUR TOKEN BALANCE FOR VOTING
   if(!votedata.rows[0] && scope=="viggtestcons") { //IF WE ARE ON VIGOR PAGE, DO THE FOLLOWING FETCH
   fetch('https://api.kylin.alohaeos.com/v1/chain/get_table_rows', {
     method: 'POST',
     headers: {
       Accept: 'application/json',
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({
       json: true,
       code: 'andrtestcons',
       table: 'accounts',
       scope: sessionresult.auth.actor,

   })
   })
   .then(response =>
       response.json().then(data => setVoteData(data))
   )
  }
   if(!votedata.rows[0] && scope=="eosstestcons") { //IF WE ARE ON EOS PAGE, DO THE FOLLOWING FETCH
   fetch('https://api.kylin.alohaeos.com/v1/chain/get_table_rows', {
     method: 'POST',
     headers: {
       Accept: 'application/json',
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({
       json: true,
       code: 'andrtestcons',
       table: 'accounts',
       scope: sessionresult.auth.actor,

   })
   })
   .then(response =>
       response.json().then(data => setVoteData(data))
   )
  }
}




  if(data.rows[0]){
  data.rows.sort((a, b) => (a.rewardsreceived < b.rewardsreceived) ? 1 : -1)
  }


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
        setSessionResult(session) //PUT THE ACCOUNT IN STATE
        window.location.reload(false) //RELOAD THE PAGE
    })
  }


    const logout = () => {
        setSessionResult() //REMOVES SESSIONRESULT FROM STORAGE, THEREFORE LOGGING YOU OUT.
    }



  /* ASK TO SIGN AND BROADCAST TO CHAIN */
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
          account: 'andrtestcons',
          name: 'createpollz',
          authorization: [sessionresult.auth],
          data: {
            question: questionsubmission,
            answers: votinglist,
            totalvote: voteslist,
            community: scope,
            creator: sessionresult.auth.actor,
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


  const vote = (option, pollkey) => {
    if (sessionresult){
    const optionnumber = Number(option) + 1
    const amount = Number(voteamount)
    const uniquename = makeid()
    const action = {
        account: 'andrtestcons',
        name: 'votez',
        authorization: [sessionresult.auth],
        data: {
          usersvote: amount,
          pollkey:pollkey,
          option:optionnumber,
          community: scope,
          voter: sessionresult.auth.actor,
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

  const getpollurl = (pollkey,uniqueurl) => {
    const url = window.location.origin+"/poll/"+pollkey+"/"+uniqueurl+"/"+scope;
    Swal.fire({
      title: "<strong>Here's the link to the poll:</strong>",
      html:
        `<a target="_blank" href="${url}">${url}</a> `,

    })
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
        <div class="answer"><a>{answers[key]}</a> <a style={{"float":"right", "fontSize":"12px"}}>{percentage(votes,votes[key]).toFixed(0)}%</a></div>
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
    if(votedata.rows[0]) {
      var balance = Math.floor(Number(votedata.rows[0].balance.split(" ")[0]))
    }
    if(dailyvoted.rows[0]) {
      var daily = Math.floor(Number(dailyvoted.rows[0].dailyvoted))
    }
    const bal = balance - daily
    return(bal)
  }

  const logbutton = () =>{
    if(sessionresult && votedata.rows[0]){ //IF WE HAVE A SESSIONRESULT, SHOW LOGIN BUTTON
      return(
        <div>
        <Button
        color="inherit"
        onClick={() => logout()}
        >Log out</Button>
        <Tooltip data-html="true" title={<a style={{"font-size":"12px","font-weight":"400"}}><b>{sessionresult.auth.actor}</b> <br/> Balance: {votedata.rows[0].balance}<br/> Voting power: {getbalance()}<br/> Voting power reset: </a>}><Button color="inherit" id="logoutname">{sessionresult.auth.actor}</Button></Tooltip>
        </div>
      )
      }
      else{ //IF THERE IS NO SESSIONRESULT WE SHOW LOGIN BUTTON
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

  const votingfield = (text, i) => {
    votinglist[i] = text
  }

  const addvotingfield = () => { // FUNCTION THAT GETS CALLED WHEN YOU ADD ANOTHER POLL OPTION FIELD
    if(votinglist.length < 5){ //IF WE HAVE LESS THAN 5 POLL OPTIONS
    setVotingList([...votinglist,""]) //ADD ANOTHER POLL OPTION TO THE END OF THE ARRAY
  }
  }

  const gettimediff = (creationdate) => { //PASS IN THE POLL CREATION TIMESTAMP FROM THE TABLE
    const curr = new Date().getTime() //GET CURRENT TIME
    return moment(curr).to(moment(creationdate + 'Z')) //FIND THE DIFFERENCE BETWEEN THE TWO TIMESTAMPS, Z JUST MAKES IT RECOGNIZEABLE UTC
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
      <Button color="inherit" onClick={handleShow}>Create poll</Button>
      <Button color="inherit"  href={`${window.location}/Leaderboard`}>Leaderboard</Button>
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
    <div>
    <Modal show={show} onHide={handleClose} centered>
        <Modal.Body>
        <TextField
        style={{"width":"100%", "margin":"7px"}}
        label ={"Poll question"}
        onChange={text => setQuestionSubmission(text.target.value)}
        id="outlined-basic" variant="outlined"
         />
         <TextField
         style={{"width":"100%", "margin":"7px"}}
         label ={"Poll description"}
         onChange={text => setQuestionDescription(text.target.value)}
         id="outlined-basic" variant="outlined"
          />
         <br />
         {votinglist.map((u, i) => {
           return (
             <TextField
             style={{"width":"100%", "margin":"7px"}}
             label ={"Option " + (i+1)}
             onChange={text => votingfield(text.target.value, i)}
             id="outlined-basic" variant="outlined"
              />
           )
         })}
         <Button onClick={() => addvotingfield()}>Add option</Button>
        <br />
        <Button
        onClick={() => createpoll()}
        >Create poll</Button>
        </Modal.Body>
    </Modal>

    <Modal show={show1} onHide={handleClose1} centered>
        <Modal.Body style={{"padding":"20px"}}>
        <Slider
          defaultValue={voteamount}
          ValueLabelComponent={ValueLabelComponent}
          aria-label="custom thumb label"
          step={1}
          min={1}
          max={getbalance()}
          onChange={ (e, val) => setVoteAmount(val)}
          style={{"marginBottom":"10px", "margin-top":"10px", "color":"#485A70"}}
        />
        <br />
        <center><a>You're voting with: {voteamount} EOS tokens.</a></center>
        <br/>
        <Button style={{"width":"100%"}} onClick={() => vote(votekey, votepollkey)}>Vote</Button>
        </Modal.Body>
    </Modal>

    <Modal show={show2} onHide={handleClose2} centered>
        <Modal.Body style={{"padding":"20px"}}>
        <a>{displaystake()}</a>
        </Modal.Body>
    </Modal>

    <div>

      {topcard()}
      <Card className={classes.root} style={{"margin-top":"7px", "padding-left":"25px", "padding":"5px"}}><Button style={{"color":"gray"}} onClick = {() => filtermypolls()}>My polls</Button><Button style={{"color":"gray"}} onClick = {() => window.location.reload(false)}>Top polls</Button></Card>
    </div>

    </div>

      {data.rows.map((u, i) => {
        return (
          <div key={i}>
          <Card className={classes.root} style={{"margin-top":"7px", "padding":"10px", "padding-bottom":"20px"}}>
          <CardHeader
            style={{"padding-bottom":"10px"}}
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                {u.creator.charAt(0).toUpperCase()}
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={u.creator}
            subheader={gettimediff(u.timecreated)}
          />

          <CardContent style={{"paddingTop":"0px"}}>
            <Button style={{"color":"#2A3747"}} class="question" target="_blank" component={Link} to={`/poll/${u.pollkey}/${u.uniqueurl}/${scope}`}>{u.question}</Button>
            <div style={{"color":"#2A3747"}}>{u.description}</div>
            <br />
            <a style={{"color":"#2A3747"}}>{polloptions(u.totalvote, u.answers, u.pollkey)}</a>
            <div style={{color:"#485A70"}} class="pollstats"><Tooltip title="Get poll url"><div style={{"float":"left"}}><FileCopyIcon onClick={() => getpollurl(u.pollkey,u.uniqueurl)}/></div></Tooltip> <Tooltip title="Total voters"><div style={{"float":"right"}}>&nbsp;&nbsp;&nbsp;<PeopleOutline /> {u.nrofvoters}</div></Tooltip><Tooltip title="Total tokens voted with"><div style={{"float":"right"}}><AccountBalanceWalletIcon /> {u.sumofallopt}</div></Tooltip></div>
            </CardContent>
            </Card>
          </div>
        )
      })}
    </div>
    </div>
  )
}
