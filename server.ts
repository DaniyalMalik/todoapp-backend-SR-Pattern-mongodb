const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoSanitize = require('mongoSanitize');
const cookieParser = require('cookieParser');
const helmet = require('helmet');
const hpp = require('hpp');
const xss = require('xss');
const morgan = require('morgan');
const todoController = require('./controllers/todo.controller');
const userController = require('./controllers/user.controller');
// import 'reflect-metadata';

dotenv.config({ path: 'config/config.env' });

const app = express();

app.use(cors());
app.use(mongoSanitize());
app.use(cookieParser());
app.use(helmet());
app.use(hpp());
app.use(xss());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userController);
app.use('/todo', todoController);

const PORT = process.env.PORT || 8000;
const ENVIRONMENT = process.env.NODE_ENV;

const server = app.listen(PORT, () =>
  console.log(
    `Server started running in ${ENVIRONMENT} mode on PORT ${PORT}`.blue.bold,
  ),
);
