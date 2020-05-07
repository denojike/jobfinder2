const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const auth = require('../middleware/auth');

const Employer = require('../models/Employer');
const Job = require('../models/Job');

//fields to validate
const fields = [
  check('empCompanyName', 'Company Name is required').not().isEmpty(),
  check('empCompanyWeb', 'Company Website is required').not().isEmpty(),
  check('empCompanyEmail', 'Email is required')
    .isEmail()
    .withMessage('Please include a valid email'),
  check('empCompanyDesc', 'Write something about your company').not().isEmpty(),
  check('empPassword', 'Password is required')
    .not()
    .isEmpty()
    .isLength({ min: 6 })
    .withMessage('Password must be six characters long'),
  check('empPasswordConfirm', 'Confirm Password is required').not().isEmpty(),
];

// @desc GET ALL EMPLOYERS
// @route GET api/employers
// @access Public
router.get('/', async (req, res) => {
  try {
    let employers = await Employer.find();
    res.json(employers);
  } catch (err) {
    console.log(err);
  }
});

// @desc CREATE EMPLOYER
// @route POST api/employers
// @access Public
router.post('/', fields, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }
  const {
    empCompanyName,
    empCompanyWeb,
    empCompanyEmail,
    empCompanyDesc,
    empPassword,
    empPasswordConfirm,
  } = req.body;

  //Confirm Password
  if (empPassword !== empPasswordConfirm) {
    return res
      .status(400)
      .json({ errors: [{ msg: 'Passwords did not match' }] });
  }

  try {
    //See if employer exists
    let employer = await Employer.findOne({ empCompanyEmail });
    console.log(employer);

    if (employer) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Employer already exists' }] });
    }

    //Build Employer object
    const empFields = {};
    empFields.empCompanyName = empCompanyName;
    empFields.empCompanyWeb = empCompanyWeb;
    empFields.empCompanyEmail = empCompanyEmail;
    empFields.empCompanyDesc = empCompanyDesc;
    empFields.empPassword = empPassword;

    //Create new Employer
    employer = new Employer(empFields);

    //Encrypt password with bcrypt
    const salt = await bcrypt.genSalt(10);
    employer.empPassword = await bcrypt.hash(empPassword, salt);

    await employer.save();

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
        res.json({ msg: 'user succesfully created' });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

// @desc UPDATE EMPLOYER
// @route POST api/employers/:id
// @access Private
router.put(
  '/:id',
  [
    auth,
    [
      check('empCompanyName', 'Company Name is required').not().isEmpty(),
      check('empCompanyWeb', 'Company Website is required').not().isEmpty(),
      check('empCompanyEmail', 'Email is required')
        .isEmail()
        .withMessage('Please include a valid email'),
      check('empCompanyDesc', 'Write something about your company')
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    const {
      empCompanyName,
      empCompanyWeb,
      empCompanyEmail,
      empCompanyDesc,
    } = req.body;

    try {
      //See if employer exists
      let employer = await Employer.findByIdAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            empCompanyName,
            empCompanyWeb,
            empCompanyEmail,
            empCompanyDesc,
          },
        }
      );
      res.json(employer);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  }
);

// @desc UPDATE EMPLOYER PASSWORD
// @route POST api/updatePassword/:id
// @access Private
router.post(
  '/:id',
  [
    check('empOldPassword', 'Password is required').not().isEmpty(),
    check('empPassword', 'Password is required')
      .not()
      .isEmpty()
      .isLength({ min: 6 })
      .withMessage('Password must be six characters long'),
    check('empPasswordConfirm', 'Confirm Password is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    const { empOldPassword, empPassword, empPasswordConfirm } = req.body;

    //Confirm Password
    if (empPassword !== empPasswordConfirm) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'New Passwords did not match' }] });
    }

    try {
      //See if employer exists
      let employer = await Employer.findById({ _id: req.params.id });

      if (!employer) {
        return res.status(400).json({
          errors: [
            { msg: 'Employer does not exist or might have been deleted' },
          ],
        });
      }

      //Check password and encrypted password
      const isMatch = await bcrypt.compare(
        empOldPassword,
        employer.empPassword
      );
      const previouslyUsed = await bcrypt.compare(
        empPassword,
        employer.empPassword
      );
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Wrong Old Password' }] });
      } else if (previouslyUsed) {
        return res.status(400).json({
          errors: [{ msg: 'Password previously used. Choose a new one' }],
        });
      } else {
        //Encrypt password with bcrypt
        const salt = await bcrypt.genSalt(10);
        employer.empPassword = await bcrypt.hash(empPassword, salt);
        await Employer.findByIdAndUpdate(
          { _id: req.params.id },
          { $set: employer }
        );
        res.json({ msg: 'Password successfully updated' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  }
);

// @desc DELETE SINGLE EMPLOYER
// @route DELETE api/deleteEmployer/:id
// @access Private
router.delete('/:id', auth, async (req, res) => {
  //  Check if Employer exits
  try {
    let employer = await Employer.findOne({ _id: req.params.id });

    if (!employer) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'This employer has already been deleted' }] });
    } else {
      await Job.deleteMany({ employer: req.params.id });

      await Employer.findOneAndRemove({ _id: req.params.id });

      res.json({
        msg: `Employer with the id ${req.params.id} was succesfully deleted`,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
