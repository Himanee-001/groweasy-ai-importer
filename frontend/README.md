T# GrowEasy AI CSV Importer

## Overview

GrowEasy AI CSV Importer is a full-stack AI-powered web application that enables users to upload CSV files, preview the data, and automatically extract structured CRM leads using the Groq LLM API. The application validates uploaded files, displays import summaries, and separates imported and skipped records for better data management.

## Features

- Upload CSV files
- Drag & Drop CSV upload
- CSV Preview
- AI-powered CRM field extraction
- Import summary
- Imported and skipped records table
- Toast notifications
- Responsive UI
- Loading indicator during processing

## Tech Stack


### Frontend
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- React Hot Toast
- PapaParse

### Backend
- Node.js
- Express.js
- Multer
- Groq API (Llama 3.3 70B)

## Requirements

- Node.js 18+
- npm
- Groq API Key

## Project Structure

```
groweasy-ai-importer/
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── services/
│   └── types/
│
└── backend/
    ├── controllers/
    ├── routes/
    ├── services/
    ├── utils/
    └── server.js
```

## Installation

### Clone Repository

```bash
git clone https://github.com/Himanee-001//groweasy-ai-importer.git
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Runs on:

```
http://localhost:3000
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

Runs on:

```
http://localhost:5000
```

## Environment Variables

Create a `.env` file inside the backend folder.

Example:

```env
GROQ_API_KEY=your_api_key
PORT=5000
```

## API Endpoint

```
POST /upload/process
```

Accepts:

- multipart/form-data
- CSV file

Returns:

- Imported Records
- Skipped Records
- Summary

## Screenshots

(Add screenshots here after deployment)

## Future Improvements

- User Authentication
- Database Integration
- Export Processed Data
- Duplicate Lead Detection
- AI Prompt Customization
- Dark Mode Support
- Bulk File Upload

## Author

Himanee Mahajan

Computer Engineering Student

## License

This project is developed for the GrowEasy AI Internship Assignment.

## Live Demo

Frontend:
https://groweasy-ai-importer-pi.vercel.app

Backend:
https://groweasy-ai-importer-1-cggf.onrender.com


## GitHub Repository

https://github.com/Himanee-001/groweasy-ai-importer

