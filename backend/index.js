const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config({
    path: './config/config.env'
});

const port = process.env.PORT || 3000;
const host = 'localhost';

const app = express();
app.use(cors());
app.use(express.json());

const bfhlRouter = require('./routes/bfhl');

app.use('/', bfhlRouter);

app.listen(port, host, () => {
    console.log(`Server started at http://${host}:${port}`);
});
