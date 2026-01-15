import { Stadium } from '@/lib/types/stadium'

export const K_LEAGUE_FULL_STADIUMS: Stadium[] = [
  // K리그1 (2025시즌 - 12개 팀)
  // 출처: 나무위키 K리그1, 각 팀 공식 홈페이지
  {
    id: 'fc-seoul',
    name: '서울월드컵경기장',
    teamName: 'FC서울',
    teamShortName: '서울',
    location: { lat: 37.5682, lng: 126.8974 },
    primaryColor: '#C8102E', // 빨강
    secondaryColor: '#000000', // 검정
    uniformPattern: 'vertical-stripe', // 전통적인 빨강/검정 수직 스트라이프
    leagueType: 1,
    address: '서울특별시 마포구 월드컵로 240',
  },
  {
    id: 'ulsan',
    name: '울산문수축구경기장',
    teamName: '울산 HD',
    teamShortName: '울산',
    location: { lat: 35.5352, lng: 129.2595 },
    primaryColor: '#0066B3', // 파랑
    secondaryColor: '#000000', // 검정
    uniformPattern: 'solid', // 2025 단색 파랑 유니폼
    leagueType: 1,
    address: '울산광역시 남구 문수로 44',
  },
  {
    id: 'jeonbuk',
    name: '전주월드컵경기장',
    teamName: '전북 현대',
    teamShortName: '전북',
    location: { lat: 35.8681, lng: 127.0646 },
    primaryColor: '#00A651', // 녹색
    secondaryColor: '#000000', // 검정
    uniformPattern: 'solid', // 단색 녹색
    leagueType: 1,
    address: '전북특별자치도 전주시 덕진구 기린대로 1055',
  },
  {
    id: 'pohang',
    name: '포항스틸야드',
    teamName: '포항 스틸러스',
    teamShortName: '포항',
    location: { lat: 35.9977, lng: 129.3844 },
    primaryColor: '#E2231A', // 빨강
    secondaryColor: '#000000', // 검정
    uniformPattern: 'vertical-stripe', // 빨강/검정 수직 스트라이프
    leagueType: 1,
    address: '경상북도 포항시 남구 대도동 305',
  },
  {
    id: 'daegu',
    name: 'DGB대구은행파크',
    teamName: '대구 FC',
    teamShortName: '대구',
    location: { lat: 35.8810, lng: 128.5891 },
    primaryColor: '#87CEEB', // 하늘색
    secondaryColor: '#003DA5', // 네이비
    uniformPattern: 'solid', // 하늘색 단색 (써드는 스트라이프)
    leagueType: 1,
    address: '대구광역시 수성구 유니버시아드로 180',
  },
  {
    id: 'gwangju',
    name: '광주월드컵경기장',
    teamName: '광주 FC',
    teamShortName: '광주',
    location: { lat: 35.1335, lng: 126.8716 },
    primaryColor: '#FFD700', // 노랑
    secondaryColor: '#000000', // 검정
    uniformPattern: 'solid', // 노랑 단색
    leagueType: 1,
    address: '광주광역시 서구 금화로 240',
  },
  {
    id: 'gangwon',
    name: '강릉종합운동장',
    teamName: '강원 FC',
    teamShortName: '강원',
    location: { lat: 37.7556, lng: 128.8962 },
    primaryColor: '#FF6B00', // 주황
    secondaryColor: '#FFFFFF', // 흰색
    uniformPattern: 'solid', // 주황 단색
    leagueType: 1,
    address: '강원특별자치도 강릉시 종합운동장길 46',
  },
  {
    id: 'gimcheon',
    name: '김천종합스포츠타운',
    teamName: '김천 상무',
    teamShortName: '김천',
    location: { lat: 36.1091, lng: 128.0920 },
    primaryColor: '#C8102E', // 빨강
    secondaryColor: '#003478', // 네이비
    uniformPattern: 'vertical-stripe', // 빨강/네이비 수직 스트라이프
    leagueType: 1,
    address: '경상북도 김천시 혁신6로 31',
  },
  {
    id: 'suwon-fc',
    name: '수원종합운동장',
    teamName: '수원 FC',
    teamShortName: '수원',
    location: { lat: 37.2876, lng: 127.0369 },
    primaryColor: '#E31837', // 빨강
    secondaryColor: '#0033A0', // 파랑
    uniformPattern: 'vertical-stripe', // 빨강/파랑 수직 스트라이프
    leagueType: 1,
    address: '경기도 수원시 장안구 조원로 134',
  },
  {
    id: 'jeju',
    name: '제주월드컵경기장',
    teamName: '제주 SK',
    teamShortName: '제주',
    location: { lat: 33.2467, lng: 126.5093 },
    primaryColor: '#FF6600', // 오렌지
    secondaryColor: '#000000', // 검정
    uniformPattern: 'solid', // 오렌지 단색
    leagueType: 1,
    address: '제주특별자치도 서귀포시 월드컵로 33',
  },
  {
    id: 'daejeon',
    name: '대전월드컵경기장',
    teamName: '대전 하나 시티즌',
    teamShortName: '대전',
    location: { lat: 36.3591, lng: 127.3218 },
    primaryColor: '#702F8A', // 자주색
    secondaryColor: '#FFFFFF', // 흰색
    uniformPattern: 'solid', // 자주색 단색
    leagueType: 1,
    address: '대전광역시 유성구 노은동로 135',
  },
  {
    id: 'anyang',
    name: '안양종합운동장',
    teamName: 'FC 안양',
    teamShortName: '안양',
    location: { lat: 37.4011, lng: 126.9281 },
    primaryColor: '#6C2785', // 자주색
    secondaryColor: '#FFFFFF', // 흰색
    uniformPattern: 'solid', // 자주색 단색
    leagueType: 1,
    address: '경기도 안양시 만안구 안양로 131',
  },

  // K리그2 (2025시즌 - 주요 팀)
  // 출처: 나무위키 K리그2, 각 팀 공식 홈페이지
  {
    id: 'busan',
    name: '부산아시아드주경기장',
    teamName: '부산 아이파크',
    teamShortName: '부산',
    location: { lat: 35.1904, lng: 129.0611 },
    primaryColor: '#C8102E', // 빨강
    secondaryColor: '#000000', // 검정
    uniformPattern: 'solid', // 빨강 단색
    leagueType: 2,
    address: '부산광역시 연제구 월드컵대로 344',
  },
  {
    id: 'incheon',
    name: '인천축구전용경기장',
    teamName: '인천 유나이티드',
    teamShortName: '인천',
    location: { lat: 37.4662, lng: 126.6431 },
    primaryColor: '#000000', // 검정
    secondaryColor: '#0066B3', // 파랑
    uniformPattern: 'vertical-stripe', // 검정/파랑 수직 스트라이프
    leagueType: 2,
    address: '인천광역시 중구 참외전로 246',
  },
  {
    id: 'cheonan',
    name: '천안종합운동장',
    teamName: '천안 시티',
    teamShortName: '천안',
    location: { lat: 36.8083, lng: 127.1508 },
    primaryColor: '#1E90FF', // 파랑
    secondaryColor: '#FFFFFF', // 흰색
    uniformPattern: 'solid', // 파랑 단색
    leagueType: 2,
    address: '충청남도 천안시 서북구 두정역서6길 60',
  },
  {
    id: 'gyeongnam',
    name: '창원축구센터',
    teamName: '경남 FC',
    teamShortName: '경남',
    location: { lat: 35.2108, lng: 128.5836 },
    primaryColor: '#FF0000', // 빨강
    secondaryColor: '#000000', // 검정
    uniformPattern: 'solid', // 빨강 단색
    leagueType: 2,
    address: '경상남도 창원시 성산구 삼정자로 72',
  },
  {
    id: 'bucheon',
    name: '부천종합운동장',
    teamName: '부천 FC 1995',
    teamShortName: '부천',
    location: { lat: 37.5033, lng: 126.7819 },
    primaryColor: '#0066CC', // 파랑
    secondaryColor: '#FFD700', // 노랑
    uniformPattern: 'solid', // 파랑 단색
    leagueType: 2,
    address: '경기도 부천시 원미구 약대동 95',
  },
  {
    id: 'suwon-bluewings',
    name: '수원월드컵경기장',
    teamName: '수원 삼성 블루윙즈',
    teamShortName: '삼성',
    location: { lat: 37.2869, lng: 127.0369 },
    primaryColor: '#0066CC', // 파랑
    secondaryColor: '#FFFFFF', // 흰색
    uniformPattern: 'solid', // 파랑 단색
    leagueType: 2,
    address: '경기도 수원시 팔달구 월드컵로 310',
  },
]
