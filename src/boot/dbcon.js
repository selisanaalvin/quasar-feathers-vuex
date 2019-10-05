// import something here
const feathers = require('@feathersjs/feathers');
const rest = require('@feathersjs/rest-client');

import axios from 'axios'

const appfeathers = feathers();

// // Connect to the same as the browser URL (only in the browser)
// const restClient = rest();

// Connect to a different URL
const restClient = rest('http://localhost:3030');

// "async" is optional
export default async ({ Vue }) => {
  Vue.prototype.$appfeathers = appfeathers
  appfeathers.configure(restClient.axios(axios))
}
