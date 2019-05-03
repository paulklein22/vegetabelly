const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Load User Model
const User = require('../../models/User');

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
  '/',
  [
    check('name', 'Please enter your name.')
      .not()
      .isEmpty(),
    check('email', 'Please enter a valid email address.').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters.'
    ).isLength({ min: 6 })
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // Check if User Exists
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists.' }] });
      }

      // Get User's Gravatar
      const avatar = gravatar.url(email, {
        s: '200', // Size
        r: 'pg', // Rating
        d: 'mm' // Default Image
      });

      // Creates New User
      user = new User({
        name,
        email,
        avatar,
        password
      });

      // Encrypt Password Using BCryptJS
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      // Return JSON Web Token
      res.send('User registered.');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// router.post('/register', (req, res) => {
//   const { errors, isValid } = validateRegisterInput(req.body);

//   // Check Validation
//   if (!isValid) {
//     return res.status(400).json(errors);
//   }

//   User.findOne({ email: req.body.email }).then(user => {
//     if (user) {
//       errors.email = 'Email already exists';
//       return res.status(400).json(errors);
//     } else {
//       const avatar = gravatar.url(req.body.email, {
//         s: '200', // Size
//         r: 'pg', // Rating
//         d: 'mm' // Default
//       });

//       const newUser = new User({
//         name: req.body.name,
//         email: req.body.email,
//         avatar,
//         password: req.body.password
//       });

//       bcrypt.genSalt(10, (err, salt) => {
//         bcrypt.hash(newUser.password, salt, (err, hash) => {
//           if (err) throw err;
//           newUser.password = hash;
//           newUser
//             .save()
//             .then(user => res.json(user))
//             .catch(err => console.log(err));
//         });
//       });
//     }
//   });
// });

// // @route   POST api/users/login
// // @desc    Login User/ Returning JWToken
// // @access  Public
// router.post('/login', (req, res) => {
//   const { errors, isValid } = validateLoginInput(req.body);

//   // Check Validation
//   if (!isValid) {
//     return res.status(400).json(errors);
//   }

//   const email = req.body.email;
//   const password = req.body.password;

//   // Find user by email
//   User.findOne({ email }).then(user => {
//     // Check for user
//     if (!user) {
//       errors.email = 'User not found';
//       return res.status(404).json(errors);
//     }

//     // Check password
//     bcrypt.compare(password, user.password).then(isMatch => {
//       if (isMatch) {
//         // User matched

//         // Create JWT payload
//         const payload = { id: user.id, name: user.name, avatar: user.avatar };

//         // Sign Token
//         jwt.sign(
//           payload,
//           keys.secretOrKey,
//           { expiresIn: 3600 },
//           (err, token) => {
//             res.json({
//               success: true,
//               token: 'Bearer ' + token
//             });
//           }
//         );
//       } else {
//         errors.password = 'Password incorrect';
//         return res.status(400).json(errors);
//       }
//     });
//   });
// });

// // @route   GET api/users/current
// // @desc    Return current user
// // @access  Private
// router.get(
//   '/current',
//   passport.authenticate('jwt', { session: false }),
//   (req, res) => {
//     res.json({
//       id: req.user.id,
//       name: req.user.name,
//       email: req.user.email
//     });
//   }
// );

module.exports = router;
