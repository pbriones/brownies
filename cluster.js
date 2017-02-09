'use strict'
const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  os.cpus().forEach(() => cluster.fork());
  cluster.on('exit', worker => {
    console.log(`Worker ${worker.id} is dead :(`);
    cluster.fork();
  })
} else {
  console.log(`Worker ${cluster.worker.id} working!`);
  require('./app.js');
}