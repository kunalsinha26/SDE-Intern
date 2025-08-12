import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const resp = await fetch('https://opentdb.com/api.php?amount=15')
    if (!resp.ok) return res.status(502).json({ error: 'Upstream API error' })
    const data = await resp.json()
    // Basic validation
    if (!data || typeof data !== 'object' || !Array.isArray(data.results)) {
      return res.status(502).json({ error: 'Malformed upstream response' })
    }
    // Return sanitized minimal fields
    const results = data.results.map((q: any) => ({
      category: q.category,
      type: q.type,
      difficulty: q.difficulty,
      question: q.question,
      correct_answer: q.correct_answer,
      incorrect_answers: q.incorrect_answers
    }))
    res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=59')
    return res.status(200).json({ results })
  } catch (err) {
    return res.status(500).json({ error: 'Server error', detail: String(err) })
  }
}
