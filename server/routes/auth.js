const express = require('express');
const router = express.Router();
const User = require('../models/user');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

router.route('/').get(async (req, res, next) => {
  try {
    let token = await req.cookies.x_auth;
    let decoded = jwt.verify(token, 'secretToken');
    let user;
    if (decoded) {
      user = await User.findOne({
        where: { [Op.and]: [{ email: decoded }, { token: token }] },
      });
      req.token = token;
      req.user = user;
    }
    if (!user) {
      return res.json({
        isAuth: false,
        error: true,
      });
    }
    res.status(200).json({
      id: req.user.id,
      email: req.user.email,
      password: req.user.password,
      token: req.user.token,
    });
    next();
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.route('/logout').get(async (req, res, next) => {
  try {
    await User.update({ token: '' }, { where: { id: req.user.id } });
    return res.status(200).send({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
    });
    next(err);
  }
});

module.exports = router;
