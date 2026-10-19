# 🎯 AI Interview Helper (MERN + AI)

An AI-powered interview preparation assistant that transforms candidate resumes, self-descriptions, and targeted job descriptions into structured, actionable interview preparation plans and insights.

The application allows candidates to upload their PDF resume, provide job specifications and a personal background summary, and leverages Groq LLMs with structured schemas to calculate match scores, detect skill gaps, produce targeted technical and behavioral interview questions with model answers, and construct customized day-wise preparation roadmaps.

## 🚀 Features

- 📄 **PDF Resume Parsing**: Automatically extracts and processes text from candidate resume PDFs.
- 🎯 **Job Fit Analysis**: Compares candidate profile and self-description against requirements in the job description.
- 📊 **Match Score Calculation**: Generates an overall candidate match score (0–100%) for the target position.
- 💡 **Technical Question Generation**: Curates role-specific technical questions accompanied by interviewer intentions and comprehensive model answers.
- 🤝 **Behavioral & Situational Prep**: Formulates behavioral interview questions with breakdown of rationale and suggested answering approaches.
- ⚠️ **Skill Gap Detection**: Pinpoints candidate knowledge gaps classified by impact severity (`low`, `medium`, `high`).
- 🗓️ **Day-by-Day Preparation Roadmap**: Builds an actionable, structured daily study plan with specific focus areas and tasks.
- 🔒 **Secure User Authentication**: Protected user accounts with JWT stored in HTTP-only cookies, password hashing with bcryptjs, and token blacklisting on logout.
- 📋 **Recent Interview History**: Saves and displays past generated reports on the dashboard for ongoing preparation.
- 💻 **Modern Responsive Frontend**: Built with React 19, React Router, Vite, and custom SCSS styling for collapsible questions and interactive roadmaps.

## 🛠️ Tech Stack

| Technology               | Purpose                                                 |
| ------------------------ | ------------------------------------------------------- |
| React 19                 | Component-based client-side user interface              |
| Vite                     | Next-generation frontend build tool and dev server      |
| React Router             | Client-side routing and protected view management       |
| SCSS / Sass              | Modular styling and responsive UI design                |
| Axios                    | HTTP requests with credential / cookie support          |
| Node.js & Express        | Backend RESTful API server                              |
| MongoDB & Mongoose       | Database for user profiles, blacklist, and reports      |
| Groq SDK                 | Ultra-fast LLM inference orchestration                  |
| GPT-OSS 120B             | Model used for intelligent report and roadmap creation  |
| Zod & Zod-to-JSON-Schema | Strict structured output schema definition & validation |
| Multer                   | Handling multipart form uploads for resume PDFs         |
| pdf-parse                | Extracting raw text from uploaded PDF resumes           |
| JSON Web Tokens (JWT)    | Stateless authentication with HTTP-only cookies         |
| bcryptjs                 | Secure password hashing                                 |

## 📁 Project Structure

```text
interview-helper-in-mern-with-rag/
│
├── Backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                 # MongoDB connection setup
│   │   ├── controllers/
│   │   │   ├── auth.controller.js      # User registration, login, logout, me
│   │   │   └── interview.controller.js # Generate and fetch interview reports
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.js      # JWT verification & blacklist check
│   │   │   └── file.middleware.js      # Multer memory storage configuration
│   │   ├── models/
│   │   │   ├── blacklist.model.js      # Blacklisted JWT tokens
│   │   │   ├── interviewReport.model.js# Structured interview report schema
│   │   │   └── user.model.js           # User schema
│   │   ├── routes/
│   │   │   ├── auth.routes.js          # Authentication endpoints
│   │   │   └── interview.routes.js     # Interview report endpoints
│   │   ├── services/
│   │   │   └── ai.service.js           # Groq LLM integration and Zod schema
│   │   └── app.js                      # Express application & middleware setup
│   ├── .gitignore
│   ├── package.json
│   └── server.js                       # Server entry point
│
├── Frontend/
│   ├── src/
│   │   ├── features/
│   │   │   ├── auth/                   # Login, Register, Auth Context & Protected Route
│   │   │   └── interview/              # Home, Interview Report, Context & Hooks
│   │   ├── routes/
│   │   │   └── app.routes.jsx          # Route definitions
│   │   ├── style/                      # Global styles and variables
│   │   ├── App.jsx                     # Root component
│   │   └── main.jsx                    # Frontend entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/frankuard/interview-helper-in-mern-with-rag.git
cd interview-helper-in-mern-with-rag
```

### 2. Backend Setup

Navigate to the `Backend` directory:

```bash
cd Backend
```

Install backend dependencies:

```bash
npm install
```

### 3. Frontend Setup

In a separate terminal, navigate to the `Frontend` directory:

```bash
cd Frontend
```

Install frontend dependencies:

```bash
npm install
```

## 🔐 Environment Variables

Create a `.env` file in the `Backend` directory:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/interview-helper
JWT_SECRET=your_jwt_secret_key_here
GROQ_API_KEY=your_groq_api_key_here
```

> **Note:** Ensure MongoDB is running locally or provide a valid MongoDB Atlas connection string in `MONGO_URI`.

## ▶️ Usage

### 1. Start the Backend Server

From the `Backend` directory:

```bash
npm run dev
```

The server will run on `http://localhost:3000` and connect to MongoDB.

### 2. Start the Frontend Client

From the `Frontend` directory:

```bash
npm run dev
```

Vite will start the client application (typically at `http://localhost:5173`).

### 3. Using the Application

1. **Sign Up / Log In**: Create an account or log in with your credentials.
2. **Input Details**:
   - Paste the target **Job Description**.
   - Upload your candidate **Resume (PDF)**.
   - Enter a brief **Self Description** highlighting your background and interests.
3. **Generate Report**: Click **Generate Interview Report** to trigger AI parsing and synthesis.
4. **Explore the Preparation Plan**:
   - **Technical Questions**: View questions, interviewer intention, and sample answers.
   - **Behavioral Questions**: Review behavioral scenarios with answering strategies.
   - **Preparation Road Map**: Step-by-step daily guide with clear actionable goals.
   - **Match Score & Skill Gaps**: Check your alignment score and prioritized skills to brush up on.

## 📡 API Overview

### Authentication Routes (`/api/auth`)

| Method | Endpoint    | Description                          | Access  |
| ------ | ----------- | ------------------------------------ | ------- |
| `POST` | `/register` | Register a new user account          | Public  |
| `POST` | `/login`    | Log in user and receive cookie token | Public  |
| `GET`  | `/logout`   | Clear session and blacklist token    | Public  |
| `GET`  | `/get-me`   | Fetch profile of logged-in user      | Private |

### Interview Routes (`/api/interview`)

| Method | Endpoint                | Description                                       | Access  |
| ------ | ----------------------- | ------------------------------------------------- | ------- |
| `POST` | `/`                     | Generate report from resume PDF & job description | Private |
| `GET`  | `/`                     | Fetch list of all reports for logged-in user      | Private |
| `GET`  | `/report/:interviewId`  | Retrieve a specific report by ID                  | Private |

## 👨💻 Author

**Roshan Karki**