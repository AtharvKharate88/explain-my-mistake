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
      })
      .catch(() => {
        setError("explain failed")
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <h1>Explain my mistake</h1>

      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Paste your wrong code / logic here"
          rows="6"
          cols="60"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <br />

        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="code">Code</option>
          <option value="theory">Theory</option>
          <option value="logic">Logic</option>
        </select>

        <br /><br />

        <button type="submit" disabled={loading}>{loading ? "Explaining..." : "Explain"}</button>
        {error && <p style={{color:"red"}}>{error}</p>}
      </form>

      <hr />

      {!result.whatIsWrong ? (
        <p>Submit content to see explanation.</p>
    ) : (
    <>
    <section>
      <h3>What is wrong</h3>
      <p>{result.whatIsWrong}</p>
    </section>

    <section>
      <h3>Correct approach</h3>
      <p>{result.correctApproach}</p>
    </section>

    <section>
      <h3>Mental model</h3>
      <p>{result.mentalModel}</p>
    </section>
  </>
)}

    </div>
  );
}
