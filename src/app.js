const express = require('express');
const bodyParser = require('body-parser');
const taskRoute = require('./routes/taskRoute');

const app = express();

app.use(bodyParser.json());
app.use('/api', taskRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Hello InFeedo !! I am running on port ${PORT}`);
});

module.exports = app;

