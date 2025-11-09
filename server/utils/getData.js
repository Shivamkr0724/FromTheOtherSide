// utils/getData.js
import { Encounter } from "../models/Encounter.js";

export async function getData() {
  try {
    const encounters = await Encounter.find().sort({ createdAt: -1 }); // newest first
    return encounters;
  } catch (err) {
    console.error("Error fetching encounters:", err);
    return [];
  }
}
