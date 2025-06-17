'use client'

import { useEffect, useState } from 'react'

interface Message {
  sender: string
  receiver: string
  content: string
  timestamp: string
}

interface ChatBoxProps {
  userId: string
  otherUserId: string
}

export default function ChatBox({ userId, otherUserId }: ChatBoxProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')

  const fetchMessages = async () => {
    try {
      const res = await fetch(`/api/messages/${userId}/${otherUserId}`)
      const data = await res.json()
      setMessages(data)
    } catch (err) {
      console.error('Error cargando mensajes', err)
    }
  }

  const sendMessage = async () => {
    if (!newMessage.trim()) return

    const messageData = {
      sender: userId,
      receiver: otherUserId,
      content: newMessage,
    }

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(messageData),
      })

      if (res.ok) {
        setNewMessage('')
        fetchMessages()
      }
    } catch (err) {
      console.error('Error enviando mensaje', err)
    }
  }

  useEffect(() => {
    fetchMessages()
    const interval = setInterval(fetchMessages, 5000) // actualizar cada 5 segundos
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="border rounded-md p-4 max-w-md mx-auto space-y-2">
      <h2 className="font-semibold text-lg">Chat con el vendedor</h2>
      <div className="h-64 overflow-y-auto border p-2 bg-gray-50 rounded">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-2 ${msg.sender === userId ? 'text-right' : 'text-left'}`}>
            <span className="inline-block bg-blue-200 rounded px-2 py-1">
              {msg.content}
            </span>
          </div>
        ))}
      </div>
      <div className="flex space-x-2">
        <input
          type="text"
          className="flex-grow border rounded p-2"
          placeholder="Escribe tu mensaje..."
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Enviar
        </button>
      </div>
    </div>
  )
}