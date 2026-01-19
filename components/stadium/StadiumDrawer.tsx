'use client'

import { Stadium } from '@/lib/types/stadium'
import { Game } from '@/lib/types/game'
import { X, MapPin, Calendar } from 'lucide-react'
import { useState, useEffect } from 'react'
import { getStadiumGames } from '@/lib/supabase/games'
import { debugStadiumGamesAll, debugStadiumNames } from '@/lib/supabase/debug'

interface StadiumDrawerProps {
  stadium: Stadium | null
  isOpen: boolean
  onClose: () => void
}

export default function StadiumDrawer({ stadium, isOpen, onClose }: StadiumDrawerProps) {
  const [games, setGames] = useState<Game[]>([])
  const [loadingGames, setLoadingGames] = useState(false)
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set())

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

      getStadiumGames(stadium.name, 1000)
        .then(setGames)
        .finally(() => setLoadingGames(false))
    }
  }, [stadium, isOpen])

  if (!stadium) return null

  const formatDate = (dateStr: string) => {
    // DB에 저장된 날짜를 그대로 사용 (타임존 무시)
    const [year, month, day] = dateStr.split('-')
    const date = new Date(Number(year), Number(month) - 1, Number(day))
    return date.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'short' })
  }

  const formatTime = (dateTimeStr: string) => {
    if (!dateTimeStr) return ''
    // DB에 저장된 시간을 그대로 사용 (타임존 무시)
    const timePart = dateTimeStr.includes('T') ? dateTimeStr.split('T')[1] : dateTimeStr.split(' ')[1]
    if (!timePart) return ''
    const [hour, minute] = timePart.split(':')
    return `${hour}:${minute}`
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

  const getDaysUntilGame = (gameDateStr: string) => {
    const [year, month, day] = gameDateStr.split('-')
    const gameDate = new Date(Number(year), Number(month) - 1, Number(day))
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    gameDate.setHours(0, 0, 0, 0)

    const diffTime = gameDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'Match Day !!!'
    if (diffDays > 0) return `D-${diffDays}`
    return null // 과거 경기
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
        className={`fixed bottom-0 left-0 right-0 rounded-t-3xl shadow-2xl z-50 transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{
          maxHeight: '50vh',
          background: 'linear-gradient(to bottom, #dbeafe, #f0f9ff)'
        }}
      >
        {/* Handle Bar */}
        <div className="flex justify-center pt-3 pb-2 flex-shrink-0">
          <div className="w-12 h-1 bg-blue-300 rounded-full" />
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors z-10"
        >
          <X className="w-5 h-5 text-blue-700" />
        </button>

        {/* Header - Fixed */}
        <div className="px-6 pt-4 pb-4 flex-shrink-0 text-center border-b border-blue-200">
          <div className="flex items-center justify-center gap-2 mb-2">
            <h2 className="text-lg font-bold text-blue-900">{stadium.team?.name || '팀정보'}</h2>
            {stadium.team?.officialUrl && (
              <a
                href={stadium.team.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors"
                title="공식 홈페이지"
              >
                <span className="text-xs font-bold text-white">🌐</span>
              </a>
            )}
          </div>
          <p className="text-sm text-blue-700 font-medium">{stadium.fullName || stadium.name}</p>
        </div>

        {/* Scrollable Content - Game Schedule */}
        <div className="flex-1 overflow-y-auto px-6">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-blue-600" />
              <p className="text-base font-bold text-blue-900">경기 일정</p>
            </div>

            {loadingGames ? (
              <div className="text-center py-8 text-sm text-blue-600">
                경기 일정을 불러오는 중...
              </div>
            ) : games.length > 0 ? (
              <div className="space-y-3">
                {games.map((game) => {
                  const status = getGameStatus(game.status_code, game.status_info)
                  const isFinished = status === '종료'
                  const isLive = status === 'LIVE'
                  const daysUntil = getDaysUntilGame(game.game_date)
                  const isMatchDay = daysUntil === 'Match Day !!!'

                  return (
                    <div
                      key={game.game_id}
                      className="p-4 bg-white border-2 border-blue-200 rounded-xl hover:border-blue-400 hover:shadow-lg transition-all"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-semibold text-blue-700">
                          {formatDate(game.game_date)} {formatTime(game.game_date_time)}
                        </span>
                        <span
                          className={`text-xs px-3 py-1 rounded-full font-bold ${
                            isFinished
                              ? 'bg-gray-500 text-white'
                              : isLive
                              ? 'bg-red-500 text-white animate-pulse'
                              : isMatchDay
                              ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white animate-pulse'
                              : 'bg-blue-600 text-white'
                          }`}
                        >
                          {isFinished || isLive ? status : (daysUntil || status)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex-1 flex flex-col items-center gap-2">
                          {game.home_team_emblem_url && !failedImages.has(`home-${game.game_id}`) ? (
                            <img
                              src={`/api/proxy-image?url=${encodeURIComponent(game.home_team_emblem_url)}`}
                              alt={game.home_team_name}
                              className="w-10 h-10 object-contain"
                              onError={() => {
                                setFailedImages(prev => new Set(prev).add(`home-${game.game_id}`))
                              }}
                            />
                          ) : (
                            <div className="w-10 h-10 bg-blue-100 border border-blue-300 rounded flex items-center justify-center">
                              <span className="text-xs text-blue-400 text-center leading-none">No Logo</span>
                            </div>
                          )}
                          <p className="text-sm font-bold text-blue-900">{game.home_team_name}</p>
                        </div>
                        <div className="px-4 flex flex-col items-center gap-2">
                          {game.match_round && (
                            <span className="text-xs font-semibold text-blue-700 bg-blue-100 px-2 py-1 rounded-full">
                              {game.match_round} Round
                            </span>
                          )}
                          {isFinished ? (
                            <span className="text-lg font-black text-blue-900">
                              {game.home_team_score ?? 0} : {game.away_team_score ?? 0}
                            </span>
                          ) : (
                            <span className="text-base font-semibold text-blue-400">VS</span>
                          )}
                          <a
                            href={`https://m.sports.naver.com/game/${game.game_id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-semibold text-white bg-green-600 hover:bg-green-700 px-3 py-1 rounded-full transition-colors"
                          >
                            네이버 중계
                          </a>
                        </div>
                        <div className="flex-1 flex flex-col items-center gap-2">
                          {game.away_team_emblem_url && !failedImages.has(`away-${game.game_id}`) ? (
                            <img
                              src={`/api/proxy-image?url=${encodeURIComponent(game.away_team_emblem_url)}`}
                              alt={game.away_team_name}
                              className="w-10 h-10 object-contain"
                              onError={() => {
                                setFailedImages(prev => new Set(prev).add(`away-${game.game_id}`))
                              }}
                            />
                          ) : (
                            <div className="w-10 h-10 bg-blue-100 border border-blue-300 rounded flex items-center justify-center">
                              <span className="text-xs text-blue-400 text-center leading-none">No Logo</span>
                            </div>
                          )}
                          <p className="text-sm font-bold text-blue-900">{game.away_team_name}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-sm text-blue-600 bg-blue-50 rounded-xl">
                예정된 경기가 없습니다
              </div>
            )}
          </div>
        </div>

        {/* Footer - Fixed Address Section */}
        <div className="px-6 pb-6 flex-shrink-0 border-t border-blue-200">
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-200 mt-4">
            <div className="flex items-start gap-3 mb-4">
              <MapPin className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold mb-1 text-blue-900">경기장 주소</p>
                <p className="text-sm text-blue-700">{stadium.address}</p>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="space-y-2">
              <p className="text-xs font-bold text-blue-900 mb-2">길찾기</p>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={handleKakaoNavi}
                  className="p-3 bg-[#FEE500] hover:bg-[#FFED4E] text-black font-bold rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center text-xs"
                  title="카카오내비"
                >
                  카카오
                </button>

                <button
                  onClick={handleNaverMap}
                  className="p-3 bg-[#03C75A] hover:bg-[#02B350] text-white font-bold rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center text-xs"
                  title="네이버지도"
                >
                  네이버
                </button>

                <button
                  onClick={handleWebMap}
                  className="p-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center text-xs"
                  title="웹 지도"
                >
                  지도
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
