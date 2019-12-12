const WebSocket = require("ws");
const http = require("http");

const server = http.createServer(function(req, res) {
  res.writeHead(200);
  res.end("hello world\n");
});

const wss = new WebSocket.Server({ server });

let socket = null;
wss.on("connection", function connection(ws) {
  console.log("replacing socket");
  socket = ws;
});

socket.send(JSON.stringify({ name: "state-keys", data: keys }));

server.listen(8080, () => {
  console.log("started");
});
