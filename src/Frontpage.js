import React, {useState, useEffect} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AnchorLink from 'anchor-link'
import AnchorLinkBrowserTransport from 'anchor-link-browser-transport'
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {Link} from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { withUAL } from 'ual-reactjs-renderer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTelegram, faTwitter, faGithub, faYoutube } from '@fortawesome/free-brands-svg-icons';



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


function App(props) {
  const { ual: { showModal, hideModal, logout } } = props

  const classes = useStyles();
  const [data, setData] = useState({"rows":[]});
  const [searchvalue, setSearch] = useState()

  const AppBarOffset = () => {
    return <div className={classes.offset} />;
  }
  const [accountname, setAccountName] = useState("")
  const { ual: {activeUser} } = props
    if (activeUser) {
      const accountName = activeUser.getAccountName()
      accountName.then(function(result){
        setAccountName(result)
      })
    }
  const displayaccountname = () => {
    if(accountname){
      return accountname
    }
  }


  const stakeformatter = (stakenumber) => {
    if(stakenumber < 1000){
      return stakenumber
    }
    if(stakenumber > 1000 && stakenumber < 1000000){
      return (stakenumber/1000).toFixed(0) + "k"
    }
    if (stakenumber > 1000000){
      return (stakenumber/1000000).toFixed(1) + "m"
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
        response.json().then(data => setData(data))
    )
    //.then(restoreSession())
  }, data["rows"]);

  /* ANCHOR CONNECTION */

  /*
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
*/
const logbutton = () =>{
  if(accountname){ //IF WE HAVE A SESSIONRESULT, SHOW LOGIN BUTTON
    return(
      
      <div>
      <Button
      color="inherit"
      onClick={logout}
      >Log out</Button>
      <Button color="inherit" id="logoutname">{displayaccountname()}</Button>
      </div>
    )
    }
    else{ //IF THERE IS NO SESSIONRESULT WE SHOW LOGIN BUTTON
      return(
        <Button
        color="inherit"
        onClick={showModal}
        >Log in</Button>
      )
  }
}

const showusername = () => {
  if(activeUser){
  return(displayaccountname())
}
}

//var str1 = ".png ";
//var str2 = {u.communityname.substring(0, 90)};
//var res = str1.concat(str2);

  return (
    <div>
    <div class="desktopmenu">
    <div className={classes.root}>
    <AppBar position="fixed" color="transparent" style={{"background-color":"white"}}>
    <Toolbar>
    <img src="logo.png" width="54.4" height="34" class="d-inline-block align-top" style={{"margin-bottom":2}}></img>
      <Typography variant="h6" style={{"color":"#2A3747", "text-decoration":"none", "margin-top":"0px"}} className={classes.title} component={Link} to={'/'}>
      
      

      <a> Consortium </a>
       
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
    <div className={classes.root} style={{"margin-bottom":"10px","margin-top":"10px", "display":"flex", "padding-left":"14px", "padding-right":"14px","borderRadius": "15px"}}>
    <Autocomplete
      id="Community search"
      options={data.rows}
      getOptionLabel={(option) => option.communityname}
      onChange={(event, value) => ((value) ? setSearch(value.community) : setSearch(""))}
      style={{ width: "100%"}}
      renderInput={(params) => <TextField {...params} label="Community name" variant="outlined"  style={{backgroundColor:"white"}}/>}
    />
    <Button href={`${window.location}community/${searchvalue}`} variant="outlined" style={{"margin-left":"5px", backgroundColor:"white","borderRadius": "15px" }}>Search</Button>
    </div>
      <div class="parent">
      {data.rows.map((u, i) => {
        return (
      <div class="col">
      <Card className={classes.root} style={{"margin-bottom":"10px", "height":"270px", "borderRadius": "20px"}}>
      <CardHeader
      
        avatar={
            
           

           <img src= "newdex.png" style={{"height":"36px", }} alt="newdex"></img>
          
        }
        action={
          <IconButton aria-label="settings">
                            <MoreVertIcon />

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

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {u.description.substring(0, 90)}{(u.description.length > 90) ? '...' : ''}
        </Typography>
        <br></br>
        <Typography variant="body2" color="textSecondary" component="p">
        Total staked: {stakeformatter(parseFloat(u.staked))} GOVRN 

        </Typography>
      </CardContent>
     </Card>
     </div>
        )
      })}








          </div>


       
          
</div>


<div class="card bg-light" style={{"margin":1,"margin-top":300} }>
  <div class="card-body" style={{"font-size":14}}>

      <div style={{"float": "left", "display": "block", "display": "inline-block"}}>


       <a href= "https://newdex.io/trade/consortiumlv-govrn-eos"><img src="newdex.png" style={{"height":"36px", }} alt="newdex"></img></a>
       <a href= "https://xnation.io/eos?base=bntbntbntbnt-BNT&quote=consortiumlv-GOVRN"><img src="bancorgoluboi.png" style={{"height":"36px", "margin-top":"3px", "margin-left":"5px"}} alt="bancor"></img></a>
       <a href= "https://alcor.exchange/markets/GOVRN-consortiumlv"><img src="alcor.png" style={{"height":"36px", "margin-top":"3px", "margin-left":"3px"}} alt="alcor"></img></a>
       <br></br>
       

      </div>
      

      <div style={{"float": "right", "display": "block", "display": "inline-block"}}>
      <a href={"https://t.me/consortiumdac"}><FontAwesomeIcon icon={faTelegram} style={{"height":"36px", "width":"36px", "color":"#00003C", "margin-right":"12px", "margin-left":"15px"}}/></a>
      <a href={"https://twitter.com/consortiumdac"}><FontAwesomeIcon icon={faTwitter} style={{"height":"36px", "width":"36px", "color":"#00003C", "margin-right":"10px"}}/></a>
      <a href={"https://github.com/n0umen0n/ConsortiumSC"}><FontAwesomeIcon icon={faGithub} style={{"height":"36px", "width":"36px", "color":"#00003C"}}/></a>
      <br></br>
     
    </div>

          </div>
</div>



      </div>
    
/*
<div style={{"float": "left", "display": "block", "display": "inline-block", "margin-top":"7px", "margin-right":"15px"}}>
       <a style={{"font-size":12, "margin-left":"48px"}}>Exchanges</a>
       </div>
  
<div style={{"float": "right", "display": "block", "display": "inline-block", "margin-top":"7px"}}>
          <a style={{"font-size":12, "margin-right":"35px"}}>Community</a>
          </div>
          */



  )



  
}


export default withUAL(App)