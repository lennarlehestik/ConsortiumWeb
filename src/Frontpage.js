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
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import {Link} from "react-router-dom";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Autocomplete from '@material-ui/lab/Autocomplete';


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
  grow: {
    flexGrow: 1,
  },
  avatar: {
  backgroundColor: "#00003C",
  },
  media: {
    height: 0,
    paddingTop: '25%', // 16:9
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
  const [questionsubmission, setQuestionSubmission] = useState("")
  const [questiondescription, setQuestionDescription] = useState("")
  const [option1submission, setOption1Submission] = useState("")
  const [option2submission, setOption2Submission] = useState("")
  const [option3submission, setOption3Submission] = useState("")
  const [option4submission, setOption4Submission] = useState("")
  const [option5submission, setOption5Submission] = useState("")
  const [voteamount, setVoteAmount] = useState(1)
  const [sessionresult, setSessionResult] = useState("")
  const [searchvalue, setSearch] = useState()
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
        table: 'commped',
        scope: 'andrtestcons',
        limit: 50,
    })
    })
    .then(response =>
        response.json().then(data => setData(data))
    )
    .then(restoreSession())
  }, data["rows"]);

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

    <div class="frontapp">
    <div>
    </div>
    <div className={classes.root} style={{"margin-bottom":"10px","margin-top":"10px", "display":"flex", "padding-left":"14px", "padding-right":"14px"}}>
    <Autocomplete
      id="Community search"
      options={data.rows}
      getOptionLabel={(option) => option.communityname}
      onChange={(event, value) => ((value) ? setSearch(value.community) : setSearch(""))}
      style={{ width: "100%"}}
      renderInput={(params) => <TextField {...params} label="Community name" variant="outlined" style={{backgroundColor:"white"}}/>}
    />
    <Button href={`${window.location}community/${searchvalue}`} variant="outlined" style={{"margin-left":"5px", backgroundColor:"white" }}>Search</Button>
    </div>
      <div class="parent">
      {data.rows.map((u, i) => {
        return (
      <div class="col">
      <Card className={classes.root} style={{"margin-bottom":"10px", "height":"270px"}}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {u.communityname.charAt(0)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={u.communityname}
        subheader="An EOS dapp."
      />

      <a href={`${window.location}community/${u.community}`}>
      <CardMedia
        className={classes.media}
        image={u.backgroundurl}
        title="Community image"
      />
      </a>

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {u.description.substring(0, 90)}{(u.description.length > 90) ? '...' : ''}
        </Typography>
      </CardContent>
    </Card>
    </div>
        )
      })}
      </div>
    </div>
    </div>
  )
}
