const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const config = require('config');

const Employer = require('../models/Employer');

// @route GET api/auth
// @desc Check if an employer is logged in
// @access Public
router.get('/', auth, async (req, res) => {
  try {
    const employer = await Employer.findById(req.employer.id).select(
      '-password'
    );
    res.json(employer);
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err);
  }
});

// @route POST api/login
// @desc Login Employer and get token
// @access Public
router.post(
  '/',
  [
    check('empCompanyEmail', 'Email is invalid').isEmail().normalizeEmail(),
    check('empPassword', 'Password is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    console.log(req.body.empCompanyEmail, req.body.empPassword);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { empCompanyEmail, empPassword } = req.body;
    try {
      // See if employer exists
      let employer = await Employer.findOne({ empCompanyEmail });

      if (!employer) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Employer does not exist' }] });
      }

      //Check password and encrypted password
      const isMatch = await bcrypt.compare(empPassword, employer.empPassword);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      //Return jsonwebtoken
      const payload = {
        employer: {
          id: employer._id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw error;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).send(err.message);
    }
  }
);

module.exports = router;
