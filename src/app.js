require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const notFound = require('./middlewares/not-fount');
const error = require('./middlewares/error');
const limiter = require('./middlewares/rate-limit');
const authRoute = require('./routes/auth-route');
const adminRoute = require('./routes/admin-route');
const userRoute = require('./routes/user-route')

const app = express();

app.use(cors());
app.use(express.json());
app.use(limiter);
app.use(morgan('dev'));
// app.use('/public', express.static('public'));

app.use('/auth', authRoute);
app.use('/user', userRoute)
app.use('/admin', adminRoute);

app.use(notFound);
app.use(error);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`server running on ${PORT}`));
