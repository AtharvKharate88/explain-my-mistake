import axios from "axios";
import React, { useEffect, useState } from "react";
import { authHeader } from "../utils/authHeader";

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/explain/history`, {
        headers: authHeader(),
      })
      .then((res) => {
        setHistory(res.data.history);
      })
      .catch(() => {
        alert("Failed to load history");
      });
  }, []);

  return (
    <div>
      <h1>History</h1>

      {history.map((item) => (
        <div key={item._id}>
          <p><strong>Type:</strong> {item.type}</p>
          <p><strong>Content:</strong> {item.content}</p>
          <p><strong>Date:</strong> {item.createdAt}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}
