'use client'

import { useState } from 'react'
import { User } from 'lucide-react'
import LoginModal from './LoginModal'

export default function LoginButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
        <User className="w-5 h-5" />
        <span className="font-medium">로그인</span>
      </button>
      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
