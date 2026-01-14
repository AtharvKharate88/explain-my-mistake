import axiosInstance from "../utils/axiosInstance";
import React, { useEffect, useState } from "react";
import { authHeader } from "../utils/authHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      return;
    }

    axiosInstance
      .get(`${import.meta.env.VITE_API_URL}/api/explain/history`, {
        headers: authHeader(),
      })
      .then((res) => {
        setHistory(res.data.history);
      })
      .catch(() => {
        alert("Failed to load history");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTypeBadgeColor = (type) => {
    switch (type) {
      case "code":
        return "bg-blue-100 text-blue-800";
      case "theory":
        return "bg-purple-100 text-purple-800";
      case "logic":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="container mx-auto max-w-4xl py-8">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Your History</CardTitle>
            <CardDescription>
              View all your past explanations and queries
            </CardDescription>
          </CardHeader>
        </Card>

        {loading ? (
          <Card>
            <CardContent className="py-12">
              <p className="text-center text-muted-foreground">Loading history...</p>
            </CardContent>
          </Card>
        ) : history.length === 0 ? (
          <Card>
            <CardContent className="py-12">
              <p className="text-center text-muted-foreground">
                No history found. Start by explaining your first mistake!
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {history.map((item) => (
              <Card key={item._id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mr-2 ${getTypeBadgeColor(
                          item.type
                        )}`}
                      >
                        {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                      </span>
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {formatDate(item.createdAt)}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap break-words">
                    {item.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
