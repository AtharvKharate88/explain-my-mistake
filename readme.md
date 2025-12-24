# Explain My Mistake

Explain My Mistake is a secure, production-style GenAI backend system that helps users understand **why their code, logic, or theory is wrong** instead of just giving answers.

This project focuses on **backend system design, reliability, and safety** rather than UI.

---

## Why This Project Exists

Many beginners struggle not because they lack answers, but because they don’t understand *why* something is wrong.

Most AI apps:
- Return shallow explanations
- Break silently when AI output changes
- Are unsafe, unscalable, and expensive

This project solves those problems by building a robust GenAI backend that:
- Explains mistakes in a structured way
- Handles unreliable AI output defensively
- Protects APIs from abuse
- Is designed like a real production backend

---

## What This Project Does

- Secure user signup and login
- Accepts user input (code / logic / theory)
- AI returns structured explanations:
  - What is wrong
  - Correct approach
  - Mental model
- Explanations are saved and viewable later
- System prevents abuse, logs everything, and fails safely

---

## Authentication Flow

- Users log in and receive:
  - Access Token (15 minutes)
  - Refresh Token (7 days, stored in DB)
- Access tokens are used for API requests
- When access token expires:
  - Frontend silently calls `/auth/refresh`
  - A new access token is issued
  - Original request is retried automatically
- Refresh tokens can be revoked without user impact

---

## Explain API Flow

- User submits content
- Request passes through:
  - JWT authentication
  - Rate limiting
  - Cooldown protection
  - Zod validation
- Service layer:
  - Checks cache
  - Calls AI (Gemini)
  - Parses output safely
  - Saves result to database
  - Caches response
- Structured explanation is returned

---

## AI Safety and Reliability

AI output is never trusted blindly.

Defensive strategy:
- AI is instructed to return strict JSON
- Direct JSON parsing is attempted
- JSON block extraction is used as fallback
- Requests are rejected if parsing fails

This prevents:
- Empty AI responses
- Corrupted database entries
- Silent system failures

---

## Performance Optimizations

- Content-based AI response caching
- Instant responses for duplicate requests
- Indexed MongoDB queries
- Paginated history fetching

---

## Error Handling and Logging

- Centralized global error handler
- Operational errors return clean messages
- Unknown errors return safe generic responses
- Every failure is logged with:
  - Route
  - Method
  - User ID
  - Timestamp

Logs are structured JSON, not console.log spam.

---

## Tech Stack

- Backend: Node.js, Express
- Database: MongoDB (Mongoose)
- AI: Google Gemini API
- Authentication: JWT (Access + Refresh tokens)
- Validation: Zod
- Logging: Custom structured logger
- Frontend: React
- Deployment: Render (backend), Vercel (frontend)

---

## What I Learned

- How real authentication systems work
- Why backend should never trust frontend or AI
- Designing thin controllers and service layers
- Handling unreliable AI output safely
- Importance of logging and observability
- Thinking in system flows, not just files

---

## How This Project Is Different

- Not a CRUD app
- Not a todo list
- Not UI-first
- Focused on backend reliability and system design
- Handles real-world failure cases

---

## Future Improvements

- Automated backend testing (Jest, Supertest)
- Redis-based distributed caching
- Admin analytics dashboard
- AI response quality evaluation

---

## Final Note

This project was built to understand **systems**, not just frameworks.
