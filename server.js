
const http  = require('http');
const express = require('express');
const cors = require('cors');
const compression  = require('compression');
const bodyparser = require('body-parser');
const helmet = require("helmet");
const app  = express();

app.disable("x-powered-by");
app.use(helmet());
app.use(compression());
app.use(cors({ origin: "http://127.0.0.1:5500" }));
app.use(bodyparser.json());
app.use(express.static("public"));
app.get('/users', (req, res)=>{
    res.send("Get users request from web");
})
app.get('/stream', (req, res)=>{
     console.log("Client connected");   
     res.writeHead(200, {
        "Connection": "keep-alive",
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        'Access-Control-Allow-Origin': "http://127.0.0.1:5500"
      });
      let i  = 0;
      const interval  = setInterval(()=>{
        res.write(`data: hello from server to ${i++} client\n\n`);
        res.flush();
      }, 1000);
      res.on('close', ()=>{
         clearInterval(interval);
         res.write('data: client closed the connection');
        res.flush();
         res.end();
     })
})

const server = http.createServer(app);
server.listen(5000, ()=>{
    console.log("Server  listening on port "+ 5000);
})
  