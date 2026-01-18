export type UniformPattern = 'solid' | 'vertical-stripe' | 'horizontal-stripe' | 'gradient' | 'diagonal-stripe'

export interface Team {
  id: string
  name: string // 팀 정식명 (예: 'FC서울', '전북현대 모터스')
  shortName: string // 팀 약자 (예: '서울', '전북', '울산')
  displayLine1?: string // 마커에 표시될 첫 번째 줄 (예: '수원')
  displayLine2?: string // 마커에 표시될 두 번째 줄 (예: 'FC')
  primaryColor: string // Hex color
  secondaryColor?: string
  uniformPattern?: UniformPattern // 유니폼 패턴
  logoUrl?: string
  leagueType: 1 | 2 // 1부(1) 또는 2부(2)
  officialUrl?: string // 공식 홈페이지 URL
}
