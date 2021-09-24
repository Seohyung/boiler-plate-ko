const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const router = express.Router();

router
  .route('/')
  .post(async (req, res, next) => {
    try {
      User.findOne( { email: req.body.useremail }, (err, userInfo) => {
          /*
      });
      res.json(users);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      const hash = await bcrypt.hash(req.body.userpassword, 10);
      const user = await User.create({
        email: req.body.useremail,
        password: hash,
      });
      console.log(user);
      res.status(201).json(user);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

module.exports = router;*/