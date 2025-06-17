'use client'

import { useEffect, useState } from 'react'

interface Bid {
  user: string
  amount: number
  timestamp: string
}

interface Auction {
  _id: string
  productId: string
  startingPrice: number
  currentBid: number
  currentWinner?: string
  endsAt: string
  bids: Bid[]
}

export default function AuctionDetailPage({ params }: { params: { id: string } }) {
  const [auction, setAuction] = useState<Auction | null>(null)
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [timeLeft, setTimeLeft] = useState('')

  // Obtener datos de la subasta
  useEffect(() => {
    const fetchAuction = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/auctions/${params.id}`)
        if (!res.ok) throw new Error('No se pudo obtener la subasta')
        const data = await res.json()
        setAuction(data)
        updateCountdown(data.endsAt)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchAuction()
    const interval = setInterval(() => {
      if (auction) updateCountdown(auction.endsAt)
    }, 1000)

    return () => clearInterval(interval)
  }, [params.id, auction?.endsAt])

  const updateCountdown = (end: string) => {
    const endTime = new Date(end).getTime()
    const now = new Date().getTime()
    const diff = endTime - now

    if (diff <= 0) {
      setTimeLeft('⏱ Finalizada')
    } else {
      const minutes = Math.floor(diff / 60000)
      const seconds = Math.floor((diff % 60000) / 1000)
      setTimeLeft(`${minutes}m ${seconds}s`)
    }
  }

  const handleBid = async () => {
    setError(null)
    setSuccess(null)

    if (!amount || isNaN(+amount)) {
      setError('Ingrese una puja válida')
      return
    }

    try {
      const res = await fetch(`http://localhost:4000/api/auctions/${params.id}/bid`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: +amount, user: 'usuario_demo' })
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Error al pujar')
      } else {
        setSuccess('✅ Puja realizada con éxito')
        setAuction(data)
        setAmount('')
      }
    } catch (err: any) {
      setError('Error al conectarse con el servidor')
    }
  }

  if (loading) return <p className="p-4">🔄 Cargando subasta...</p>
  if (error) return <p className="p-4 text-red-600">❌ Error: {error}</p>
  if (!auction) return <p className="p-4">⚠️ Subasta no encontrada</p>

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">📦 Subasta del Producto</h1>
      <p><strong>Precio inicial:</strong> ${auction.startingPrice}</p>
      <p><strong>Oferta actual:</strong> ${auction.currentBid}</p>
      <p><strong>Ganador actual:</strong> {auction.currentWinner || 'Sin pujas'}</p>
      <p><strong>Tiempo restante:</strong> {timeLeft}</p>

      <div className="mt-4">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Ingresa tu puja"
          className="border p-2 rounded mr-2"
        />
        <button
          onClick={handleBid}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Enviar puja
        </button>
      </div>

      {success && <p className="text-green-600 mt-2">{success}</p>}
      {error && <p className="text-red-600 mt-2">{error}</p>}

      <h2 className="text-xl font-semibold mt-6">Historial de pujas:</h2>
      <ul className="mt-2">
        {auction.bids.map((bid, i) => (
          <li key={i} className="border-b py-1 text-sm">
            💰 ${bid.amount} por {bid.user} — {new Date(bid.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  )
}