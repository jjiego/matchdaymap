'use client'

import { Stadium } from '@/lib/types/stadium'
import { Game } from '@/lib/types/game'
import { X, Navigation, MapPin, ExternalLink, Calendar } from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { getStadiumGames } from '@/lib/supabase/games'
import { debugStadiumGamesAll, debugStadiumNames } from '@/lib/supabase/debug'

interface StadiumDrawerProps {
  stadium: Stadium | null
  isOpen: boolean
  onClose: () => void
}

export default function StadiumDrawer({ stadium, isOpen, onClose }: StadiumDrawerProps) {
  const [imageError, setImageError] = useState(false)
  const [games, setGames] = useState<Game[]>([])
  const [loadingGames, setLoadingGames] = useState(false)

  // Fetch games when stadium changes
  useEffect(() => {
    if (stadium && isOpen) {
      setLoadingGames(true)

      // 디버깅: 경기장 이름 확인
      console.log('Stadium name:', stadium.name)

      // 디버깅: 모든 경기장 이름 출력 (최초 1회)
      debugStadiumNames()

      // 디버깅: 해당 경기장의 모든 경기 확인 (날짜 필터 없이)
      debugStadiumGamesAll(stadium.name)

      getStadiumGames(stadium.name, 5)
        .then(setGames)
        .finally(() => setLoadingGames(false))
    }
  }, [stadium, isOpen])

  if (!stadium) return null

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'short' })
  }

  const formatTime = (dateTimeStr: string) => {
    if (!dateTimeStr) return ''
    const date = new Date(dateTimeStr)
    return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false })
  }

  const getGameStatus = (statusCode?: string, statusInfo?: string) => {
    if (!statusCode) return '예정'

    // status_code에 따른 상태 매핑
    if (statusCode === 'FINISHED' || statusCode === 'END') return '종료'
    if (statusCode === 'LIVE' || statusCode === 'PLAYING') return 'LIVE'
    if (statusCode === 'SCHEDULED' || statusCode === 'BEFORE') return '예정'
    if (statusCode === 'POSTPONED' || statusCode === 'CANCEL') return '연기'

    return statusInfo || '예정'
  }

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
      {/* Drawer - no backdrop to allow map interaction */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50 transition-transform duration-300 ease-out ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ maxHeight: '50vh' }}
      >
        {/* Handle Bar */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1 bg-muted-foreground/30 rounded-full" />
        </div>

        {/* Content */}
        <div className="px-6 pb-6 overflow-y-auto" style={{ maxHeight: 'calc(50vh - 60px)' }}>
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
            <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3"
              style={{
                backgroundColor: stadium.leagueType === 1 ? '#FFD700' : '#C0C0C0',
                color: '#000',
              }}
            >
              K리그{stadium.leagueType}
            </div>
            <h2 className="text-2xl font-bold mb-2 text-gray-900">{stadium.teamName}</h2>
            <p className="text-gray-600 text-sm font-medium">{stadium.fullName || stadium.name}</p>
          </div>

          {/* Address */}
          <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold mb-1 text-gray-900">경기장 주소</p>
                <p className="text-sm text-gray-600">{stadium.address}</p>
              </div>
            </div>
          </div>

          {/* Game Schedule */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-blue-600" />
              <p className="text-base font-bold text-gray-900">경기 일정</p>
            </div>

            {loadingGames ? (
              <div className="text-center py-8 text-sm text-gray-500">
                경기 일정을 불러오는 중...
              </div>
            ) : games.length > 0 ? (
              <div className="space-y-3">
                {games.map((game) => {
                  const status = getGameStatus(game.status_code, game.status_info)
                  const isFinished = status === '종료'
                  const isLive = status === 'LIVE'

                  return (
                    <div
                      key={game.game_id}
                      className="p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-semibold text-gray-700">
                          {formatDate(game.game_date)} {formatTime(game.game_date_time)}
                        </span>
                        <span
                          className={`text-xs px-3 py-1 rounded-full font-bold ${
                            isFinished
                              ? 'bg-gray-500 text-white'
                              : isLive
                              ? 'bg-red-500 text-white animate-pulse'
                              : 'bg-blue-500 text-white'
                          }`}
                        >
                          {status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex-1 text-center">
                          <p className="text-base font-bold text-gray-900">{game.home_team_name}</p>
                        </div>
                        <div className="px-4">
                          {isFinished ? (
                            <span className="text-lg font-black text-gray-900">
                              {game.home_team_score ?? 0} : {game.away_team_score ?? 0}
                            </span>
                          ) : (
                            <span className="text-base font-semibold text-gray-400">VS</span>
                          )}
                        </div>
                        <div className="flex-1 text-center">
                          <p className="text-base font-bold text-gray-900">{game.away_team_name}</p>
                        </div>
                      </div>
                      {game.match_round && (
                        <div className="mt-2 pt-2 border-t border-gray-100 text-center">
                          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                            {game.match_round} 라운드
                          </span>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-sm text-gray-500 bg-gray-50 rounded-xl">
                예정된 경기가 없습니다
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="space-y-2">
            <p className="text-sm font-bold text-gray-900 mb-3">길찾기</p>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={handleKakaoNavi}
                className="p-4 bg-[#FEE500] hover:bg-[#FFED4E] text-black font-bold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center"
                title="카카오내비"
              >
                <span className="text-sm">카카오</span>
              </button>

              <button
                onClick={handleNaverMap}
                className="p-4 bg-[#03C75A] hover:bg-[#02B350] text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center"
                title="네이버지도"
              >
                <span className="text-sm">네이버</span>
              </button>

              <button
                onClick={handleWebMap}
                className="p-4 bg-gray-700 hover:bg-gray-800 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center"
                title="웹 지도"
              >
                <span className="text-sm">지도</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
