# 매치데이맵 (MatchdayMap)

K리그 팬들을 위한 모바일 최적화 직관 가이드 웹앱

## 주요 기능

- **하이브리드 마커 시스템**: 각 구단의 고유 컬러와 팀 이름 약자를 활용한 SVG 마커
- **상세 정보 바텀시트**: 마커 클릭 시 경기장 정보, 엠블럼, 길찾기 기능 제공
- **Fallback UI**: 로고 이미지 로딩 실패 시 팀 컬러 아이콘으로 자동 대체
- **위치 기반 기능**: 사용자 현재 위치를 중심으로 지도 표시
- **다크 모드**: 세련된 다크 테마 디자인
- **길찾기 통합**: 카카오내비, 네이버지도 딥링크 지원

## 기술 스택

- **프레임워크**: Next.js 14+ (App Router)
- **언어**: TypeScript
- **지도 SDK**: react-kakao-maps-sdk
- **스타일링**: Tailwind CSS
- **UI 컴포넌트**: Lucide Icons
- **백엔드 (예정)**: Supabase (PostgreSQL + PostGIS)

## 시작하기

### 1. 환경 변수 설정

`.env.local.example` 파일을 `.env.local`로 복사하고 카카오맵 API 키를 설정하세요.

```bash
cp .env.local.example .env.local
```

[Kakao Developers](https://developers.kakao.com/)에서 API 키를 발급받아 `.env.local` 파일에 추가하세요:

```env
NEXT_PUBLIC_KAKAO_MAP_API_KEY=your_kakao_map_api_key_here
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 프로젝트 구조

```
matchdaymap/
├── app/
│   ├── layout.tsx          # 루트 레이아웃 (Kakao Maps SDK 로드)
│   ├── page.tsx            # 메인 지도 페이지
│   └── globals.css         # 글로벌 스타일 (다크 모드 테마)
├── components/
│   ├── map/
│   │   └── TeamMarker.tsx  # 팀 컬러 기반 커스텀 마커
│   └── stadium/
│       └── StadiumDrawer.tsx # 경기장 상세 정보 바텀시트
├── lib/
│   ├── types/
│   │   └── stadium.ts      # Stadium 타입 정의
│   └── constants/
│       └── stadiums.ts     # K리그 경기장 데이터
└── public/                 # 정적 파일 (향후 로고 이미지 저장)
```

## 디자인 철학

### 하이브리드 마커 시스템

저작권 리스크를 최소화하면서 팬심을 유지하기 위해 다음과 같은 방식을 채택했습니다:

1. **지도 화면**: 구단 컬러 + 팀 약자 SVG 마커 사용
2. **상세 화면**: 바텀시트에서만 구단 엠블럼 노출
3. **Fallback 처리**: 이미지 로딩 실패 시 팀 컬러 아이콘으로 자동 전환

## 다음 단계

- [ ] Supabase 백엔드 연동
- [ ] PostGIS를 활용한 거리 기반 검색
- [ ] 경기 일정 정보 통합
- [ ] 팀별 필터링 기능
- [ ] 경기장 주변 편의시설 정보
- [ ] PWA 지원

## 라이선스

MIT License