import { Team } from './team'

export interface Stadium {
  id: string
  name: string // DB 매칭용 짧은 이름 (예: '서울 월드컵', '울산 문수')
  fullName?: string // 전체 경기장 이름 (예: '서울월드컵경기장', '울산문수축구경기장')
  displayLine1?: string // 마커에 표시될 첫 번째 줄
  displayLine2?: string // 마커에 표시될 두 번째 줄
  teamId: string // 홈팀 ID (Team과의 관계)
  team?: Team // 홈팀 정보 (선택사항)
  location: {
    lat: number
    lng: number
  }
  address: string
}

export interface StadiumMarkerProps {
  stadium: Stadium
  onClick: (stadium: Stadium) => void
  isSelected?: boolean
}
