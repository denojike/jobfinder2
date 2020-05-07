const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const Job = require('../models/Job');

//fields to validate
const fields = [
  check('jobTitle', 'Job Title is required').not().isEmpty(),
  check('jobDesc', 'Job Description is required').not().isEmpty(),
  check('jobEdu', 'Education / Experience is required').not().isEmpty(),
  check('jobSkills', 'Job Skills required').not().isEmpty(),
  check('jobType', 'Job Type is required').not().isEmpty(),
  check('jobCategory', 'Job Category is required').not().isEmpty(),
  check('jobNumVac', 'Number of vacancy is required').not().isEmpty(),
  check('jobState', 'State is required').not().isEmpty(),
  check('jobCountry', 'Country is required').not().isEmpty(),
];

// @desc GET ALL JOBS
// @route GET api/jobs
// @access Public
router.get('/', async (req, res) => {
  try {
    let jobs = await Job.find()
      .populate('employer', '-empPassword')
      .sort({ date: 'desc' });
    res.json(jobs);
  } catch (err) {
    console.log(err);
  }
});

// @desc GET SINGLE JOB
// @route GET api/jobs/:id
// @access Public
router.get('/:id', async (req, res) => {
  try {
    //find job
    let job = await Job.findById({ _id: req.params.id }).populate(
      'employer',
      '-empPassword'
    );
    if (!job) {
      return res
        .status(404)
        .json({ errors: [{ msg: 'This job does not exist' }] });
    } else {
      res.json(job);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

// @desc POST JOB
// @route POST api/jobs
// @access Private
router.post('/', [auth, fields], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }

  const {
    jobTitle,
    jobDesc,
    jobEdu,
    jobSkills,
    jobType,
    jobCategory,
    jobNumVac,
    jobCity,
    jobState,
    jobCountry,
  } = req.body;

  //Build job object
  const jobFields = {};
  jobFields.employer = req.employer.id;
  jobFields.jobTitle = jobTitle;
  jobFields.jobDesc = jobDesc;
  jobFields.jobEdu = jobEdu;
  jobFields.jobSkills = jobSkills;
  jobFields.jobType = jobType;
  jobFields.jobCategory = jobCategory;
  jobFields.jobNumVac = jobNumVac;
  jobFields.jobCity = jobCity;
  jobFields.jobState = jobState;
  jobFields.jobCountry = jobCountry;

  //Create New Job
  try {
    let job = new Job(jobFields);
    await job.save();
    res.json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

// @desc UPDATE SINGLE JOB
// @route PUT api/updateJob/:id
// @access private
router.put('/:id', [auth, fields], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }

  const {
    jobTitle,
    jobDesc,
    jobEdu,
    jobSkills,
    jobType,
    jobCategory,
    jobNumVac,
    jobCity,
    jobState,
    jobCountry,
  } = req.body;

  //Build job object
  const jobFields = {};
  jobFields.employer = req.employer.id;
  jobFields.jobTitle = jobTitle;
  jobFields.jobDesc = jobDesc;
  jobFields.jobEdu = jobEdu;
  jobFields.jobSkills = jobSkills;
  jobFields.jobType = jobType;
  jobFields.jobCategory = jobCategory;
  jobFields.jobNumVac = jobNumVac;
  jobFields.jobCity = jobCity;
  jobFields.jobState = jobState;
  jobFields.jobCountry = jobCountry;

  try {
    //find job
    let job = await Job.findById({ _id: req.params.id });
    if (!job) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'This job does not exist' }] });
    } else if (job.employer.toString() === req.employer.id) {
      await Job.findByIdAndUpdate({ _id: req.params.id }, { $set: jobFields });
      res.json({ msg: 'Job successfully updated' });
    } else {
      res.status(401).json({ errors: [{ msg: 'Unauthorized access' }] });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

// @desc DELETE SINGLE JOB
// @route PUT api/deleteJob/:id
// @access private
router.delete('/:id', auth, async (req, res) => {
  try {
    let job = await Job.findById({ _id: req.params.id });
    if (!job) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'This job has already been deleted' }] });
    } else if (job.employer.toString() === req.employer.id) {
      await Job.findOneAndRemove({ _id: req.params.id });
      res.json({ msg: 'Job successfully deleted' });
    } else {
      res.status(401).json({ errors: [{ msg: 'Unauthorized access' }] });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

module.exports = router;
