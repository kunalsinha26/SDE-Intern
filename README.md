# Trivia Quiz - SDE Intern 2025 Assignment

**Stack:** Next.js + TypeScript + TailwindCSS + Framer Motion

**Goal:** Fetch 15 trivia questions from Open Trivia DB and run a responsive quiz. Anonymous play, progress saved to localStorage.

## How to run

1. Install dependencies:
   ```
   npm install
   ```
2. Run dev server:
   ```
   npm run dev
   ```
3. Build / start:
   ```
   npm run build
   npm run start
   ```

## What I built
- `pages/api/trivia` - proxy that fetches 5 questions from OpenTDB.
- Responsive UI with question timer, score, and resume via localStorage.
- Basic error handling for network and malformed responses.
- README, clear structure, and simple tests (if desired).

## Notes on unusual errors handled
- Network failures: UI shows retry option.
- Duplicate answers / malformed HTML entities: answers are decoded and shuffled deterministically.
- Partial quiz resume: progress saved in `localStorage: trivia_state`.

Submit this ZIP or push it to GitHub and share the link.


### Assignment requirements implemented

- Start page with email collection (required by assignment).
- Fetches 15 questions from OpenTDB.
- Global 30-minute timer shown at the top and auto-submit when time expires.
- Overview panel showing visited and attempted questions with quick navigation.
- Submit button and auto-submit behavior. Report page showing each question, user's answer, and correct answer side-by-side.
- Progress saved to `localStorage` (resume on refresh).
