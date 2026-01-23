'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { useAuth } from '@/lib/hooks/useAuth'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { signInWithKakao, signInWithGoogle } = useAuth()
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  const handleKakaoLogin = async () => {
    setLoading(true)
    try {
      await signInWithKakao()
    } catch (error) {
      console.error('Kakao login error:', error)
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setLoading(true)
    try {
      await signInWithGoogle()
    } catch (error) {
      console.error('Google login error:', error)
      setLoading(false)
    }
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="bg-gradient-to-b from-blue-50 to-white rounded-3xl shadow-2xl max-w-md w-full pointer-events-auto" onClick={(e) => e.stopPropagation()}>
          <div className="relative p-6 border-b border-blue-200">
            <h2 className="text-2xl font-bold text-blue-900 text-center">매치데이맵 로그인</h2>
            <p className="text-sm text-blue-600 text-center mt-2">K리그 경기 일정을 확인하세요</p>
            <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-blue-100 transition-colors">
              <X className="w-5 h-5 text-blue-700" />
            </button>
          </div>
          <div className="p-6 space-y-3">
            <button onClick={handleKakaoLogin} disabled={loading} className="w-full py-4 bg-[#FEE500] hover:bg-[#FFED4E] rounded-xl font-bold text-black shadow-md hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-3">
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a13.5 13.5 0 0 1-1.727-.11l-4.408 2.883c-.501.265-.678.236-.472-.413l.892-3.678c-2.88-1.46-4.785-3.99-4.785-6.866C1.5 6.665 6.201 3 12 3Z" />
              </svg>
              <span>카카오로 시작하기</span>
            </button>
            <button onClick={handleGoogleLogin} disabled={loading} className="hidden w-full py-4 bg-white hover:bg-gray-50 rounded-xl font-bold text-gray-700 shadow-md hover:shadow-lg transition-all border-2 border-gray-300 disabled:opacity-50 flex items-center justify-center gap-3">
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span>Google로 시작하기</span>
            </button>
          </div>
          <div className="p-4 text-center text-xs text-blue-600 border-t border-blue-200">
            로그인 시 개인정보 처리방침에 동의하게 됩니다
          </div>
        </div>
      </div>
    </>
  )
}
