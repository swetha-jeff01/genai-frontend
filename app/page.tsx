"use client";

import { useState } from "react";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [tweet, setTweet] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic) return;
    
    setIsLoading(true);
    setTweet("");

    try {
      // THIS is your live Render Backend URL!
      const response = await fetch("https://genai-backend-5.onrender.com/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });

      const data = await response.json();
      
      if (data.result) {
        setTweet(data.result);
      } else {
        setTweet("Oops! Something went wrong.");
      }
    } catch (error) {
      console.error("Error:", error);
      setTweet("Failed to connect to backend.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center pt-20 px-4 font-sans">
      <div className="max-w-2xl w-full flex flex-col items-center gap-6">
        
        <div className="text-green-500 border border-green-500/30 bg-green-500/10 px-4 py-1 rounded-full text-sm font-medium mb-4">
          ✨ AI-Powered
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-2">Tweet Generator</h1>
        <p className="text-gray-400 text-center mb-8">
          Enter a topic and let AI craft the perfect tweet for you in seconds.
        </p>

        <div className="w-full space-y-4">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter your topic (e.g., productivity, AI trends)"
            className="w-full bg-transparent border border-gray-700 rounded-xl px-4 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-green-500 transition-colors"
          />
          
          <button
            onClick={handleGenerate}
            disabled={isLoading || !topic}
            className="w-full bg-green-700 hover:bg-green-600 disabled:bg-gray-800 disabled:text-gray-500 text-white font-semibold py-4 rounded-xl transition-colors"
          >
            {isLoading ? "Generating..." : "✨ Generate Tweet"}
          </button>
        </div>

        <div className="w-full mt-8 border border-gray-800 bg-[#0a0a0a] rounded-xl p-8 min-h-[200px] flex items-center justify-center text-center relative">
          {!tweet && !isLoading ? (
            <p className="text-gray-600">Your generated tweet will appear here</p>
          ) : (
            <p className="text-lg md:text-xl text-gray-200">{tweet}</p>
          )}
        </div>

      </div>
    </div>
  );
}