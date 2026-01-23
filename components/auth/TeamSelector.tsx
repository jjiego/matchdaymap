'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { useAuth } from '@/lib/hooks/useAuth'
import { K_LEAGUE_TEAMS } from '@/lib/constants/teams'

interface TeamSelectorProps {
  isOpen: boolean
  onClose: () => void
}

export default function TeamSelector({ isOpen, onClose }: TeamSelectorProps) {
  const { updateProfile } = useAuth()
  const [saving, setSaving] = useState(false)

  if (!isOpen) return null

  const handleTeamSelect = async (teamId: string) => {
    setSaving(true)
    try {
      await updateProfile({ favorite_team_id: teamId })
      onClose()
    } catch (error) {
      console.error('Error updating team:', error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="bg-gradient-to-b from-blue-50 to-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden pointer-events-auto" onClick={(e) => e.stopPropagation()}>
          <div className="relative p-6 border-b border-blue-200">
            <h2 className="text-2xl font-bold text-blue-900 text-center">응원하는 팀을 선택하세요</h2>
            <p className="text-sm text-blue-600 text-center mt-2">나중에 변경할 수 있습니다</p>
            <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-blue-100 transition-colors">
              <X className="w-5 h-5 text-blue-700" />
            </button>
          </div>
          <div className="p-6 overflow-y-auto max-h-[70vh]">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {K_LEAGUE_TEAMS.map((team) => (
                <button key={team.id} onClick={() => handleTeamSelect(team.id)} disabled={saving} className="p-4 rounded-xl border-2 border-blue-200 hover:border-blue-600 hover:bg-blue-50 transition-all disabled:opacity-50 text-left">
                  <div className="text-sm font-bold text-blue-900">{team.name}</div>
                  <div className="text-xs text-blue-600 mt-1">{team.shortName}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
