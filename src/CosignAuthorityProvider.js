import { JsonRpc } from "eosjs/dist/eosjs-jsonrpc";

const { convertLegacyPublicKeys } = require("eosjs/dist/eosjs-numeric");
const rpc = new JsonRpc("https://api.main.alohaeos.com:443");

class CosignAuthorityProvider {
  async getRequiredKeys(args) {
    const { transaction } = args;
    // Iterate over the actions and authorizations
    transaction.actions.forEach((action, ti) => {
      action.authorization.forEach((auth, ai) => {
        // If the authorization matches the expected cosigner
        // then remove it from the transaction while checking
        // for what public keys are required
        if (auth.actor === "greymassfuel" && auth.permission === "cosign") {
          delete transaction.actions[ti].authorization.splice(ai, 1);
        }
      });
    });
    // the rpc below should be an already configured JsonRPC client from eosjs
    return convertLegacyPublicKeys(
      (
        await rpc.fetch("/v1/chain/get_required_keys", {
          transaction,
          available_keys: args.availableKeys,
        })
      ).required_keys
    );
  }
}

export default CosignAuthorityProvider;
