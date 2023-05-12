const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/v1/openai', require('./routes/openaiRoutes'));  //REST REQUEST 👉 {{url}}/api/v1/openai/generateimage

app.listen(port, () => console.log(`!!server started on port ${port}`))
