const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Psychologists = require('../models/Psychologists');
const auth = require('../middleware/auth');

const respondPayload = (id, res) => {
  const payload = {
    psychologist: {
      id,
    },
  };

  jwt.sign(payload, process.env.JWTSECRET, { expiresIn: 7200 }, (err, token) => {
    if (err) throw err;

    res.json({ token });
  });
};

/** Route     POST api/psychologists
 * Desc      Create new psychologist and get token
 * Access    Public
 */
router.post(
  '/',
  [
    check('fullName', 'fullName is required').trim().not().isEmpty(),
    check('email', 'email should contain @ and . characters').optional().isEmail(),
    check('password', 'please enter a password with 6 or more characters.').trim().isLength({
      min: 6,
    }),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      const { fullName, email } = req.body;

      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(req.body.password, salt);

      const newPsychologist = new Psychologists({
        fullName,
        password,
        email,
        workingStatus: 'active',
      });

      await newPsychologist.save();
      res.status(201);
      respondPayload(newPsychologist.id, res);
    } catch (err) {
      next(err);
    }
    return undefined;
  },
);

/** Route     GET api/psychologists
 * Desc      Get psychologists data.
 * Access    Private
 */
router.get('/', auth, async (req, res, next) => {
  try {
    if (!req.psychologist) return res.status(401).json({ msg: 'Not authorized' });

    const psychologist = await Psychologists.findById(req.psychologist.id).select('-password').populate('cases').exec();
    res.json(psychologist);
  } catch (err) {
    next(err);
  }
  return undefined;
});

/** Route     POST api/psychologists/login
 * Desc      Authenticate psychologist and get token
 * Access    Public
 */
router.post('/login', async (req, res, next) => {
  try {
    const { password, email } = req.body;

    const psychologist = await Psychologists.findOne({ email });
    if (!psychologist) return res.status(401).json({ msg: 'Not authorized' });

    const isMatch = await bcrypt.compare(password, psychologist.password);
    if (!isMatch) return res.status(401).json({ msg: 'Not authorized' });

    respondPayload(psychologist.id, res);
  } catch (err) {
    next(err);
  }
  return undefined;
});

module.exports = router;
