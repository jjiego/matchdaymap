# 카카오 로그인 account_email 오류 해결

## 문제
```
Error: account_email scope is required
```

## 원인
Supabase Dashboard의 **Kakao provider 설정**에서 `account_email`이 기본 스코프로 설정되어 있습니다.

## 해결: Supabase Dashboard 수정 (5분)

### Step 1: Supabase 대시보드 접속
1. https://app.supabase.com 접속
2. 프로젝트 선택 (matchdaymap)

### Step 2: Kakao Provider 설정 확인
1. **Authentication** 메뉴 클릭
2. **Providers** 클릭
3. **Kakao** 선택

### Step 3: Scopes 설정 확인 및 수정
현재 설정 화면에서:

```
[ 자신의 카카오톡 프로필 정보 조회 ]
- 닉네임
- 프로필 사진 주소

[ 추가 항목 - 여기를 확인! ]
- Account Email [ ✓ 체크되어 있으면 언체크 ]
```

**또는 텍스트 필드가 있는 경우:**
```
Additional Scopes:
[account_email]  ← 이 부분 제거
```

### Step 4: 저장
- **Save** 또는 **Update** 버튼 클릭
- "Successfully updated" 메시지 확인

### Step 5: 브라우저 캐시 삭제
1. 개발자 도구 (F12) > Application
2. Storage > Clear site data
3. 또는 시크릿 모드에서 테스트

## 코드 수정 (이미 완료됨)

### AuthContext.tsx 변경사항
```typescript
// 수정됨:
scopes: 'profile_nickname profile_image'  // account_email 제외

// 추가됨:
- 오류 메시지 로깅
- 사용자 친화적 오류 처리
```

## 테스트

### 1. 개발 서버 확인
```bash
npm run dev
# http://localhost:3000 접속
```

### 2. 카카오 로그인 테스트
1. "로그인" 버튼 클릭
2. "카카오로 시작하기" 클릭
3. 카카오 계정으로 로그인
4. account_email 오류 없이 진행되어야 함

### 3. 성공 확인
- 로그인 후 홈 페이지로 리다이렉트
- 프로필 아바타 표시됨
- 팀 선택 모달 표시 (첫 로그인인 경우)

## 문제 해결

### "여전히 account_email 오류 발생"
→ Supabase Dashboard 설정이 업데이트되지 않은 것일 수 있음
→ 해결책:
1. 브라우저 완전 새로고침 (Ctrl+Shift+R)
2. 시크릿 모드에서 테스트
3. Supabase Dashboard 설정 다시 확인

### "프로필이 생성되지 않음"
→ handle_new_user() 트리거 함수 확인
→ Supabase > SQL Editor에서:
```sql
-- 트리거 함수 확인
SELECT routine_name FROM information_schema.routines
WHERE routine_name = 'handle_new_user';

-- 결과가 없으면 트리거 함수 생성 필요
```

### "이메일이 필요한 기능이 있음"
→ 현재 상황:
- 카카오 로그인은 이메일 없이 작동
- profiles.email이 NULL로 저장됨
- 이메일이 필요한 곳에서는 별도 입력 받아야 함

## 이메일 없이 처리되는 부분

현재 설계:
- ✅ 로그인/로그아웃 - 이메일 불필요
- ✅ 프로필 표시 - 이메일 불필요
- ✅ 팀 선택 - 이메일 불필요
- ✅ 경기 정보 조회 - 이메일 불필요
- ⚠️ 추후 이메일 필요한 기능은 별도 입력 창 추가

## 참고
- Kakao 비즈니스 앱이 아니면 account_email scope 접근 불가
- 개인 개발자는 profile_nickname, profile_image만 사용 가능
- 이메일이 필요하면 별도 정보 수집 필요
