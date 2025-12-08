const express = require('express');
const router = express.Router();
const path = require('path');

router.use('/public', express.static(path.join(__dirname, 'public')));

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

router.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

router.get('/api/whoami', function (req, res) {
  res.json({
    ipaddress: req.ip,
    language: req.headers['accept-language'],
    software: req.headers['user-agent']
  });
});

module.exports = router;
