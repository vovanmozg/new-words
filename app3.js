


const WebSocket = require('ws');

const ws = new WebSocket('wss://open-data.api.satori.com');

ws.on('open', function open() {
  ws.send('something');
});

ws.on('message', function incoming(data) {
  console.log(data);
});