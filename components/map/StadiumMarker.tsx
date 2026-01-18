'use client'

import { CustomOverlayMap } from 'react-kakao-maps-sdk'
import { Stadium } from '@/lib/types/stadium'
import { useState, useEffect } from 'react'
import { getStadiumGames } from '@/lib/supabase/games'

interface StadiumMarkerProps {
  stadium: Stadium
  onClick: (stadium: Stadium) => void
  isSelected?: boolean
}

export default function StadiumMarker({ stadium, onClick, isSelected }: StadiumMarkerProps) {
  const [mounted, setMounted] = useState(false)
  const [daysUntilNextGame, setDaysUntilNextGame] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const fetchNextGameDays = async () => {
      const games = await getStadiumGames(stadium.name, 1)
      if (games.length > 0) {
        const gameDate = games[0].game_date
        const [year, month, day] = gameDate.split('-')
        const nextGameDate = new Date(Number(year), Number(month) - 1, Number(day))
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        nextGameDate.setHours(0, 0, 0, 0)

        const diffTime = nextGameDate.getTime() - today.getTime()
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

        if (diffDays === 0) {
          setDaysUntilNextGame('TODAY')
        } else if (diffDays > 0) {
          setDaysUntilNextGame(`D-${diffDays}`)
        }
      }
    }

    if (mounted) {
      fetchNextGameDays()
    }
  }, [mounted, stadium.name])

  if (!mounted) return null

  const team = stadium.team
  const patternId = `pattern-${stadium.id}`
  const size = isSelected ? 56 : 48

  // Render different patterns based on team's uniformPattern
  const renderPattern = () => {
    if (!team) return null

    switch (team.uniformPattern) {
      case 'vertical-stripe':
        return (
          <defs>
            <pattern id={patternId} x="0" y="0" width="10" height="48" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="5" height="48" fill={team.primaryColor} />
              <rect x="5" y="0" width="5" height="48" fill={team.secondaryColor || '#ffffff'} />
            </pattern>
          </defs>
        )

      case 'horizontal-stripe':
        return (
          <defs>
            <pattern id={patternId} x="0" y="0" width="48" height="10" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="48" height="5" fill={team.primaryColor} />
              <rect x="0" y="5" width="48" height="5" fill={team.secondaryColor || '#ffffff'} />
            </pattern>
          </defs>
        )

      case 'diagonal-stripe':
        return (
          <defs>
            <pattern id={patternId} x="0" y="0" width="14.14" height="14.14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <rect x="0" y="0" width="7.07" height="14.14" fill={team.primaryColor} />
              <rect x="7.07" y="0" width="7.07" height="14.14" fill={team.secondaryColor || '#ffffff'} />
            </pattern>
          </defs>
        )

      case 'gradient':
        return (
          <defs>
            <radialGradient id={patternId} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={team.primaryColor} />
              <stop offset="100%" stopColor={team.secondaryColor || team.primaryColor} />
            </radialGradient>
          </defs>
        )

      case 'solid':
      default:
        return null
    }
  }

  const getFillColor = () => {
    if (!team) return '#CCCCCC'
    if (team.uniformPattern === 'solid' || !team.uniformPattern) {
      return team.primaryColor
    }
    return `url(#${patternId})`
  }

  return (
    <CustomOverlayMap
      position={{
        lat: stadium.location.lat,
        lng: stadium.location.lng,
      }}
      yAnchor={1}
    >
      <div
        onClick={() => onClick(stadium)}
        className="relative cursor-pointer transform transition-all duration-200 hover:scale-110"
        style={{
          filter: isSelected ? 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.9))' : 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
        }}
      >
        {/* SVG Marker with Team Color and Pattern */}
        <div className="relative">
          <svg
            width={size}
            height={size}
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-all duration-200"
          >
            {renderPattern()}

            {/* Outer Circle with Border */}
            <circle
              cx="24"
              cy="24"
              r="20"
              fill={getFillColor()}
              stroke={isSelected ? '#ffffff' : (team && team.secondaryColor && team.uniformPattern === 'solid' ? team.secondaryColor : '#ffffff')}
              strokeWidth={isSelected ? '3' : '2'}
            />

            {/* Inner Circle for Better Text Contrast */}
            <circle
              cx="24"
              cy="24"
              r="16"
              fill="rgba(0,0,0,0.2)"
            />

            {/* Stadium Name - Two Lines or Single */}
            {stadium.displayLine1 && stadium.displayLine2 ? (
              <>
                <text
                  x="24"
                  y="22"
                  textAnchor="middle"
                  fill="white"
                  fontSize="10"
                  fontWeight="bold"
                  style={{
                    textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 0 2px rgba(0,0,0,0.8)',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                  }}
                >
                  {stadium.displayLine1}
                </text>
                <text
                  x="24"
                  y="32"
                  textAnchor="middle"
                  fill="white"
                  fontSize="10"
                  fontWeight="bold"
                  style={{
                    textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 0 2px rgba(0,0,0,0.8)',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                  }}
                >
                  {stadium.displayLine2}
                </text>
              </>
            ) : (
              <text
                x="24"
                y="28"
                textAnchor="middle"
                fill="white"
                fontSize="11"
                fontWeight="bold"
                style={{
                  textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 0 2px rgba(0,0,0,0.8)',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                }}
              >
                {stadium.name.split(' ')[0]}
              </text>
            )}
          </svg>

          {/* League Type Badge - Top Left */}
          <div
            className="absolute rounded-full text-xs font-bold px-1.5 py-0.5 shadow-md"
            style={{
              backgroundColor: team && team.leagueType === 1 ? '#FFD700' : '#C0C0C0',
              color: '#000',
              fontSize: '8px',
              top: '-8px',
              left: '-8px',
            }}
          >
            K{team?.leagueType || 1}
          </div>

          {/* D-Day Badge - Top Right */}
          {daysUntilNextGame && (
            <div
              className="absolute rounded-full text-xs font-bold px-1.5 py-0.5 shadow-md"
              style={{
                backgroundColor: daysUntilNextGame === 'TODAY' ? '#FF6B35' : '#3B82F6',
                color: '#fff',
                fontSize: '8px',
                top: '-8px',
                right: '-8px',
              }}
            >
              {daysUntilNextGame}
            </div>
          )}
        </div>

        {/* Pointer Triangle */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            bottom: 'calc(-12px - ' + (size / 2) + 'px)',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '8px solid transparent',
            borderRight: '8px solid transparent',
            borderTop: `12px solid ${team ? team.primaryColor : '#CCCCCC'}`,
            filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.3))',
          }}
        />
      </div>
    </CustomOverlayMap>
  )
}
