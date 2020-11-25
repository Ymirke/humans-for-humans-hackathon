const mongoose = require('mongoose');

const casesSchema = new mongoose.Schema(
  {
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'patients', required: true },
    psychologistId: { type: mongoose.Schema.Types.ObjectId, ref: 'psychologists' },
    issue: { type: String, required: true },
    closed: { type: Boolean, default: false },
    messages: [
      {
        text: { type: String, required: true },
        respondent: { type: String, enum: ['patient', 'psychologist'] },
        respondentId: { type: mongoose.Schema.Types.ObjectId },
        respondentName: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    notes: [
      {
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('cases', casesSchema);
