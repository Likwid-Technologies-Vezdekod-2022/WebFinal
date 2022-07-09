const express = require('express');
const path = require('path');
const cors = require('cors');

const router = require('./routes/router');

const PORT = 3030;

const app = express();

// app.use('/', express.static(path.join(__dirname, '../dist')));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(cors());

app.use('/api', router);

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