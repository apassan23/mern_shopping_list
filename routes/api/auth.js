const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

// User Model
const User = require('../../models/User');

//? @route  POST api/auth
//? @desc   Auth User
//* @access public
router.post('/', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: 'All the Fields Must be Filled' });
  }
  User.findOne({ email }).then(user => {
    if (!user) return res.status(400).json({ msg: 'No User with this e-mail' });

    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) return res.status(400).json({ msg: 'Wrong Credentials' });

      jwt.sign(
        { id: user._id },
        config.get('jwtSecret'),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user._id,
              name: user.name,
              email: user.email
            }
          });
        }
      );
    });
  });
});

//? @route  GET api/auth/user
//? @desc   Get User data
//! @access private
router.get('/user', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user));
});

module.exports = router;
