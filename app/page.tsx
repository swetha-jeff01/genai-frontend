"use client";

import { useState } from "react";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [tweet, setTweet] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic) return;

    setIsLoading(true);
    setTweet("");
    setImageUrl("");

    try {
      // Pointing directly to your live Render backend
      const response = await fetch("https://genai-backend-7.onrender.com/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: topic }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setTweet(data.result);
        setImageUrl(data.image);
      } else {
        setTweet("Oops! Something went wrong: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Error fetching generated content:", error);
      setTweet("Failed to connect to the server. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center py-20 px-4 font-sans">
      
      {/* Header Section */}
      <div className="flex flex-col items-center text-center mb-12">
        <span className="bg-green-900/30 text-green-500 px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-green-900/50">
          ✨ AI-Powered
        </span>
        <h1 className="text-5xl font-bold mb-4 tracking-tight">Tweet Generator</h1>
        <p className="text-zinc-400 text-lg max-w-lg">
          Enter a topic and let AI craft the perfect tweet and image for you in seconds.
        </p>
      </div>

      {/* Input Section */}
      <div className="w-full max-w-2xl flex flex-col gap-4">
        <input
          type="text"
          placeholder="Enter your topic (e.g., productivity, AI trends)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full bg-black border border-zinc-800 rounded-xl p-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleGenerate();
          }}
        />
        
        <button
          onClick={handleGenerate}
          disabled={isLoading || !topic}
          className="w-full bg-[#10a37f] hover:bg-[#0e906f] disabled:bg-zinc-800 disabled:text-zinc-500 text-white rounded-xl p-4 font-semibold transition-colors flex justify-center items-center gap-2"
        >
          {isLoading ? (
            "⏳ Generating Magic..."
          ) : (
            "✨ Generate Tweet"
          )}
        </button>
      </div>

      {/* Results Section */}
      <div className="w-full max-w-2xl mt-8">
        <div className="bg-black border border-zinc-800 rounded-xl min-h-[200px] p-6 flex flex-col items-center justify-center">
          
          {isLoading && (
            <p className="text-zinc-500 animate-pulse">
              Painting your image and writing your tweet...
            </p>
          )}

          {!isLoading && !tweet && !imageUrl && (
            <p className="text-zinc-600">Your generated tweet will appear here</p>
          )}

          {!isLoading && (tweet || imageUrl) && (
            <div className="flex flex-col w-full gap-6">
              
              {/* Display Image (With fix for broken Vercel loading) */}
              {imageUrl && (
                <div className="w-full rounded-lg overflow-hidden border border-zinc-800 bg-zinc-900 flex flex-col items-center">
                  <img 
                    src={imageUrl} 
                    alt="AI Generated" 
                    className="w-full h-auto object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => e.currentTarget.style.display = 'none'} 
                  />
                  <a 
                    href={imageUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-[#10a37f] hover:underline p-4 font-medium"
                  >
                    🖼️ Click here to view generated image
                  </a>
                </div>
              )}
              
              {/* Display Tweet text */}
              {tweet && (
                <p className="text-lg text-zinc-200 whitespace-pre-wrap leading-relaxed">
                  {tweet}
                </p>
              )}
            </div>
          )}

        </div>
      </div>

    </main>
  );
}