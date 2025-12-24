import axiosInstance from "../utils/axiosInstance";
import React, { useState } from "react";
import { authHeader } from "../utils/authHeader";

export default function Explain() {
  const [content, setContent] = useState("");
  const [type, setType] = useState("code");
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");
  const saved = localStorage.getItem("lastExplanation");
  const [result, setResult] = useState(
    saved
      ? JSON.parse(saved)
      : { whatIsWrong: "", correctApproach: "", mentalModel: "" }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content || !type) {
        alert("All fields required");
        return;
    }

    setLoading(true);
    setError("");
    axiosInstance
      .post(
        `${import.meta.env.VITE_API_URL}/api/explain`,
        { content, type },
        {
          headers: authHeader(),
        }
      )
      .then((res) => {
        setResult(res.data.explanation.airesponse);
        localStorage.setItem("lastExplanation", JSON.stringify(res.data.explanation.airesponse));
      })
      .catch(() => {
        setError("Failed to explain. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="page-container fade-in">
      <h1>Explain My Mistake</h1>
      <p className="text-center text-muted" style={{ marginBottom: "2rem" }}>
        Get detailed explanations for your coding mistakes and learn the correct approach
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="content">Your Code or Logic</label>
          <textarea
            id="content"
            placeholder="Paste your code, theory question, or logic problem here..."
            rows="8"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="type">Type</label>
          <select 
            id="type"
            value={type} 
            onChange={(e) => setType(e.target.value)}
          >
            <option value="code">Code</option>
            <option value="theory">Theory</option>
            <option value="logic">Logic</option>
          </select>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Analyzing..." : "Explain My Mistake"}
        </button>
        {error && <div className="error-message">{error}</div>}
      </form>

      {!result.whatIsWrong ? (
        <div className="card empty-state">
          <p>👆 Submit your content above to get a detailed explanation</p>
        </div>
      ) : (
        <div className="fade-in">
          <section>
            <h3>🔍 What's Wrong</h3>
            <p>{result.whatIsWrong}</p>
          </section>

          <section>
            <h3>✅ Correct Approach</h3>
            <p>{result.correctApproach}</p>
          </section>

          <section>
            <h3>🧠 Mental Model</h3>
            <p>{result.mentalModel}</p>
          </section>
        </div>
      )}
    </div>
  );
}
