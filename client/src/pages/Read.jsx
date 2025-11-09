import  { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";

const Read = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch stories from backend
  const fetchStories = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:8000/api");
      const data = await res.json();
      console.log(data)
      setStories(data.reverse()); // newest first
    } catch (error) {
      console.error("Failed to fetch stories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  return (
    <div className="min-h-screen text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">👻 Recent Sightings</h1>
          <button
            onClick={fetchStories}
            className="px-2 py-2 cursor-pointer rounded-lg hover:bg-black transition"
          >
             <RefreshCw className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {loading ? (
          <p className="text-gray-400 text-center">Loading stories...</p>
        ) : stories.length === 0 ? (
          <p className="text-gray-400 text-center">No sightings yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story, index) => (
              <div
                key={index}
                className="bg-[#383636] border border-gray-700 rounded-2xl p-5 shadow-md hover:shadow-lg transition"
              >
                <h2 className="text-xl font-semibold mb-1">{story.title}</h2>
                <p className="text-gray-400 text-sm mb-2">
                  📍 {story.location || "Unknown"}
                </p>
                <p className="text-gray-400 text-sm mb-3">
                  🕒 {story.timeStamp || "unknown time"}
                </p>
                <p className="text-gray-300 text-sm">{story.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Read;
