const express = require("express");
const app = express();
const server = require("http").createServer(app);
// server.createServer(app).listen(8080);
const io = require("socket.io")(server);
const morgan = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');
const port = 3000;


app.use(morgan('dev'))


// body parsing middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// compression middleware
app.use(compression())
//when we're sending datas back to the client, we will compress it then send it so it will make the quicker by 1/5 the time

app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error('Not found')
    err.status = 404
    next(err)
  } else {
    next()
  }
})

// error handling endware
app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error.')
})

// io.listen(3000, )
io.on("connection", socket => {

  socket.on("chat message", msg => {
    console.log(msg);
    io.emit("chat message", msg);
    // 推播給所有使用者
  })

  console.log("a user conneted");
  socket.on("position", (position)=> {
    // 當和伺服器的連線 socket 接收到訊息
    console.log(position);
    socket.broadcast.emit("otherPositions", position);
    // 對目前 socket 之外所有線上的 socket 傳訊息
  })

  
});

server.listen(port, () => 
  console.log("server running on port" + port)
);

module.exports = app;