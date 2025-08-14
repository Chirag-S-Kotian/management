





# Simple Feedback Management System

## Description
This project is a simple feedback management system with a Node.js backend using Express and TypeScript, and a React frontend using TypeScript.

## Setup

### Backend
1. Navigate to the `backend` directory.
2. Install dependencies: `npm install`.
3. Run the server: `npx ts-node src/index.ts`.

### Frontend
1. Navigate to the `frontend` directory.
2. Install dependencies: `npm install`.
3. Run the application: `npm run dev`.

## Endpoints

- `GET /feedback`: Retrieve all feedback entries.
- `POST /feedback`: Submit new feedback (body: { name: string, feedback: string }).

## Features

- In-memory data storage.
- Optional rate limiting (1 feedback per 10 seconds).

## Additional Notes
- Ensure both backend and frontend servers are running.
- The backend runs on `http://localhost:3000` by default.

## Acknowledgments
- Express, TypeScript, React, Axios.
