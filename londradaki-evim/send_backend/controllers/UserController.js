const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const register = [
  check('firstName', 'First Name is required').not().isEmpty(),
  check('lastName', 'Last Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, password } = req.body;

    try {
      db.query('SELECT email FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Server error');
        }

        if (results.length > 0) {
          return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = { firstName, lastName, email, password: hashedPassword };
        db.query('INSERT INTO users SET ?', user, (err, result) => {
          if (err) {
            console.error(err);
            return res.status(500).send('Server error');
          }

          const payload = { user: { id: result.insertId } };
          jwt.sign(payload, 'your_jwt_secret', { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
          });
        });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
];

const login = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Server error');
        }

        if (results.length === 0) {
          return res.status(400).json({ errors: [{ msg: 'Invalid email or password' }] });
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return res.status(400).json({ errors: [{ msg: 'Invalid email or password' }] });
        }

        const payload = { user: { id: user.id } };
        jwt.sign(payload, 'your_jwt_secret', { expiresIn: 360000 }, (err, token) => {
          if (err) throw err;
          res.json({ token });
        });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
];

module.exports = {
  register,
  login
};
