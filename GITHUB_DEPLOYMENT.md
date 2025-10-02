# GitHub Actions 자동 배포 가이드

## 📋 개요

이 프로젝트는 GitHub Actions를 통해 자동으로 GitHub Pages에 배포됩니다.

## 🚀 설정 방법

### 1. GitHub 저장소 설정

#### Repository 생성 및 푸시
```bash
# syeong-web 디렉토리에서
git init
git add .
git commit -m "Initial commit: syeong-web project"
git remote add origin https://github.com/goodnodes/syeong-web.git
git branch -M main
git push -u origin main
```

#### GitHub Pages 활성화
1. GitHub 저장소로 이동
2. **Settings** → **Pages** 클릭
3. **Source**를 `GitHub Actions`로 선택
4. 저장

### 2. 환경 변수 설정 (선택사항)

API URL을 변경하려면:

1. GitHub 저장소 → **Settings** → **Secrets and variables** → **Actions**
2. **New repository secret** 클릭
3. Secret 추가:
   - Name: `VITE_API_BASE_URL`
   - Value: `https://api.syeong.com` (또는 원하는 API URL)

**참고:** 환경 변수를 설정하지 않으면 기본값(`https://api.syeong.com`)이 사용됩니다.

## 🔄 자동 배포 프로세스

### 배포 트리거
다음 상황에서 자동으로 배포됩니다:

1. **main 브랜치에 푸시할 때**
   ```bash
   git push origin main
   ```

2. **수동 트리거**
   - GitHub 저장소 → **Actions** 탭
   - **Deploy to GitHub Pages** 워크플로우 선택
   - **Run workflow** 버튼 클릭

### 배포 단계
```
1. 코드 체크아웃
2. Node.js 18 설치
3. 의존성 설치 (npm ci)
4. 프로젝트 빌드 (npm run build)
5. GitHub Pages에 배포
```

## 📊 배포 상태 확인

### GitHub Actions 로그 확인
1. 저장소 → **Actions** 탭
2. 최근 워크플로우 실행 확인
3. 각 단계별 로그 확인 가능

### 배포 URL
배포 완료 후 다음 URL에서 접속 가능:
```
https://goodnodes.github.io/syeong-web/
```

## 🛠 트러블슈팅

### 빌드 실패

**문제:** GitHub Actions에서 빌드가 실패함

**해결:**
1. 로컬에서 빌드 테스트
   ```bash
   npm run build
   ```
2. Actions 탭에서 에러 로그 확인
3. `package-lock.json` 파일이 커밋되었는지 확인

### 배포는 성공했지만 페이지가 보이지 않음

**문제:** 404 에러 또는 빈 페이지

**해결:**
1. Settings → Pages에서 Source가 `GitHub Actions`로 설정되었는지 확인
2. 배포 URL이 올바른지 확인
3. 브라우저 캐시 삭제 후 새로고침

### API 연결 안 됨

**문제:** 배포 후 API 호출이 실패함

**해결:**
1. Repository Secrets에 `VITE_API_BASE_URL`이 올바르게 설정되었는지 확인
2. API 서버의 CORS 설정 확인
3. 브라우저 개발자 도구 → Network 탭에서 요청 확인

## 📝 워크플로우 파일 위치

```
.github/workflows/deploy.yml
```

## 🔒 보안

- API URL은 환경 변수로 관리
- 민감한 정보는 절대 코드에 직접 작성하지 않음
- GitHub Secrets 사용 권장

## 📚 추가 설정

### 커스텀 도메인 설정

1. Settings → Pages → Custom domain
2. 도메인 입력 (예: `pool-report.syeong.com`)
3. DNS 설정:
   ```
   Type: CNAME
   Name: pool-report
   Value: goodnodes.github.io
   ```

### 배포 브랜치 변경

`.github/workflows/deploy.yml` 파일의 브랜치 수정:
```yaml
on:
  push:
    branches:
      - main  # 원하는 브랜치로 변경
```

## 🎯 빠른 시작

```bash
# 1. 저장소 클론 (이미 되어있다면 스킵)
git clone https://github.com/goodnodes/syeong-web.git
cd syeong-web

# 2. 의존성 설치
npm install

# 3. 로컬 테스트
npm run dev

# 4. 빌드 테스트
npm run build

# 5. 변경사항 커밋 및 푸시
git add .
git commit -m "Update something"
git push origin main

# 6. GitHub Actions가 자동으로 배포 진행
# Actions 탭에서 배포 상태 확인
```

## 📞 도움말

문제가 발생하면:
1. GitHub Actions 로그 확인
2. 로컬에서 `npm run build` 테스트
3. Issue 등록 또는 팀에 문의
