'use client'

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

interface ToastProps {
  message: string
  duration?: number
  onClose: () => void
}

export default function Toast({ message, duration = 3000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 300)
    }, duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <div className={`fixed top-24 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
      <div className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3">
        <span className="font-medium">{message}</span>
        <button onClick={() => { setIsVisible(false); setTimeout(onClose, 300) }} className="p-1 hover:bg-blue-700 rounded transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
