'use client'

import { Stadium } from '@/lib/types/stadium'
import { X, Navigation, MapPin, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

interface StadiumDrawerProps {
  stadium: Stadium | null
  isOpen: boolean
  onClose: () => void
}

export default function StadiumDrawer({ stadium, isOpen, onClose }: StadiumDrawerProps) {
  const [imageError, setImageError] = useState(false)

  if (!stadium) return null

  const handleKakaoNavi = () => {
    const url = `kakaomap://route?ep=${stadium.location.lat},${stadium.location.lng}&by=CAR`
    window.location.href = url
  }

  const handleNaverMap = () => {
    const url = `nmap://route/car?dlat=${stadium.location.lat}&dlng=${stadium.location.lng}&dname=${encodeURIComponent(stadium.name)}&appname=com.matchdaymap`
    window.location.href = url
  }

  const handleWebMap = () => {
    const url = `https://map.kakao.com/link/to/${encodeURIComponent(stadium.name)},${stadium.location.lat},${stadium.location.lng}`
    window.open(url, '_blank')
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-card rounded-t-3xl shadow-2xl z-50 transition-transform duration-300 ease-out ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ maxHeight: '85vh' }}
      >
        {/* Handle Bar */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1 bg-muted-foreground/30 rounded-full" />
        </div>

        {/* Content */}
        <div className="px-6 pb-8 overflow-y-auto" style={{ maxHeight: 'calc(85vh - 60px)' }}>
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Team Logo or Fallback */}
          <div className="flex justify-center mb-6">
            {stadium.logoUrl && !imageError ? (
              <div className="relative w-24 h-24 rounded-full overflow-hidden bg-secondary/50 p-3">
                <Image
                  src={stadium.logoUrl}
                  alt={`${stadium.teamName} 로고`}
                  fill
                  className="object-contain"
                  onError={() => setImageError(true)}
                />
              </div>
            ) : (
              // Fallback: Team Color Icon
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center shadow-lg"
                style={{ backgroundColor: stadium.primaryColor }}
              >
                <span className="text-3xl font-bold text-white drop-shadow-md">
                  {stadium.teamShortName}
                </span>
              </div>
            )}
          </div>

          {/* Team Info */}
          <div className="text-center mb-6">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2"
              style={{
                backgroundColor: stadium.leagueType === 1 ? '#FFD700' : '#C0C0C0',
                color: '#000',
              }}
            >
              K리그{stadium.leagueType}
            </div>
            <h2 className="text-2xl font-bold mb-1">{stadium.teamName}</h2>
            <p className="text-muted-foreground text-sm">{stadium.name}</p>
          </div>

          {/* Address */}
          <div className="mb-6 p-4 bg-secondary/50 rounded-xl">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium mb-1">경기장 주소</p>
                <p className="text-sm text-muted-foreground">{stadium.address}</p>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="space-y-3">
            <p className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Navigation className="w-4 h-4" />
              길찾기
            </p>

            <button
              onClick={handleKakaoNavi}
              className="w-full p-4 bg-[#FEE500] hover:bg-[#FEE500]/90 text-black font-medium rounded-xl transition-colors flex items-center justify-between group"
            >
              <span>카카오내비로 길찾기</span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={handleNaverMap}
              className="w-full p-4 bg-[#03C75A] hover:bg-[#03C75A]/90 text-white font-medium rounded-xl transition-colors flex items-center justify-between group"
            >
              <span>네이버지도로 길찾기</span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={handleWebMap}
              className="w-full p-4 bg-secondary hover:bg-secondary/80 text-foreground font-medium rounded-xl transition-colors flex items-center justify-between group"
            >
              <span>웹에서 보기</span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Color Info */}
          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-xs text-muted-foreground mb-3">팀 컬러</p>
            <div className="flex gap-2">
              <div className="flex-1 flex items-center gap-2">
                <div
                  className="w-10 h-10 rounded-lg shadow-sm"
                  style={{ backgroundColor: stadium.primaryColor }}
                />
                <span className="text-xs text-muted-foreground">Primary</span>
              </div>
              {stadium.secondaryColor && (
                <div className="flex-1 flex items-center gap-2">
                  <div
                    className="w-10 h-10 rounded-lg shadow-sm"
                    style={{ backgroundColor: stadium.secondaryColor }}
                  />
                  <span className="text-xs text-muted-foreground">Secondary</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
