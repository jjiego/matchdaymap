'use client'

import { useState, useEffect } from 'react'
import { Map, CustomOverlayMap } from 'react-kakao-maps-sdk'
import TeamMarker from '@/components/map/TeamMarker'
import StadiumDrawer from '@/components/stadium/StadiumDrawer'
import { K_LEAGUE_FULL_STADIUMS } from '@/lib/constants/stadiums'
import { Stadium } from '@/lib/types/stadium'
import { Map as MapIcon, Navigation } from 'lucide-react'

export default function Home() {
  const [selectedStadium, setSelectedStadium] = useState<Stadium | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [mapCenter, setMapCenter] = useState({ lat: 36.5, lng: 127.5 })
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [mapLevel, setMapLevel] = useState(13)
  const [map, setMap] = useState<any>(null)

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setUserLocation({ lat: latitude, lng: longitude })
          setMapCenter({ lat: latitude, lng: longitude })
        },
        (error) => {
          console.log('Location permission denied or unavailable:', error)
        }
      )
    }
  }, [])

  const handleMarkerClick = (stadium: Stadium) => {
    console.log('Marker clicked:', stadium.teamName, 'Location:', stadium.location)
    setSelectedStadium(stadium)
    setIsDrawerOpen(true)

    // Update map center and level using map instance if available
    if (map) {
      const moveLatLon = new window.kakao.maps.LatLng(stadium.location.lat, stadium.location.lng)
      map.setLevel(1) // Level 1 for maximum zoom
      map.panTo(moveLatLon)
      console.log('Map moved using panTo to:', stadium.location)
    } else {
      // Fallback to state update
      setMapCenter({ lat: stadium.location.lat, lng: stadium.location.lng })
      setMapLevel(1)
      console.log('Map state updated (no map instance)')
    }
  }

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false)
    setMapLevel(13)
    setTimeout(() => setSelectedStadium(null), 300)
  }

  const handleGoHome = () => {
    // 전국 지도 보기 (기본 화면)
    setMapCenter({ lat: 36.5, lng: 127.5 })
    setMapLevel(13)
    setIsDrawerOpen(false)
    setSelectedStadium(null)
  }

  const handleGoToMyLocation = () => {
    if (userLocation) {
      setMapCenter(userLocation)
      setMapLevel(7)
    }
  }

  return (
    <main className="relative w-full h-screen overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/60 to-transparent p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white drop-shadow-lg">매치데이맵</h1>
            <p className="text-sm text-white/80 drop-shadow">K리그 직관 가이드</p>
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={handleGoHome}
              className="p-3 bg-white backdrop-blur-sm rounded-full shadow-lg hover:bg-gray-100 transition-colors"
              title="메인화면으로 이동"
            >
              <MapIcon className="w-5 h-5 text-gray-700" />
            </button>
            {userLocation && (
              <button
                onClick={handleGoToMyLocation}
                className="p-3 bg-blue-500 backdrop-blur-sm rounded-full shadow-lg hover:bg-blue-600 transition-colors"
                title="현재 위치로 이동"
              >
                <Navigation className="w-5 h-5 text-white" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Map */}
      <Map
        center={mapCenter}
        style={{ width: '100%', height: '100%' }}
        level={mapLevel}
        isPanto={true}
        onCreate={setMap}
      >
        {K_LEAGUE_FULL_STADIUMS.map((stadium) => (
          <TeamMarker
            key={stadium.id}
            stadium={stadium}
            onClick={handleMarkerClick}
            isSelected={selectedStadium?.id === stadium.id}
          />
        ))}

        {/* User Location Marker */}
        {userLocation && (
          <CustomOverlayMap position={userLocation} yAnchor={0.5}>
            <div className="relative flex items-center justify-center">
              <div className="absolute w-12 h-12 bg-blue-500/20 rounded-full animate-ping" />
              <div className="relative w-8 h-8 bg-blue-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                <Navigation className="w-4 h-4 text-white" />
              </div>
            </div>
          </CustomOverlayMap>
        )}
      </Map>

      {/* Stadium Detail Drawer */}
      <StadiumDrawer
        stadium={selectedStadium}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
      />

      {/* Legend - moves up when drawer is open */}
      <div
        className={`absolute left-4 z-10 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg transition-all duration-300 ${
          isDrawerOpen ? 'bottom-[calc(45vh+16px)]' : 'bottom-6'
        }`}
      >
        <div className="flex items-center gap-3 text-xs text-gray-700">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#FFD700]" />
            <span>K리그1</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#C0C0C0]" />
            <span>K리그2</span>
          </div>
        </div>
      </div>
    </main>
  )
}
