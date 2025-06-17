'use client'

import { useEffect, useState } from 'react'

export default function FeedbackList({ userId }: { userId: string }) {
  const [feedbacks, setFeedbacks] = useState<any[]>([])

  useEffect(() => {
    fetch(`/api/feedback/user/${userId}`)
      .then(res => res.json())
      .then(setFeedbacks)
  }, [userId])

  return (
    <div className="bg-white shadow rounded p-4 space-y-3 mt-4">
      <h2 className="text-xl font-bold">📝 Feedback recibido</h2>
      {feedbacks.length === 0 ? (
        <p>No tienes feedback aún.</p>
      ) : (
        feedbacks.map((fb, idx) => (
          <div key={idx} className="border p-2 rounded">
            <p className="text-sm text-gray-700">🗣️ {fb.comment}</p>
            <p className="text-yellow-600">⭐ {fb.rating} / 5</p>
          </div>
        ))
      )}
    </div>
  )
}