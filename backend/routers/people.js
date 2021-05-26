const express = require('express');
const router = express.Router();
require('dotenv').config();

router.post('/', async (req, res) => {
  try {
    res.status(200).json('');
  }
  catch (err) {
    res.status(400).json({ err });
  }
});

module.exports = router;