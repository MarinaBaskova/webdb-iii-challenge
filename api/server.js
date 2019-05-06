const express = require('express');
const helmet = require('helmet');
const cohortsRouter = require('../api/routes/cohorstsRoute');
const studentsRouter = require('../api/routes/studentsRoute');
const server = express();

server.use(express.json());
server.use(helmet());
server.use('/api/cohorts', cohortsRouter);
server.use('/api/students', studentsRouter);

module.exports = server;
