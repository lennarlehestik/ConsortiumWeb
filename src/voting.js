import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AnchorLink from 'anchor-link'
import AnchorLinkBrowserTransport from 'anchor-link-browser-transport'
import { Modal, Navbar, Button } from 'react-bootstrap';
import './voting';

function sumArray(arr) {
  return arr.reduce((sum, n) => sum + n);
}

function sortBySum(a, b) {
  return sumArray(b.totalvote) - sumArray(a.totalvote);
}

export default function App() {
  const [data, setData] = useState({"rows":[]});
  const [questionsubmission, setQuestionSubmission] = useState({"question":""})
  const [option1submission, setOption1Submission] = useState("")
  const [option2submission, setOption2Submission] = useState("")
  const [option3submission, setOption3Submission] = useState("")
  const [option4submission, setOption4Submission] = useState("")
  const [option5submission, setOption5Submission] = useState("")
  const [optionlist, setOptionList] = useState([])
  const [votelist, setVoteList] = useState([])
  const [voteamount, setVoteAmount] = useState("")
  const [sessionresult, setSessionResult] = useState("")
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


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
        table: 'pollz',
        scope: 'eyaltestcons',
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
      console.log(optionlist)
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

      link.transact({action});
    }
    else{
      alert("Logi sisse või käi putsi")
    }
  }


  const vote = (option, pollkey) => {
    if (sessionresult){
    //const sess = session.auth.actor
    //const pede = result
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
    link.transact({action});
    }
    else{
      alert("Logi sisse või tao pihku.")
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
      <div class="polloption" onClick={() => vote(key, pollkey)}>
        <div class="answer">{answers[key]} ({percentage(votes,votes[key]).toFixed(0)}%)</div>
        <div class="progressbar"><div style={{"width":`${percentage(votes,votes[key]).toFixed(0)}%`}}/></div>
      </div>
    )
  )
  }


  const logbutton = () =>{
    if(sessionresult){
      return(
        <Button
        variant="outline-light"
        style={{"margin-right":"5px"}}
        onClick={() => logout()}
        >Log out</Button>
      )
      }
      else{
        return(
          <Button
          variant="outline-light"
          style={{"margin-right":"5px"}}
          onClick={() => login()}
          >Log in</Button>
        )
    }
  }


  return (
    <div>
    <Navbar fixed="top" variant="dark" bg="dark">
      <div className="mr-auto">
        <Navbar.Brand href="#"></Navbar.Brand>
      </div>
      <input
        placeholder ={"Vote amount"}
        onChange={text => setVoteAmount(text.target.value)}
        style={{"width":"100px","margin-right":"5px"}}
      />
      {logbutton()}
      <Button inline variant="outline-light" onClick={handleShow}>New poll</Button>
    </Navbar>

    <div class="app">
    <div>
    <Modal show={show} onHide={handleClose}>
        <Modal.Body>
        <input
          placeholder ={"Which option do you prefer?"}
          onChange={text => setQuestionSubmission(text.target.value)}
        />
        <br />
        <input
          placeholder ={"Option 1"}
          onChange={text => setOption1Submission(text.target.value)}
        />
        <br />
        <input
          placeholder ={"Option 2"}
          onChange={text => setOption2Submission(text.target.value)}
        />
        <br />
        <input
          placeholder ={"Option 3"}
          onChange={text => setOption3Submission(text.target.value)}
        />
        <br />
        <input
          placeholder ={"Option 4"}
          onChange={text => setOption4Submission(text.target.value)}
        />
        <br />
        <input
          placeholder ={"Option 5"}
          onChange={text => setOption5Submission(text.target.value)}
        />
        <br />
        <button
        onClick={() => createpoll()}
        >Create poll</button>
        </Modal.Body>
    </Modal>

    </div>
      {data.rows.map((u, i) => {
        return (
          <div key={i}>
            <div class="card">
            <a class="question">{u.question}</a>
            <br />
            <a>{polloptions(u.totalvote, u.answers, u.pollkey)}</a>
            <br />
            <a class="pollstats">Voters: {u.nrofvoters}</a>
            </div>
          </div>
        )
      })}
    </div>
    </div>
  )
}
