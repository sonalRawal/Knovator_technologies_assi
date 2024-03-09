const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = {
  register: async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const user = new User({ username, password });
      await user.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      next(error);
    }
  },

  login: async (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user) => {
      if (err || !user) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }
      req.login(user, { session: false }, (err) => {
        if (err) return next(err);
        const token = jwt.sign({ sub: user._id }, 'Knovator_Technologies');
        return res.json({ token });
      });
    })(req, res, next);
  }
};
