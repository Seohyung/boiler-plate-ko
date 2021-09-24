const express = require('express');
const User = require('../models/user');
const path = require('path');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.render(path.resolve(__dirname, 'views/' + 'sequelize' + '.html'), {
      users,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
