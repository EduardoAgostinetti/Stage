const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;

const auth = require('./auth');
const tickets = require('./tickets');
const mail = require('./mail');

app.use(cors());

app.use('/auth', auth);
app.use('/tickets', tickets);
app.use('/mail', mail);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
