const express = require('express');
const router = express.Router();
const { sendMail } = require('./utility_functions');

router.post('/sendMail', express.json(), async (req, res) => {
    const data = req.body;

    sendMail(data.email, data.subject, data.text, data.html);

  });

module.exports = router;