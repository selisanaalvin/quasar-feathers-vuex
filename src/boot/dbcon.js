const io = require('socket.io-client');
const feathers = require('@feathersjs/feathers');
const socketio = require('@feathersjs/socketio-client');
const socket = io('http://localhost:3030');

const appfeathers = feathers();
appfeathers.configure(socketio(socket));

// "async" is optional
export default async ({ Vue }) => {
  Vue.prototype.$appfeathers = appfeathers
}
