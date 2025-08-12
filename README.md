# 🎯 Trivia Quiz — SDE Intern 2025 Assignment

![quiz-preview]

1)images/Screenshot 2025-08-12 194854.png
2)images/Screenshot 2025-08-12 194620.png
3)images/Screenshot 2025-08-12 194718.png
4)images/Screenshot 2025-08-12 194726.png
5)images/Screenshot 2025-08-12 194806.png
6)images/Screenshot 2025-08-12 194813.png
7)images/Screenshot 2025-08-12 194834.png
8)images/Screenshot 2025-08-12 194854.png




## 🌐 Live Demo
https://sdeintern-rfmkxsdjw-kunal-sinhas-projects.vercel.app

---

## 📂 Repository
https://github.com/kunalsinha26/SDE-Intern/tree/main

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

---


📌 **Assumptions**  
- The Open Trivia DB API is always reachable (handled basic error states if it’s down).  
- User emails do not require OTP verification — only basic format validation is required.  
- Local storage persistence is sufficient (no backend DB required as per instructions).  

🚀 **Challenges & Solutions**  
1. **Timer resetting on page reload**  
   - Problem: On refresh, the timer restarted from 30 mins.  
   - Solution: Stored `startedAt` timestamp in `localStorage` and calculated remaining time on reload.  

2. **CORS issues with Open Trivia DB**  
   - Problem: Direct fetch from client caused CORS errors.  
   - Solution: Proxied requests via Next.js API route (`/api/trivia`).  

3. **Maintaining responsive layout**  
   - Problem: Layout broke on smaller screens due to table-based structure.  
   - Solution: Rebuilt UI using Flexbox + Tailwind responsive classes.  

4. **Avoiding question repetition**  
   - Problem: API sometimes returned duplicate questions.  
   - Solution: Added shuffle logic + unique key assignment to prevent UI glitches.  

🎯 **Why this project stands out**  
- Full-stack single repo with both frontend and backend logic.  
- Smooth animations and a polished look with Tailwind + Framer Motion.  
- Resilient state handling — you can refresh mid-quiz without losing progress.  
- Server-side validation — shows production awareness.  

📜 **License**  
MIT License — see `LICENSE` for details.  

📬 **Contact**  
Your Name — your.email@example.com  
GitHub: https://github.com/yourusername


