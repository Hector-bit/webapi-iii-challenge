const express = require('express');
const helmet = require('helmet');
const postRouter = require('./posts/postRouter');
const userRouter = require('./users/userRouter');
const server = express();

function logger(req, res, next) {
  console.log(`${req.method} to ${req.path} from ${req.url} ${Date.now() / 1000}}`)

  next();
};

//custom middleware
server.use(logger);
server.use(helmet());
server.use(express.json());
server.use('/api/posts', postRouter);
server.use('/api/users', userRouter);

server.get('/', logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

module.exports = server;
