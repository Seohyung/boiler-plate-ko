const express = require('express');
const router = express.Router();
const User = require('../models/user');
const authMiddleware = require('./authMiddleware');

router.get('/', async (req, res, next) => {
  authMiddleware(req, res, next);
  res.status(200).json({
    id: req.user.id,
    email: req.user.email,
  });
});

module.exports = router;
