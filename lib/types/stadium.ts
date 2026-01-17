export type UniformPattern = 'solid' | 'vertical-stripe' | 'horizontal-stripe' | 'gradient' | 'diagonal-stripe'

export interface Stadium {
  id: string
  name: string // DB 매칭용 짧은 이름 (예: '서울 월드컵', '울산 문수')
  fullName?: string // 전체 경기장 이름 (예: '서울월드컵경기장', '울산문수축구경기장')
  teamName: string
  teamShortName: string // 팀 약자 (예: '서울', '전북', '울산')
  teamDisplayLine1?: string // 마커에 표시될 첫 번째 줄 (예: '수원')
  teamDisplayLine2?: string // 마커에 표시될 두 번째 줄 (예: 'FC')
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
