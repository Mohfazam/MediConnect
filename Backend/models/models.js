const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const medicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  genericName: { type: String, required: true },
  category: { type: String, required: true },
  status: { type: String, required: true },
  badEffectScore: { type: Number, required: true },
  flaggedByScore: { type: Number, required: true },
  organizations: [{ organization: String, flaggedAt: Date }],
  healthImpacts: [
    {
      type: { type: String },
      description: { type: String },
      severity: { type: String },
      evidenceLevel: { type: String },
    },
  ],
  incidents: [
    {
      occuredAt: Date,
      description: String,
      severity: Number,
      location: String,
      affectedPatients: Number,
    },
  ],
  alternatives: [{ name: String, category: String }],
  warnings: [{ content: String, source: String, issuedAt: Date }],
  recentUpdates: [{ title: String, description: String }],
  addedBy: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);
const Medication = mongoose.model("Medication", medicationSchema);

module.exports = { User, Medication };