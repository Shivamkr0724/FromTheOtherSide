// models/Encounter.js
import mongoose from "mongoose";

const encounterSchema = new mongoose.Schema({
  location: { type: String, required: true },
  timeStamp: { type: String, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
});

export const Encounter = mongoose.model("Encounter", encounterSchema);
