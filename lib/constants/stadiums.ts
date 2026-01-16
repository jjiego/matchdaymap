import { Stadium } from '@/lib/types/stadium'

export const K_LEAGUE_FULL_STADIUMS: Stadium[] = [
  // K리그1 (2025시즌 - 12개 팀)
  // 출처: teams.json
  {
    id: 'fc-seoul',
    name: '서울월드컵경기장',
    teamName: 'FC서울',
    teamShortName: '서울',
    teamDisplayLine1: 'FC',
    teamDisplayLine2: '서울',
    location: { lat: 37.568256, lng: 126.89724 },
    primaryColor: '#C8102E', // 빨강
    secondaryColor: '#000000', // 검정
    uniformPattern: 'vertical-stripe',
    leagueType: 1,
    address: '서울 마포구 성산동 515',
  },
  {
    id: 'ulsan',
    name: '울산문수축구경기장',
    teamName: '울산 HD FC',
    teamShortName: '울산',
    teamDisplayLine1: '울산',
    teamDisplayLine2: 'HD',
    location: { lat: 35.535299, lng: 129.259501 },
    primaryColor: '#0066B3', // 블루
    secondaryColor: '#FFD700', // 옐로우
    uniformPattern: 'vertical-stripe',
    leagueType: 1,
    address: '울산 남구 문수로 44',
  },
  {
    id: 'jeonbuk',
    name: '전주월드컵경기장',
    teamName: '전북 현대',
    teamShortName: '전북',
    teamDisplayLine1: '전북',
    teamDisplayLine2: '현대',
    location: { lat: 35.868112, lng: 127.064431 },
    primaryColor: '#00A651', // 녹색
    secondaryColor: '#000000', // 검정
    uniformPattern: 'solid',
    leagueType: 1,
    address: '전북 전주 덕진구 기린대로 1055',
  },
  {
    id: 'pohang',
    name: '포항스틸야드',
    teamName: '포항 스틸러스',
    teamShortName: '포항',
    teamDisplayLine1: '포항',
    teamDisplayLine2: '스틸',
    location: { lat: 35.997701, lng: 129.384351 },
    primaryColor: '#000000', // 검정
    secondaryColor: '#E2231A', // 레드
    uniformPattern: 'horizontal-stripe',
    leagueType: 1,
    address: '경북 포항 남구 동촌동 707',
  },
  {
    id: 'daegu',
    name: 'DGB대구은행파크',
    teamName: '대구 FC',
    teamShortName: '대구',
    teamDisplayLine1: '대구',
    teamDisplayLine2: 'FC',
    location: { lat: 35.881251, lng: 128.588231 },
    primaryColor: '#87CEEB', // 하늘색
    secondaryColor: '#003DA5', // 네이비
    uniformPattern: 'solid',
    leagueType: 2,
    address: '대구 북구 고성로 191',
  },
  {
    id: 'gwangju',
    name: '광주축구전용구장',
    teamName: '광주 FC',
    teamShortName: '광주',
    teamDisplayLine1: '광주',
    teamDisplayLine2: 'FC',
    location: { lat: 35.131051, lng: 126.875132 },
    primaryColor: '#FFD700', // 옐로우
    secondaryColor: '#FF0000', // 레드
    uniformPattern: 'diagonal-stripe',
    leagueType: 1,
    address: '광주 서구 금화로 240',
  },
  {
    id: 'gangwon',
    name: '강릉/춘천 종합운동장',
    teamName: '강원 FC',
    teamShortName: '강원',
    teamDisplayLine1: '강원',
    teamDisplayLine2: 'FC',
    location: { lat: 37.773733, lng: 128.897451 },
    primaryColor: '#FF6B00', // 주황
    secondaryColor: '#FFFFFF', // 흰색
    uniformPattern: 'solid',
    leagueType: 1,
    address: '강원 강릉시 종합운동장길 69',
  },
  {
    id: 'gimcheon',
    name: '김천종합운동장',
    teamName: '김천 상무',
    teamShortName: '김천',
    teamDisplayLine1: '김천',
    teamDisplayLine2: '상무',
    location: { lat: 36.139441, lng: 128.086321 },
    primaryColor: '#C8102E', // 레드
    secondaryColor: '#003478', // 네이비
    uniformPattern: 'solid',
    leagueType: 1,
    address: '경북 김천시 운동장길 1',
  },
  {
    id: 'suwon-fc',
    name: '수원종합운동장',
    teamName: '수원 FC',
    teamShortName: '수원FC',
    teamDisplayLine1: '수원',
    teamDisplayLine2: 'FC',
    location: { lat: 37.297741, lng: 127.011321 },
    primaryColor: '#E31837', // 빨강
    secondaryColor: '#0033A0', // 파랑
    uniformPattern: 'vertical-stripe',
    leagueType: 2,
    address: '경기 수원 장안구 경수대로 893',
  },
  {
    id: 'jeju',
    name: '제주월드컵경기장',
    teamName: '제주 SK',
    teamShortName: '제주',
    teamDisplayLine1: '제주',
    teamDisplayLine2: 'SK',
    location: { lat: 33.246189, lng: 126.509301 },
    primaryColor: '#FF6600', // 오렌지
    secondaryColor: '#000000', // 검정
    uniformPattern: 'solid',
    leagueType: 1,
    address: '제주 서귀포 월드컵로 33',
  },
  {
    id: 'daejeon',
    name: '대전월드컵경기장',
    teamName: '대전 하나 시티즌',
    teamShortName: '대전',
    teamDisplayLine1: '대전',
    teamDisplayLine2: '하나',
    location: { lat: 36.365311, lng: 127.325021 },
    primaryColor: '#702F8A', // 자주색
    secondaryColor: '#FFFFFF', // 흰색
    uniformPattern: 'solid',
    leagueType: 1,
    address: '대전 유성구 월드컵대로 32',
  },
  {
    id: 'anyang',
    name: '안양종합운동장',
    teamName: 'FC 안양',
    teamShortName: '안양',
    teamDisplayLine1: '안양',
    teamDisplayLine2: 'FC',
    location: { lat: 37.405351, lng: 126.946401 },
    primaryColor: '#6C2785', // 자주색
    secondaryColor: '#FFFFFF', // 흰색
    uniformPattern: 'solid',
    leagueType: 1,
    address: '경기 안양 동안구 비산동 1101',
  },

  // K리그2 (2025시즌 - 15개 팀)
  // 출처: teams.json
  {
    id: 'busan',
    name: '부산아시아드주경기장',
    teamName: '부산 아이파크',
    teamShortName: '부산',
    teamDisplayLine1: '부산',
    teamDisplayLine2: '아이',
    location: { lat: 35.190101, lng: 129.058351 },
    primaryColor: '#C8102E', // 레드
    secondaryColor: '#FFFFFF', // 화이트
    uniformPattern: 'solid',
    leagueType: 2,
    address: '부산 연제구 월드컵대로 344',
  },
  {
    id: 'incheon',
    name: '인천축구전용경기장',
    teamName: '인천 유나이티드',
    teamShortName: '인천',
    teamDisplayLine1: '인천',
    teamDisplayLine2: '유나',
    location: { lat: 37.466021, lng: 126.643051 },
    primaryColor: '#000000', // 검정
    secondaryColor: '#0066B3', // 파랑
    uniformPattern: 'vertical-stripe',
    leagueType: 1,
    address: '인천 중구 참외전로 246',
  },
  {
    id: 'cheonan',
    name: '천안종합운동장',
    teamName: '천안 시티 FC',
    teamShortName: '천안',
    teamDisplayLine1: '천안',
    teamDisplayLine2: '시티',
    location: { lat: 36.8083, lng: 127.1508 },
    primaryColor: '#1E90FF', // 파랑
    secondaryColor: '#FFFFFF', // 흰색
    uniformPattern: 'solid',
    leagueType: 2,
    address: '충남 천안 서북구 번영로 208',
  },
  {
    id: 'gyeongnam',
    name: '창원축구센터',
    teamName: '경남 FC',
    teamShortName: '경남',
    teamDisplayLine1: '경남',
    teamDisplayLine2: 'FC',
    location: { lat: 35.2108, lng: 128.5836 },
    primaryColor: '#FF0000', // 빨강
    secondaryColor: '#000000', // 검정
    uniformPattern: 'solid',
    leagueType: 2,
    address: '경남 창원 성산구 비음로 97',
  },
  {
    id: 'bucheon',
    name: '부천종합운동장',
    teamName: '부천 FC 1995',
    teamShortName: '부천',
    teamDisplayLine1: '부천',
    teamDisplayLine2: 'FC',
    location: { lat: 37.502551, lng: 126.798931 },
    primaryColor: '#C8102E', // 레드
    secondaryColor: '#000000', // 검정
    uniformPattern: 'horizontal-stripe',
    leagueType: 1,
    address: '경기 부천 원미구 길주로 486',
  },
  {
    id: 'suwon-bluewings',
    name: '수원월드컵경기장',
    teamName: '수원 삼성',
    teamShortName: '삼성',
    teamDisplayLine1: '수원',
    teamDisplayLine2: '삼성',
    location: { lat: 37.286511, lng: 127.036851 },
    primaryColor: '#0066CC', // 블루
    secondaryColor: '#FF0000', // 레드
    uniformPattern: 'gradient',
    leagueType: 2,
    address: '경기 수원 팔달구 월드컵로 310',
  },
  {
    id: 'seoul-eland',
    name: '목동종합운동장',
    teamName: '서울 이랜드 FC',
    teamShortName: '서울E',
    teamDisplayLine1: '서울E',
    teamDisplayLine2: 'FC',
    location: { lat: 37.530611, lng: 126.883021 },
    primaryColor: '#003478', // 네이비
    secondaryColor: '#FFD700', // 골드
    uniformPattern: 'solid',
    leagueType: 2,
    address: '서울 양천구 안양천로 939',
  },
  {
    id: 'jeonnam',
    name: '광양축구전용구장',
    teamName: '전남 드래곤즈',
    teamShortName: '전남',
    teamDisplayLine1: '전남',
    teamDisplayLine2: '드래곤',
    location: { lat: 34.933151, lng: 127.727501 },
    primaryColor: '#FFD700', // 옐로우
    secondaryColor: '#000000', // 검정
    uniformPattern: 'vertical-stripe',
    leagueType: 2,
    address: '전남 광양시 제철로 1655',
  },
  {
    id: 'yongin',
    name: '용인미르스타디움',
    teamName: '용인 FC',
    teamShortName: '용인',
    teamDisplayLine1: '용인',
    teamDisplayLine2: 'FC',
    location: { lat: 37.249701, lng: 127.165151 },
    primaryColor: '#FFD700', // 옐로우
    secondaryColor: '#800080', // 퍼플
    uniformPattern: 'diagonal-stripe',
    leagueType: 2,
    address: '경기 용인 처인구 동백죽전대로 61',
  },
  {
    id: 'gimhae',
    name: '김해운동장',
    teamName: '김해 FC',
    teamShortName: '김해',
    teamDisplayLine1: '김해',
    teamDisplayLine2: 'FC',
    location: { lat: 35.255651, lng: 128.877132 },
    primaryColor: '#0066B3', // 파랑
    secondaryColor: '#FFFFFF',
    uniformPattern: 'solid',
    leagueType: 2,
    address: '경남 김해시 가야로 245',
  },
  {
    id: 'hwaseong',
    name: '화성종합경기타운',
    teamName: '화성 FC',
    teamShortName: '화성',
    teamDisplayLine1: '화성',
    teamDisplayLine2: 'FC',
    location: { lat: 37.137351, lng: 126.924701 },
    primaryColor: '#FF6600', // 오렌지
    secondaryColor: '#FFFFFF', // 화이트
    uniformPattern: 'gradient',
    leagueType: 2,
    address: '경기 화성 향남읍 향남로 470',
  },
  {
    id: 'paju',
    name: '파주스타디움',
    teamName: '파주 프런티어',
    teamShortName: '파주',
    teamDisplayLine1: '파주',
    teamDisplayLine2: '프런',
    location: { lat: 37.756151, lng: 126.786521 },
    primaryColor: '#FF6600', // 오렌지
    secondaryColor: '#000000',
    uniformPattern: 'solid',
    leagueType: 2,
    address: '경기 파주시 중앙로 160',
  },
  {
    id: 'chungbuk',
    name: '청주종합운동장',
    teamName: '충북 청주 FC',
    teamShortName: '청주',
    teamDisplayLine1: '청주',
    teamDisplayLine2: 'FC',
    location: { lat: 36.6283, lng: 127.4532 },
    primaryColor: '#E31837', // 빨강
    secondaryColor: '#000000',
    uniformPattern: 'solid',
    leagueType: 2,
    address: '충북 청주시 사직동 152',
  },
  {
    id: 'asan',
    name: '이순신종합운동장',
    teamName: '충남 아산 FC',
    teamShortName: '아산',
    teamDisplayLine1: '아산',
    teamDisplayLine2: 'FC',
    location: { lat: 36.7904, lng: 127.0016 },
    primaryColor: '#702F8A', // 자주
    secondaryColor: '#FFFFFF',
    uniformPattern: 'solid',
    leagueType: 2,
    address: '충남 아산시 남부대로 370',
  },
  {
    id: 'seongnam',
    name: '탄천종합운동장',
    teamName: '성남 FC',
    teamShortName: '성남',
    teamDisplayLine1: '성남',
    teamDisplayLine2: 'FC',
    location: { lat: 37.410101, lng: 127.120451 },
    primaryColor: '#FFD700', // 노랑
    secondaryColor: '#000000',
    uniformPattern: 'solid',
    leagueType: 2,
    address: '경기 성남 분당구 판교로 461',
  },
  {
    id: 'ansan',
    name: '안산와~스타디움',
    teamName: '안산 그리너스',
    teamShortName: '안산',
    teamDisplayLine1: '안산',
    teamDisplayLine2: '그린',
    location: { lat: 37.3218, lng: 126.8308 },
    primaryColor: '#00A651', // 녹색
    secondaryColor: '#FFFFFF',
    uniformPattern: 'solid',
    leagueType: 2,
    address: '경기 안산 단원구 화랑로 260',
  },
  {
    id: 'gimpo',
    name: '김포솔터축구장',
    teamName: '김포 FC',
    teamShortName: '김포',
    teamDisplayLine1: '김포',
    teamDisplayLine2: 'FC',
    location: { lat: 37.6150, lng: 126.7157 },
    primaryColor: '#0066CC', // 파랑
    secondaryColor: '#FFFFFF',
    uniformPattern: 'solid',
    leagueType: 2,
    address: '경기 김포 마산동 673-1',
  },
]
