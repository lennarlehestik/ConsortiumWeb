import { createClient } from 'eosio-push-guarantee';

const getClient = async() => {
 return await createClient({ fetch: window.fetch.bind(window) });
};

export default getClient
