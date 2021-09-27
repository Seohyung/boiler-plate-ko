const express = require('express');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    res.send('hello express');
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
