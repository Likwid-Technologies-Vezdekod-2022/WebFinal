const express = require('express');
const path = require('path');
const cors = require('cors');

const router = require('./routes/router');

const PORT = 3030;

const app = express();

app.use('/', express.static(path.join(__dirname, 'build')));
app.use(express.urlencoded({extended: false, limit: '50mb'}));
app.use(express.json({limit: '50mb'}));

app.use(cors());

app.use('/api', router);

const { exec } = require('child_process');

exec('react-scripts start', (error, stdout, stderr) => {
  if (error) {
    console.error(`error: ${error.message}`);
    return;
  }

  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }

  console.log(`stdout:\n${stdout}`);
});

async function start() {
    try {
        app.listen(PORT, () => {
            console.log('Server has been started...');
        })
    } catch (err) {
        console.log(err);
    }
}

start();