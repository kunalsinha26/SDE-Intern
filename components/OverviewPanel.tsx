import React from 'react'

export default function OverviewPanel({ total, current, visited, answers, onJump }:
  { total: number, current: number, visited: boolean[], answers: (string|null)[], onJump: (i:number)=>void }) {

  return (
    <div className="border rounded-lg p-3 bg-white dark:bg-gray-800">
      <div className="text-sm font-medium mb-2">Overview</div>
      <div className="grid grid-cols-5 gap-2">
        {Array.from({length: total}).map((_, i) => {
          const isCurrent = i === current
          const isVisited = visited[i]
          const isAttempted = !!answers[i]
          let classes = 'text-xs py-2 rounded-md border flex items-center justify-center cursor-pointer '
          if (isCurrent) classes += 'bg-blue-600 text-white border-blue-600'
          else if (isAttempted) classes += 'bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 border-green-300'
          else if (isVisited) classes += 'bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-100 border-yellow-300'
          else classes += 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-600'
          return <button key={i} className={classes} onClick={() => onJump(i)}>{i+1}</button>
        })}
      </div>
      <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
        <div><span className="inline-block w-3 h-3 bg-blue-600 mr-1 align-middle"></span> Current</div>
        <div><span className="inline-block w-3 h-3 bg-green-100 mr-1 align-middle"></span> Attempted</div>
        <div><span className="inline-block w-3 h-3 bg-yellow-100 mr-1 align-middle"></span> Visited</div>
      </div>
    </div>
  )
}
