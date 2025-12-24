import axiosInstance from "../utils/axiosInstance";
import React, { useEffect, useState } from "react";
import { authHeader } from "../utils/authHeader";

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axiosInstance
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
    <div className="page-container fade-in">
      <h1>Your History</h1>
      <p className="text-center text-muted" style={{ marginBottom: "2rem" }}>
        View all your previous explanations and learning sessions
      </p>

      {history.length === 0 ? (
        <div className="card empty-state">
          <p>No history yet. Start explaining your mistakes to see them here!</p>
        </div>
      ) : (
        <div>
          {history.map((item) => (
            <div key={item._id} className="history-item fade-in">
              <p>
                <strong>Type:</strong> <span style={{ textTransform: "capitalize" }}>{item.type}</span>
              </p>
              <p>
                <strong>Content:</strong> {item.content.length > 200 
                  ? `${item.content.substring(0, 200)}...` 
                  : item.content}
              </p>
              <p>
                <strong>Date:</strong> {new Date(item.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
