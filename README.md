# 🎯 Trivia Quiz — SDE Intern 2025 Assignment

![quiz-preview](screenshots/quiz-progress.png)

## 🌐 Live Demo
https://sdeintern-rfmkxsdjw-kunal-sinhas-projects.vercel.app

---

## 📂 Repository
[**GitHub Source Code**](https://github.com/yourusername/trivia-quiz-sde2025)

---

## 📜 Overview & Approach
This is a **15-question trivia quiz** application built as part of the SDE Intern 2025 assignment.  
The application is designed to be **responsive, fast, and resilient**, with **state persistence** and **server-side email validation** to mimic production-grade features.

**Approach:**
1. **Tech stack selection**: Used **Next.js** for a full-stack-in-one-repo approach, **TailwindCSS** for quick styling, and **Framer Motion** for smooth UI animations.
2. **Data fetching**: Trivia questions are fetched from Open Trivia DB through a custom Next.js API route (`/api/trivia`) to handle CORS and allow future expansion.
3. **State persistence**: Used `localStorage` to save quiz progress (questions, answers, timer) so the user can resume after refresh.
4. **Email validation**: Implemented client + server-side validation via `/api/validate-email`.
5. **UI/UX focus**: Added a dark/light toggle, animated transitions, and a progress overview panel to improve user experience.

---

## 🧩 Components Built
- **`Quiz`** — Core logic: timer, question navigation, state management.
- **`QuestionCard`** — Displays a single question with options.
- **`OverviewPanel`** — Shows all question numbers with answered/visited indicators.
- **`Report`** — Shows final score and correct/incorrect answers after submission.
- **`ThemeToggle`** — Dark/light mode switcher.
- **API routes**:
  - `/api/trivia` — Fetches and returns trivia questions.
  - `/api/validate-email` — Validates the user’s email before starting.

---

## ⚡ Setup & Installation
```bash
# Clone repository
git clone https://github.com/yourusername/trivia-quiz-sde2025
cd trivia-quiz-sde2025

# Install dependencies
npm install

# Run in development mode
npm run dev
# Visit: http://localhost:3000

# Build for production
npm run build
npm run start
