'use client'

import { useEffect, useState } from 'react'

export default function AuctionTimer({ endTime }: { endTime: string }) {
  const calculateTimeLeft = () => {
    const difference = new Date(endTime).getTime() - Date.now()

    if (difference <= 0) return null

    return {
      hours: Math.floor(difference / (1000 * 60 * 60)),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    }
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    if (!timeLeft) return

    const timer = setInterval(() => {
      const updated = calculateTimeLeft()
      setTimeLeft(updated)
      if (!updated) clearInterval(timer)
    }, 1000)

    return () => clearInterval(timer)
  }, [endTime])

  return (
    <div className="text-red-600 font-bold text-center">
      {timeLeft
        ? `${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s restantes`
        : 'Subasta finalizada'}
    </div>
  )
}