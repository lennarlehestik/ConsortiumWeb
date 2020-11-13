import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Poll from "./Poll";
import Leaderboard from "./Leaderboard";
import Frontpage from "./Frontpage";
import History from "./history/History"
import * as serviceWorker from "./serviceWorker";
import { Route, BrowserRouter as Router } from "react-router-dom";
// UAL Required Imports
import { UALProvider } from "ual-reactjs-renderer";
// Authenticator Imports
import { EOSIOAuth } from "ual-eosio-reference-authenticator";
import { Scatter } from "ual-scatter";
import { Anchor } from "ual-anchor";
import { TokenPocket } from "ual-token-pocket";
import { Ledger } from "ual-ledger";
import { Lynx } from "ual-lynx";
import { JsonRpc } from "eosjs/dist/eosjs-jsonrpc";

import "./fonts/Roboto-Regular.ttf";
import "./fonts/Roboto-Bold.ttf";
import "./fonts/Roboto-Black.ttf";
import "./fonts/Roboto-Medium.ttf";

const appName = "Consortium";

const chain = {
  chainId: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906",
  rpcEndpoints: [
    {
      protocol: "https",
      host: "dsp.eosphere.io",
      //https://dsp.maltablock.org
      //host: "dsp.airdropsdac.com", https://node2.blockstartdsp.com"dsp.eosphere.io",https://dsp.eosdetroit.io,https://node1.eosdsp.com
      port: "",
    },
  ],
};

/*
https://dsp.airdropsdac.com
const chain = {
  chainId: "5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191",
  rpcEndpoints: [
    {
      protocol: "https",
      host: "api.kylin.alohaeos.com",
      port:"443",
    },
  ],
}

*/
// Chains
/*
const chain = {
  chainId: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906",
  rpcEndpoints: [
    {
      protocol: "https",
      host: "eos.greymass.com",
      port:"443",
    },
  ],
}
*/

// Authenticators
const eosioAuth = new EOSIOAuth([chain], { appName, protocol: "eosio" });
const scatter = new Scatter([chain], { appName });
const anchor = new Anchor([chain], {
  appName,
});
const lynx = new Lynx([chain]);
const tokenPocket = new TokenPocket([chain]);
const ledger = new Ledger([chain]);

const supportedChains = [chain];
const supportedAuthenticators = [
  eosioAuth,
  scatter,
  anchor,
  lynx,
  tokenPocket,
  ledger,
];

const routing = (
  <Router>
    <div>
      <UALProvider
        chains={supportedChains}
        authenticators={supportedAuthenticators}
        appName={appName}
      >
        <Route path="/poll/:id/:scope" component={Poll} />
        <Route path="/history/:scope" component={History} />
        <Route exact path="/community/:scope" component={App} />
        <Route
          exact
          path="/community/:scope/Leaderboard"
          component={Leaderboard}
        />
        <Route exact path="/" component={Frontpage} />
      </UALProvider>
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
