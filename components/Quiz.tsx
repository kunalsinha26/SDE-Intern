import { useEffect, useState, useRef } from 'react'
import QuestionCard from './QuestionCard'
import decodeHtml from '../utils/decodeHtml'
import { motion } from 'framer-motion'
import OverviewPanel from './OverviewPanel'
import Report from './Report'

type TriviaQ = {
  category: string
  type: string
  difficulty: string
  question: string
  correct_answer: string
  incorrect_answers: string[]
}

type Props = {
  email: string
  onExit: () => void
}

const STORAGE_KEY = 'trivia_state_v2'
const QUIZ_DURATION = 30 * 60 // 30 minutes in seconds

export default function Quiz({ email, onExit }: Props) {
  const [questions, setQuestions] = useState<TriviaQ[] | null>(null)
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<(string | null)[]>([])
  const [visited, setVisited] = useState<boolean[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [startedAt, setStartedAt] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(QUIZ_DURATION)
  const timerRef = useRef<number | null>(null)

  // Load saved state
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (parsed.email === email) {
          setStartedAt(parsed.startedAt ?? null)
          setAnswers(parsed.answers ?? [])
          setVisited(parsed.visited ?? [])
          setCurrent(parsed.current ?? 0)
          setSubmitted(parsed.submitted ?? false)
        }
      } catch {
        // ignore
      }
    }
  }, [email])

  // Fetch questions
  useEffect(() => {
    let cancelled = false
    async function fetchQ() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch('/api/trivia')
        if (!res.ok) throw new Error('Failed to fetch questions')
        const body = await res.json()
        if (!Array.isArray(body.results)) throw new Error('Invalid response format')
        if (cancelled) return

        setQuestions(body.results)
        // initialize arrays
        setAnswers(prev =>
          prev && prev.length === body.results.length
            ? prev
            : Array(body.results.length).fill(null)
        )
        setVisited(prev =>
          prev && prev.length === body.results.length
            ? prev
            : Array(body.results.length).fill(false)
        )

        if (!startedAt) {
          const now = Date.now()
          setStartedAt(now)
          localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({
              email,
              startedAt: now,
              answers: Array(body.results.length).fill(null),
              visited: Array(body.results.length).fill(false),
              current: 0,
              submitted: false
            })
          )
        }
      } catch (err: any) {
        setError(err.message || 'Unknown error')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    if (!questions) fetchQ()
    return () => {
      cancelled = true
    }
  }, [questions, startedAt, email])

  // Timer logic (null-safe)
  useEffect(() => {
    if (submitted) return

    function tick() {
      if (typeof startedAt !== 'number') return
      const elapsed = Math.floor((Date.now() - startedAt) / 1000)
      const left = Math.max(0, QUIZ_DURATION - elapsed)
      setTimeLeft(left)
      if (left <= 0) {
        submitQuiz()
      }
    }

    if (typeof startedAt === 'number') {
      tick()
      timerRef.current = window.setInterval(tick, 1000)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startedAt, submitted])

  // persist state
  useEffect(() => {
    if (!questions || typeof startedAt !== 'number') return
    const payload = { email, startedAt, answers, visited, current, submitted }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  }, [answers, visited, current, submitted, questions, startedAt, email])

  function handleVisit(idx: number) {
    setCurrent(idx)
    setVisited(v => {
      const copy = [...v]
      copy[idx] = true
      return copy
    })
  }

  function handleSelect(choice: string) {
    setAnswers(a => {
      const copy = [...a]
      copy[current] = choice
      return copy
    })
    setVisited(v => {
      const copy = [...v]
      copy[current] = true
      return copy
    })
  }

  function submitQuiz() {
    if (!questions) return
    setSubmitted(true)
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    const payload = { email, startedAt, answers, visited, current, submitted: true }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  }

  function resetQuiz() {
    setSubmitted(false)
    setAnswers(Array((questions ?? []).length).fill(null))
    setVisited(Array((questions ?? []).length).fill(false))
    setCurrent(0)
    const now = Date.now()
    setStartedAt(now)
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        email,
        startedAt: now,
        answers: Array((questions ?? []).length).fill(null),
        visited: Array((questions ?? []).length).fill(false),
        current: 0,
        submitted: false
      })
    )
  }

  if (loading) return <div className="p-6">Loading questions...</div>
  if (error)
    return (
      <div className="p-6 text-red-600">
        Error: {error}.{' '}
        <button onClick={() => location.reload()} className="underline">
          Retry
        </button>
      </div>
    )
  if (!questions) return <div className="p-6">No questions available.</div>

  const total = questions.length
  const score = answers.reduce(
    (acc, a, i) =>
      a && decodeHtml(a) === decodeHtml(questions[i].correct_answer) ? acc + 1 : acc,
    0
  )

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4">
        <Report
          questions={questions}
          answers={answers}
          score={score}
          onPlayAgain={resetQuiz}
          onExit={onExit}
          email={email}
          timeTaken={QUIZ_DURATION - timeLeft}
        />
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="p-4">
      <div className="flex justify-between items-center mb-3">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Question {current + 1} / {total}
        </div>
        <div className="text-sm">
          <span className="font-medium mr-2">Score: {score}</span>
          <span className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-sm">
            {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
          </span>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <QuestionCard
            key={current}
            question={questions[current]}
            selected={answers[current] ?? null}
            onSelect={c => handleSelect(c)}
          />
          <div className="flex justify-between mt-3">
            <button
              onClick={() => handleVisit(Math.max(0, current - 1))}
              className="px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded"
            >
              Previous
            </button>
            <div className="space-x-2">
              <button
                onClick={() => handleVisit(Math.min(total - 1, current + 1))}
                className="px-3 py-2 bg-blue-600 text-white rounded"
              >
                Next
              </button>
              <button onClick={submitQuiz} className="px-3 py-2 bg-red-600 text-white rounded">
                Submit Quiz
              </button>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-72">
          <OverviewPanel
            total={total}
            current={current}
            visited={visited}
            answers={answers}
            onJump={handleVisit}
          />
        </div>
      </div>
    </motion.div>
  )
}
