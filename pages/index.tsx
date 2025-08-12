import Head from 'next/head'
import { useEffect, useState } from 'react'
import ThemeToggle from '../components/ThemeToggle'
import Quiz from '../components/Quiz'

export default function Home() {
  const [started, setStarted] = useState(false)
  const [email, setEmail] = useState('')

  useEffect(() => {
    const savedEmail = localStorage.getItem('trivia_email')
    if (savedEmail) setEmail(savedEmail)
  }, [])

  function startQuiz() {
    if (!email || !/^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(email)) {
      alert('Please enter a valid email address to start the quiz.')
      return
    }
    localStorage.setItem('trivia_email', email)
    setStarted(true)
  }

  return (
    <>
      <Head>
        <title>Trivia Quiz - SDE Intern Assignment</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-2xl font-semibold">Trivia Quiz</h1>
            <ThemeToggle />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Please enter your email to start the quiz. There are 15 questions and a 30-minute timer. Progress is saved locally.</p>

          {!started ? (
            <div className="grid gap-3 sm:grid-cols-2 items-center">
              <input value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="px-4 py-2 rounded-md border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none"
              />
              <div className="space-x-2">
                <button onClick={startQuiz} className="px-4 py-2 bg-blue-600 text-white rounded-md">Start Quiz</button>
                <button onClick={() => { setEmail(''); localStorage.removeItem('trivia_email') }} className="px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded-md">Clear</button>
              </div>
            </div>
          ) : (
            <Quiz email={email} onExit={() => setStarted(false)} />
          )}
        </div>
      </div>
    </>
  )
}
