const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) return res.status(401).json({ error: 'No authorization token' });

  try {
    const decoded = jwt.verify(token, process.env.JWTSECRET);

    if (decoded.patient) {
      req.patient = decoded.patient;
    }

    if (decoded.psychologist) {
      req.psychologist = decoded.psychologist;
    }

    next();
  } catch (err) {
    next(err);
  }
  return undefined;
};
