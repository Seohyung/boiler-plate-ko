const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.route('/').post(async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.useremail } });
    console.log(user.email);
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: '제공된 이메일에 해당하는 유저가 없습니다.',
      });
    }

    let passwordMatch = await bcrypt.compare(
      req.body.userpassword,
      user.password
    );
    if (!passwordMatch) {
      return res.json({
        loginSuccess: false,
        message: '비밀번호가 틀렸습니다.',
      });
    } else {
      let token = jwt.sign(user.email, 'secretToken');
      await User.update({ token: token }, { where: { email: user.email } });

      return res.cookie('x_auth', token).status(200).json({
        locginSuccess: true,
        userEmail: user.email,
      });
    }
    //res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
    next(err);
  }
});
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
*/
module.exports = router;
