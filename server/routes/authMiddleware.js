const User = require('../models/user');

let authMiddleware = (req, res, next) => {
  let token = req.cookies.x_auth;
  const user = User.findByToken(token);

  if (!user) {
    res.json({ isAuth: false, error: true });
    next();
  }

  req.token = token;
  req.user = user;
  //next();
};

module.exports = authMiddleware;
