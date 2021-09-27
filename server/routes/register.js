const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const router = express.Router();

router.route('/').post(async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.userpassword, 10);
    const user = await User.create({
      email: req.body.useremail,
      password: hash,
    });
    console.log(user);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.json({ success: false, err });
    next(err);
  }
});

module.exports = router;
