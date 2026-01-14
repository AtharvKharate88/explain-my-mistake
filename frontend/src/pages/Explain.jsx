import axiosInstance from "../utils/axiosInstance";
import React, { useState } from "react";
import { authHeader } from "../utils/authHeader";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Select } from "../components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";

export default function Explain() {
  const [content, setContent] = useState("");
  const [type, setType] = useState("code");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const saved = localStorage.getItem("lastExplanation");
  const [result, setResult] = useState(
    saved
      ? JSON.parse(saved)
      : { whatIsWrong: "", correctApproach: "", mentalModel: "" }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content || !type) {
      setError("All fields required");
      return;
    }

    const token = localStorage.getItem("accessToken");
    if (!token) {
      setError("Please login to use this feature");
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
        setError("Failed to get explanation. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="container mx-auto max-w-4xl py-8">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Explain My Mistake</CardTitle>
            <CardDescription>
              Paste your code, theory, or logic issue and get a detailed explanation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="content" className="text-sm font-medium">
                  Your Code / Logic / Theory
                </label>
                <Textarea
                  id="content"
                  placeholder="Paste your wrong code, logic, or theory question here..."
                  rows="8"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="font-mono text-sm"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="type" className="text-sm font-medium">
                  Type
                </label>
                <Select
                  id="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="code">Code</option>
                  <option value="theory">Theory</option>
                  <option value="logic">Logic</option>
                </Select>
              </div>

              {error && (
                <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md border border-destructive/20">
                  {error}
                </div>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Analyzing..." : "Get Explanation"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {result.whatIsWrong && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-destructive">What's Wrong</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
                  {result.whatIsWrong}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-primary">Correct Approach</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
                  {result.correctApproach}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-indigo-600">Mental Model</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
                  {result.mentalModel}
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {!result.whatIsWrong && !loading && (
          <Card>
            <CardContent className="py-12">
              <p className="text-center text-muted-foreground">
                Submit your content above to see the explanation.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
