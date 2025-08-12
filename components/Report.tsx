import React from 'react'
import decodeHtml from '../utils/decodeHtml'

export default function Report({ questions, answers, score, onPlayAgain, onExit, email, timeTaken }:
  { questions: any[], answers: (string|null)[], score: number, onPlayAgain: ()=>void, onExit: ()=>void, email: string, timeTaken: number }) {

  return (
    <div className="p-2">
      <h2 className="text-xl font-semibold">Quiz Report</h2>
      <div className="text-sm text-gray-500 dark:text-gray-400">Email: {email} • Score: {score} / {questions.length} • Time taken: {Math.floor(timeTaken/60)}:{String(timeTaken%60).padStart(2,'0')}</div>
      <div className="mt-4 space-x-2">
        <button onClick={onPlayAgain} className="px-3 py-2 bg-green-600 text-white rounded">Play Again</button>
        <button onClick={onExit} className="px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded">Exit</button>
      </div>

      <div className="mt-4 space-y-3">
        {questions.map((q, i) => {
          const user = answers[i] ?? '(No answer)'
          const correct = q.correct_answer
          const isCorrect = user !== null && decodeHtml(user) === decodeHtml(correct)
          return (
            <div key={i} className="border rounded p-3 bg-white dark:bg-gray-800">
              <div className="text-sm text-gray-500 dark:text-gray-400">Question {i+1} • {q.category} • {q.difficulty}</div>
              <div className="font-medium my-2">{decodeHtml(q.question)}</div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-xs text-gray-500">Your answer</div>
                  <div className={isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}>{user === null ? '(No answer)' : decodeHtml(user)}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Correct answer</div>
                  <div className="text-gray-800 dark:text-gray-200">{decodeHtml(correct)}</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
