export type UniformPattern = 'solid' | 'vertical-stripe' | 'horizontal-stripe' | 'gradient' | 'diagonal-stripe'

export interface Stadium {
  id: string
  name: string
  teamName: string
  teamShortName: string // 팀 약자 (예: '서울', '전북', '울산')
  location: {
    lat: number
    lng: number
  }
  primaryColor: string // Hex color
  secondaryColor?: string
  uniformPattern?: UniformPattern // 유니폼 패턴
  logoUrl?: string
  leagueType: 1 | 2 // 1부(1) 또는 2부(2)
  address: string
}

export interface StadiumMarkerProps {
  stadium: Stadium
  onClick: (stadium: Stadium) => void
  isSelected?: boolean
}
