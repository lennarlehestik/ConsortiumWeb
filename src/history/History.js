import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './History.css';
import { useLocation } from "react-router-dom";

global.fetch = require('node-fetch');

const { createDfuseClient } = require('@dfuse/client');

const client = createDfuseClient({
  apiKey: 'web_8e3c8ca8ac2e5c151ce03a547efa01eb',
  network: 'eos.dfuse.eosnation.io'
});




function App() {
  const location = useLocation();
  const scope = location.pathname.split("/")[2];
  console.log(scope)
  var list = {}
  const [datar, setDatar] = useState({});
  const [data, setdata] = useState("")
  const [commoption, setcommoption] = useState("eosscommcons");
  const [deleteoption, setdeleteoption] = useState("xschedule");

  function nFormatter(num) {
       if (num >= 1000000000) {
          return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
       }
       if (num >= 1000000) {
          return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
       }
       if (num >= 1000) {
          return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
       }
       return num;
  }
  useEffect(() =>{
    if(scope){
      const operation = `subscription($cursor: String!) {
        searchTransactionsBackward(query:"receiver:consortiumlv action:finishpoll db.table:kysimused" lowBlockNum: -5000000, highBlockNum: -1, cursor: $cursor) {
          cursor
          trace { id matchingActions { json, dbOps(code: "consortiumlv", table:"kysimused"){operation, oldJSON {object error}} } }
        }
      }`;
      const operation2 = `subscription($cursor: String!) {
        searchTransactionsBackward(query:"receiver:consortiumlv action:xschedule db.table:kysimused" lowBlockNum: -5000000, highBlockNum: -1, cursor: $cursor) {
          cursor
          trace { id matchingActions { json, dbOps(code: "consortiumlv", table:"kysimused"){operation, oldJSON {object error}} } }
        }
      }`;
    async function main() {
      const stream = await client.graphql(operation, message => {
        if (message.type === 'data') {
          const {
            cursor,
            trace: { id, matchingActions }
          } = message.data.searchTransactionsBackward;
          matchingActions.forEach(({ dbOps }) => {if(Date.parse(dbOps[0].oldJSON.object.timecreated) > Date.parse('2020-10-13T11:18:32') && dbOps[0].oldJSON.object.community == scope){
            list[`${dbOps[0].oldJSON.object.uniqueurl}`] = [
              `${dbOps[0].oldJSON.object.community}`, `${dbOps[0].oldJSON.object.question}`, `${dbOps[0].oldJSON.object.description}`,dbOps[0].oldJSON.object.answers,dbOps[0].oldJSON.object.totalvote, `${dbOps[0].oldJSON.object.sumofallopt}`]
            }
          });
        }
        if (message.type === 'error') {
          console.log('An error occurred', message.errors, message.terminal);
        }
        if (message.type === 'complete') {
          console.log('Completed');
        }
      });
      await stream.join();
      setDatar({...list})
      console.log(list)
      const stream2 = await client.graphql(operation2, message => {
        if (message.type === 'data') {
          const {
            cursor,
            trace: { id, matchingActions }
          } = message.data.searchTransactionsBackward;
          matchingActions.forEach(({ dbOps }) => {if(Date.parse(dbOps[0].oldJSON.object.timecreated) > Date.parse('2020-10-13T11:18:32') && dbOps[0].oldJSON.object.community == scope){
            list[`${dbOps[0].oldJSON.object.uniqueurl}`] = [
              `${dbOps[0].oldJSON.object.community}`, `${dbOps[0].oldJSON.object.question}`, `${dbOps[0].oldJSON.object.description}`,dbOps[0].oldJSON.object.answers,dbOps[0].oldJSON.object.totalvote, `${dbOps[0].oldJSON.object.sumofallopt}`]
            }
          });
        }
        if (message.type === 'error') {
          console.log('An error occurred', message.errors, message.terminal);
        }
        if (message.type === 'complete') {
          console.log('Completed');
        }
      });
      await stream2.join();
      await client.release();
      setDatar({...list})
      console.log(list)
    }

    main().catch(error => console.log('Unexpected error', error));


  }
  },[])

  // CODE:END:quickstarts_javascript_node_eos_section4

  return (
    <div className="App">
    <a href={`${window.location.origin}/community/${scope}`}>Go back</a>
      <header className="history-header">
      <div style={{"text-align":"left", "line-height":"30px"}}>{  Object.keys(datar).map(function(key) {
          let sum = datar[key][4].reduce((a, b) => a + b, 0)
          return <div class="card" style={{"border-radius":"15px","padding":"20px","margin-top":"10px","margin-bottom":"10px","max-width":"500px","background-color":"#FFFFFF"}}><a style={{"text-decoration":"none", "color":"black"}} value={key}>{
            <div><a style={{"font-weight":"600","font-size":"16px"}}>{datar[key][1]}</a><br/><a>{datar[key][2]}</a>{Object.keys(datar[key][3]).map(function(subkey){return <div class="item"><a>{datar[key][3][subkey]} ({(datar[key][4][subkey]/sum*100).toFixed(2)}%) <br/><div id="progressbar"><div style={{"width":`${datar[key][4][subkey]/sum*100}%`}}/></div></a></div>})}<div style={{"width":"100%", "text-align":"right"}}>{nFormatter(datar[key][5])} Tokens</div></div>
          }</a></div>
      })}</div>
      </header>
    </div>
  );
}

export default App;
