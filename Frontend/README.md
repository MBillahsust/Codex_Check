# WellSpring - Mental Health Platform

A comprehensive mental health platform built with React that provides mental health assessments, resources, and support.

<br>

___

<br>

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

<br>

___

<br>

## Project Structure

```
Frontend/
├── public/
│   ├── index.html
│   └── assets/
├── src/
│   ├── components/
│   │   ├── Assessment/
│   │   │   ├── AnxietyAssessment.js
│   │   │   ├── DepressionAssessment.js
│   │   │   ├── OCDAssessment.js
│   │   │   ├── PanicDisorderAssessment.js
│   │   │   ├── PTSDAssessment.js
│   │   │   ├── SocialAnxietyAssessment.js
│   │   │   └── StressAssessment.js
│   │   ├── Auth/
│   │   │   ├── Login.js
│   │   │   └── Register.js
│   │   ├── Dashboard/
│   │   │   └── Dashboard.js
│   │   └── Layout/
│   │       ├── Footer.js
│   │       └── Header.js
│   ├── pages/
│   │   ├── Home/
│   │   │   ├── Home.js
│   │   │   └── Home.css
│   │   └── HeaderPages/
│   │       ├── About.js
│   │       ├── Conditions.js
│   │       ├── Contact.js
│   │       ├── Hotlines.js
│   │       ├── Privacy.js
│   │       ├── ResearchDevelopment.js
│   │       ├── Resources.js
│   │       └── Terms.js
│   ├── Allcss/
│   │   ├── Assessment/
│   │   │   └── Assessment.css
│   │   └── HeaderPages/
│   │       ├── About.css
│   │       ├── Conditions.css
│   │       ├── Contact.css
│   │       ├── Hotlines.css
│   │       ├── Privacy.css
│   │       ├── ResearchDevelopment.css
│   │       ├── Resources.css
│   │       └── Terms.css
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

<br>

___

<br>

## Installation

1. Clone the repository:
```bash
git clone https://github.com/MBillahsust/WellSpring.git
```

2. Navigate to the Frontend directory:
```bash
cd Frontend
```

3. Install dependencies:
```bash
npm install
```

4. Create a `.env` file in the `Frontend` directory and add your Gemini API key:
```bash
REACT_APP_GEMINI_API_KEY=your_api_key_here
```
The `.env` file is already listed in `.gitignore` so it will not be committed to version control.

## Running the Application

To start the development server:
```bash
npm start
```

The application will open in your default browser at `http://localhost:3000`.

<br>

___

<br>

## Features

- Mental Health Assessments
  - Anxiety Assessment
  - Depression Assessment
  - OCD Assessment
  - Panic Disorder Assessment
  - PTSD Assessment
  - Social Anxiety Assessment
  - Stress Assessment
- User Authentication
- Dashboard
- Resources and Hotlines
- Research & Development Section
- Responsive Design

<br>

___

<br>

## Technologies Used

- React.js
- Framer Motion (for animations)
- Tailwind CSS
- React Router
- Context API


<br>

___

<br>

## Voice Interaction

The counsellor bot now supports speech recognition and speech synthesis for hands-free conversations. Tap the microphone icon to record and automatically send your message. Each reply from the bot includes a speaker button so you can replay it aloud. Use the volume icon above the chat to toggle automatic text-to-speech for new responses.

