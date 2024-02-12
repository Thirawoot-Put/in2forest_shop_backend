require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');



const app = express();

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`server running on ${PORT}`));
