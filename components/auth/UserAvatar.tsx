'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/hooks/useAuth'
import { LogOut, User, Heart } from 'lucide-react'
import { K_LEAGUE_TEAMS } from '@/lib/constants/teams'

export default function UserAvatar() {
  const { user, profile, signOut } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  if (!user || !profile) return null

  const favoriteTeam = K_LEAGUE_TEAMS.find(t => t.id === profile.favorite_team_id)

  const handleSignOut = async () => {
    try {
      await signOut()
      setIsMenuOpen(false)
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  return (
    <div className="relative">
      <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-1 bg-white backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all">
        {profile.avatar_url ? (
          <img src={profile.avatar_url} alt={profile.full_name || 'User'} className="w-10 h-10 rounded-full object-cover" />
        ) : (
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
        )}
      </button>

      {isMenuOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsMenuOpen(false)} />
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl z-50 overflow-hidden border border-blue-200">
            <div className="p-4 bg-gradient-to-b from-blue-50 to-white border-b border-blue-200">
              <p className="font-bold text-blue-900">{profile.full_name || '사용자'}</p>
              <p className="text-sm text-blue-600">{profile.email}</p>
              {favoriteTeam && (
                <div className="mt-2 flex items-center gap-2 text-sm text-blue-700">
                  <Heart className="w-4 h-4 fill-current" />
                  <span>{favoriteTeam.name}</span>
                </div>
              )}
            </div>
            <button onClick={handleSignOut} className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors flex items-center gap-3 text-blue-900">
              <LogOut className="w-4 h-4" />
              <span>로그아웃</span>
            </button>
          </div>
        </>
      )}
    </div>
  )
}
