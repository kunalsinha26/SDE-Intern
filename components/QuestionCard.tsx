import { useEffect, useState } from 'react'
import decodeHtml from '../utils/decodeHtml'

type TriviaQ = {
  category: string
  type: string
  difficulty: string
  question: string
  correct_answer: string
  incorrect_answers: string[]
}

export default function QuestionCard({ question, selected, onSelect }: { question: TriviaQ, selected: string | null, onSelect: (choice: string) => void }) {
  const [choices, setChoices] = useState<string[]>([])

  useEffect(() => {
    // build and shuffle choices
    const all = [...question.incorrect_answers, question.correct_answer].map(decodeHtml)
    // Fisher-Yates
    for (let i = all.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const tmp = all[i]; all[i] = all[j]; all[j] = tmp
    }
    setChoices(all)
  }, [question])

  return (
    <div className="border rounded-lg p-4 bg-white dark:bg-gray-800">
      <div className="text-xs text-gray-400 dark:text-gray-500 mb-1">{question.category} · {question.difficulty}</div>
      <div className="font-medium mb-4">{decodeHtml(question.question)}</div>
      <div className="grid gap-2">
        {choices.map((c) => {
          const isSelected = selected !== null && c === selected
          return (
            <button
              key={c}
              onClick={() => onSelect(c)}
              className={
                'text-left p-3 rounded-md border ' +
                (isSelected ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200')
              }
            >
              {c}
            </button>
          )
        })}
      </div>
    </div>
  )
}
