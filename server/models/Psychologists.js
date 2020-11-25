const mongoose = require('mongoose');

const psychologistSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    lastLogin: { type: Date },
    workingStatus: { type: String, enum: ['active', 'inactive', 'onVacation', 'deactivated'] },
    cases: [{ type: mongoose.Schema.Types.ObjectId, ref: 'cases' }],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('psychologists', psychologistSchema);
