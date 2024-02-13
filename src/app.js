require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const notFound = require('./middlewares/not-fount');
const error = require('./middlewares/error');
const limiter = require('./middlewares/rate-limit');

const app = express();

app.use(cors());
app.use(express.json());
app.use(limiter);
app.use(morgan('dev'));
// app.use('/public', express.static('public'));

app.use('/', (req, res, next) => { res.json({ message: 'hello' }) })

app.use(notFound);
app.use(error);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`server running on ${PORT}`));
