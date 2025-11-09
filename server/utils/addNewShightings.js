// utils/addNewShightings.js
import { Encounter } from "../models/Encounter.js";

export async function addNewShighting(newShighting) {
  try {
    console.log("🧾 Data received in addNewShighting:");
    console.dir(newShighting, { depth: null });

    // 🧩 Map frontend field names to backend schema fields
    const mappedData = {
      location: newShighting.location,
      timeStamp: newShighting.datetime, // frontend sends "datetime"
      title: newShighting.title,
      text: newShighting.details, // frontend sends "details"
    };


    const encounter = new Encounter(mappedData);
    await encounter.save();

    console.log("✅ New encounter saved to MongoDB:", encounter.title);
    return encounter;
  } catch (err) {
    console.error("❌ Failed to save encounter:", err.message);
    throw new Error(err.message);
  }
}
