'use client'

import ChatBox from '@/components/ChatBox'

export default function MessagesPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Mensajes</h1>
      <ChatBox />
    </div>
  )
}