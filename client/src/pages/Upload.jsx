import {useState} from 'react'

const Upload = () => {

   const [formData, setFormData] = useState({
    title: "",
    details: "",
    datetime: "",
    location: "",
  });
   
   const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

   const handleSubmit = async (e) => {
  e.preventDefault();
  setStatus("Submitting...");

  try {
    const response = await fetch("http://localhost:8000/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      setStatus("✅ Submitted successfully!");
      setFormData({ title: "", details: "", datetime: "", location: "" });
      console.log("Server response:", data);
    } else {
      setStatus(`❌ Error: ${data.error || "Submission failed"}`);
    }
  } catch (error) {
    console.error(error);
    setStatus("⚠️ Cannot connect to server.");
  }
};


  return (
    <div className='flex flex-col items-center'>
    <div className='flex flex-col items-center gap-2 mb-5'>
         <p className='font-[Frijole]'>From the other side</p>
       <h1 className='font-[Frijole] text-4xl'>ADD SIGHTING</h1>
    </div>
    <div className='flex justify-center w-full max-w-[900px]'>
        <div className="bg-[#2c2a2a] text-white p-8 rounded-2xl w-full mx-auto shadow-2xl mb-4">
      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
        {/* LEFT COLUMN */}
        <div className="space-y-4">
          {/* Title */}
          <div>
            <label className="block mb-1 font-semibold text-gray-200">
              Title:
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="A ghostly encounter"
              className="w-full p-3 rounded-md bg-white text-black border  border-gray-600 focus:outline-none focus:border-blue-400"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block mb-1 font-semibold text-gray-200">
              Location:
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="bengaluru, karnataka"
              className="w-full p-3 rounded-md bg-white text-black border border-gray-600 focus:outline-none focus:border-blue-400"
              required
            />
          </div>

          {/* Time/Date */}
          <div>
            <label className="block mb-1 font-semibold text-gray-200">
              Time/Date:
            </label>
            <input
              type="datetime-local"
              name="datetime"
              value={formData.datetime}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-white text-black border border-gray-600 focus:outline-none focus:border-blue-400"
              required
            />
          </div>
        </div>

        {/* RIGHT COLUMN (Details textarea) */}
        <div>
          <label className="block mb-1 font-semibold text-gray-200">
            Details:
          </label>
          <textarea
            name="details"
            value={formData.details}
            onChange={handleChange}
            placeholder="I was trying to get to sleep when..."
            rows="9"
            className="w-full h-full p-3 rounded-md bg-white text-black border border-gray-600 focus:outline-none focus:border-blue-400 resize-none"
            required
          />
        </div>

        {/* SUBMIT BUTTON — full width */}
        <div className="md:col-span-2 mt-4">
          <button
            type="submit"
            className="w-full py-3 border border-gray-400 rounded-md font-bold text-white hover:bg-gray-700 transition"
          >
            SUBMIT
          </button>
        </div>
      </form>

      {/* STATUS MESSAGE */}
      {status && (
        <p className="text-center mt-4 text-sm text-gray-300">{status}</p>
      )}

      <p className="text-center text-gray-400 mt-6 text-sm">
        All sightings will be published on our{" "}
        <a href="/read" className="underline hover:text-white">
          sightings
        </a>{" "}
        page.
      </p>
    </div>

    </div>
      
    </div>
  )
}

export default Upload