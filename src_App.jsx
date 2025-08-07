import React, { useState } from "react";

function App() {
  const [prompt, setPrompt] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Replace this with the real API endpoint and payload!
  const VEO_API_URL = "https://api.veo3.ai/generate"; // placeholder!
  const VEO_API_KEY = "753d59fe06f4d5293a142a4f4ecd56d8";

  async function generateVideo() {
    setLoading(true);
    setError("");
    setVideoUrl("");
    try {
      const response = await fetch(VEO_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${VEO_API_KEY}`,
        },
        body: JSON.stringify({ prompt }),
      });
      if (!response.ok) throw new Error("Failed to generate video.");
      const data = await response.json();
      // Assume data.video_url is the link to the video file
      setVideoUrl(data.video_url);
    } catch (err) {
      setError(err.message || "Error generating video.");
    } finally {
      setLoading(false);
    }
  }

  function handleShare() {
    if (navigator.share && videoUrl) {
      navigator.share({
        title: "Check out this AI-generated video!",
        url: videoUrl,
      });
    } else {
      alert("Sharing not supported. Copy the link below!");
    }
  }

  return (
    <div style={{ maxWidth: 500, margin: "auto", padding: 16 }}>
      <h2>AI Video Generator (Veo 3)</h2>
      <input
        style={{ width: "100%", padding: 8, marginBottom: 8 }}
        type="text"
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        placeholder="Enter your idea or script..."
        disabled={loading}
      />
      <button
        onClick={generateVideo}
        disabled={loading || !prompt.trim()}
        style={{ width: "100%", padding: 8 }}
      >
        {loading ? "Generating..." : "Generate Video"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {videoUrl && (
        <div style={{ marginTop: 16 }}>
          <h4>Your AI Video:</h4>
          <video controls style={{ width: "100%" }}>
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div style={{ marginTop: 8 }}>
            <button onClick={handleShare} style={{ marginRight: 8 }}>
              Share
            </button>
            <a href={videoUrl} download>
              <button>Download</button>
            </a>
          </div>
          <div style={{ marginTop: 8 }}>
            <small>Copy link: <input value={videoUrl} readOnly style={{ width: "70%" }} /></small>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;