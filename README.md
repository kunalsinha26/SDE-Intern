# 🎯 Trivia Quiz — SDE Intern 2025 Assignment


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
- The Open Trivia DB API is always reachable (basic error handling included).  
- User emails require only format validation, no OTP verification.  
- Local storage is sufficient for persistence — no backend DB needed.

---

🚧 **Challenges & Solutions**

| Challenge                | Problem & Solution                                                                                  |
|--------------------------|---------------------------------------------------------------------------------------------------|
| **Timer resets on reload**   | Timer restarted from 30 mins on refresh. Stored `startedAt` timestamp in `localStorage` to fix.   |
| **CORS errors with API**      | Client fetch caused CORS issues. Implemented Next.js API proxy at `/api/trivia`.                   |
| **Responsive layout breaks**  | Table-based UI failed on smaller screens. Rebuilt using Flexbox + Tailwind responsive utilities.  |
| **Duplicate questions from API** | API sometimes returned duplicates. Added shuffle logic and unique keys to prevent UI glitches.      |

---

🌟 **Why This Project Stands Out**

- Full-stack in a single repository — clean, maintainable codebase with frontend & backend logic.  
- Smooth animations powered by Framer Motion for delightful UX.  
- Robust state handling allows refreshing mid-quiz without losing progress.  
- Server-side email validation — demonstrating production readiness.

---

![quiz-preview]- Images


<img width="2808" height="1333" alt="Screenshot 2025-08-12 194620" src="https://github.com/user-attachments/assets/4699de2b-c9fe-4e21-a3ad-9b383b253e5d" />
<img width="1858" height="1453" alt="Screenshot 2025-08-12 194854" src="https://github.com/user-attachments/assets/6811883d-35bc-4cf6-9e47-afb15b9465c7" />
<img width="1767" height="1441" alt="Screenshot 2025-08-12 194834" src="https://github.com/user-attachments/assets/d1db98fb-83c8-4ab1-a401-f6df5c7fca35" />
<img width="2464" height="1304" alt="Screenshot 2025-08-12 194813" src="https://github.com/user-attachments/assets/acd68716-2a3a-4dd8-b7c9-9ddaff008d38" />
<img width="2609" height="1326" alt="Screenshot 2025-08-12 194806" src="https://github.com/user-attachments/assets/d846ff70-969f-458c-b459-6a7f2a7e9168" />
<img width="2321" height="1123" alt="Screenshot 2025-08-12 194726" src="https://github.com/user-attachments/assets/546cf4ce-d7c3-4354-a5ad-f822737bcce5" />
<img width="2664" height="1318" alt="Screenshot 2025-08-12 194718" src="https://github.com/user-attachments/assets/abfc7f4d-1137-474d-b670-95b712550758" />
<img width="2743" height="1128" alt="Screenshot 2025-08-12 194706" src="https://github.com/user-attachments/assets/890ba9ee-e1a7-4cc4-97ac-b40b5a115ec0" />


---

📜 **License**

This project is licensed under the **MIT License** — see the `LICENSE` file for details.

---

📬 **Contact**

**Your Name**  
✉️ your.email@example.com  
🔗 GitHub: https://github.com/yourusername
