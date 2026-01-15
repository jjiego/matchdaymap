'use client'

import { CustomOverlayMap } from 'react-kakao-maps-sdk'
import { Stadium } from '@/lib/types/stadium'
import { useState, useEffect } from 'react'

interface TeamMarkerProps {
  stadium: Stadium
  onClick: (stadium: Stadium) => void
  isSelected?: boolean
}

export default function TeamMarker({ stadium, onClick, isSelected }: TeamMarkerProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const patternId = `pattern-${stadium.id}`
  const size = isSelected ? 56 : 48

  // Render different patterns based on uniformPattern
  const renderPattern = () => {
    switch (stadium.uniformPattern) {
      case 'vertical-stripe':
        return (
          <defs>
            <pattern id={patternId} x="0" y="0" width="10" height="48" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="5" height="48" fill={stadium.primaryColor} />
              <rect x="5" y="0" width="5" height="48" fill={stadium.secondaryColor || '#ffffff'} />
            </pattern>
          </defs>
        )

      case 'horizontal-stripe':
        return (
          <defs>
            <pattern id={patternId} x="0" y="0" width="48" height="10" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="48" height="5" fill={stadium.primaryColor} />
              <rect x="0" y="5" width="48" height="5" fill={stadium.secondaryColor || '#ffffff'} />
            </pattern>
          </defs>
        )

      case 'diagonal-stripe':
        return (
          <defs>
            <pattern id={patternId} x="0" y="0" width="14.14" height="14.14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <rect x="0" y="0" width="7.07" height="14.14" fill={stadium.primaryColor} />
              <rect x="7.07" y="0" width="7.07" height="14.14" fill={stadium.secondaryColor || '#ffffff'} />
            </pattern>
          </defs>
        )

      case 'gradient':
        return (
          <defs>
            <radialGradient id={patternId} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={stadium.primaryColor} />
              <stop offset="100%" stopColor={stadium.secondaryColor || stadium.primaryColor} />
            </radialGradient>
          </defs>
        )

      case 'solid':
      default:
        return null
    }
  }

  const getFillColor = () => {
    if (stadium.uniformPattern === 'solid' || !stadium.uniformPattern) {
      return stadium.primaryColor
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
              stroke={isSelected ? '#ffffff' : (stadium.secondaryColor && stadium.uniformPattern === 'solid' ? stadium.secondaryColor : '#ffffff')}
              strokeWidth={isSelected ? '3' : '2'}
            />

            {/* Inner Circle for Better Text Contrast */}
            <circle
              cx="24"
              cy="24"
              r="16"
              fill="rgba(0,0,0,0.2)"
            />

            {/* Team Short Name Text */}
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
              {stadium.teamShortName}
            </text>
          </svg>

          {/* League Type Badge */}
          <div
            className="absolute -top-1 -right-1 rounded-full text-xs font-bold px-1.5 py-0.5 shadow-md"
            style={{
              backgroundColor: stadium.leagueType === 1 ? '#FFD700' : '#C0C0C0',
              color: '#000',
              fontSize: '8px',
            }}
          >
            K{stadium.leagueType}
          </div>
        </div>

        {/* Pointer Triangle */}
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            width: 0,
            height: 0,
            borderLeft: '8px solid transparent',
            borderRight: '8px solid transparent',
            borderTop: `12px solid ${stadium.uniformPattern === 'solid' || !stadium.uniformPattern ? stadium.primaryColor : stadium.primaryColor}`,
            filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.3))',
          }}
        />
      </div>
    </CustomOverlayMap>
  )
}
