import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
      setDark(true)
    } else {
      document.documentElement.classList.remove('dark')
      setDark(false)
    }
  }, [])

  function toggleTheme() {
    if (dark) {
      document.documentElement.classList.remove('dark')
      localStorage.theme = 'light'
      setDark(false)
    } else {
      document.documentElement.classList.add('dark')
      localStorage.theme = 'dark'
      setDark(true)
    }
  }

  return (
    <button
      onClick={toggleTheme}
      className="px-3 py-1 text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
    >
      {dark ? '🌙 Dark' : '☀️ Light'}
    </button>
  )
}
