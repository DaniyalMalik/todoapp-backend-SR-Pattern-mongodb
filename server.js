const express = require('express'),
  cors = require('cors'),
  dotenv = require('dotenv'),
  mongoSanitize = require('express-mongo-sanitize'),
  helmet = require('helmet'),
  hpp = require('hpp'),
  { xss } = require('express-xss-sanitizer'),
  morgan = require('morgan'),
  colors = require('colors'),
  connectDb = require('./config/db');

const todoController = require('./controllers/todo.controller');
const userController = require('./controllers/user.controller');
// import 'reflect-metadata';

dotenv.config({ path: 'config/config.env' });

const app = express();

app.use(cors());
app.use(mongoSanitize());
app.use(helmet());
app.use(hpp());
app.use(xss());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/user', userController);
// app.use('/todo', todoController);

const PORT = process.env.PORT || 8000;
const ENVIRONMENT = process.env.NODE_ENV;

app.listen(PORT, () =>
  console.log(
    `Server started running in ${ENVIRONMENT} mode on PORT ${PORT}`.blue,
  ),
);

connectDb();
