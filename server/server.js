const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
// const morgan = require("morgan")
const dotenv = require('dotenv');
dotenv.config();
const { apolloServer } = require('./graphql/index');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const logger = require('./config/logger');

// connect to the database and load models
const mongooseUri = process.env.DB_URI;
require('./models').connect(mongooseUri);

const corsOptions = {
  credentials: true,
  origin: 'http://localhost:3088',
};

const app = express();
// app.use(morgan("dev"))
app.use(cors(corsOptions));
app.use(cookieParser());

app.use((req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    try {
      const jwtRes = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = jwtRes.id;
      req.username = jwtRes.username;
      req.role = jwtRes.role;
    } catch {
      req.userId = null;
      req.username = null;
      req.role = null;
    }
  }
  next();
});

// tell the app to look for static files in these directories
// app.use(express.static("./server/static/"))
// tell the app to parse HTTP body messages
app.use(bodyParser.json());

apolloServer.applyMiddleware({
  app,
  cors: corsOptions,
  path: '/graphql',
});

// routes
// app.use("/uploads", require("./routes/uploads"))
// app.use("/stripe", require("./routes/stripe"))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));

  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

// Set Port, hosting services will look for process.env.PORT
app.set('port', process.env.PORT || 8000);

// start the server
app.listen(app.get('port'), () => {
  logger.log('info', `Server is running on port ${app.get('port')}`);
});
