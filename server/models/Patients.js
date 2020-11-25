const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: {
      type: String, required: false, unique: true, sparse: true,
    },
    gender: { type: String, enum: ['male', 'female', 'none'] },
    lastLogin: { type: Date },
    cases: [{ type: mongoose.Schema.Types.ObjectId, ref: 'cases' }],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('patients', patientSchema);
